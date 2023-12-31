import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid_v4 } from 'uuid';
import {
    Button as SButton,
    Dropdown as SDropdown,
    Icon as SIcon,
} from 'semantic-ui-react';
import { MinimalInputForm, useContextHandler } from './index-with-semantic-ui';
import { Config } from './config';
import { FormContext } from './context';
import { _FormContextHandler } from './context/handler';
import { getKeeper } from './context/keeper';
import { ErrorDialog } from './ui/error-dialog';
import { Mbdb } from './mbdb';
import { Deserialize as MbdbDeserialize } from './mbdb/deserialize';
import { MbdbData } from './mbdb/data';
import { MbdbModels } from './mbdb/models';
import { Serialize as MbdbSerialize } from './mbdb/serialize';
import { submitToMbdb } from './mbdb/submit';
import { Data } from './schema/data';
import { Persistence } from './schema/persistence';
import { Register as SchemasRegister } from './schema/schemas/register';
import { Dialog } from './ui/dialog';
import { LoadFileButton } from './ui/load-file-button';
import { objKeys } from './util';
import { doDownload, FileTypes } from './util/download';
import { Result } from './util/result';

function collectDebugInfo(errorCode: number, ctx: FormContext, mbdbObj: MbdbData) {
    let dbg = '';

    dbg += `Error ${errorCode}\n\n`;

    dbg += '### Internal data representation ###\n';
    dbg += JSON.stringify(ctx.data, null, 2);
    dbg += '\n\n';

    dbg += '### MBDB data representation ###\n';
    dbg += JSON.stringify(mbdbObj, null, 2);

    console.log(dbg);
    navigator.clipboard.writeText(dbg);
}

function makeSubmissionErrorContent(code: number, errors: string[], payload: MbdbData) {
    return (
        code !== 0
            ? (
                <>
                    <div className='mbdbi-deposition-error-report mbdbi-center-text mbdbi-strong'>
                        Deposition failed because the database reported an error
                    </div>
                    <div className='mbdbi-deposition-error-report' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdbi-2hgap)' }}>
                        <div>Status code</div><div>{code}</div>
                        <div>Errors</div><div>{errors.map((err, idx) => <div key={idx}>{err}</div>)}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className='mbdbi-deposition-error-report mbdbi-center-text mbdbi-strong'>
                        Deposition failed because the remote server could not have been contacted
                    </div>
                    <div className='mbdbi-deposition-error-report' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdbi-2hgap)' }}>
                        <div>Errors</div><div>{errors.map((err, idx) => <div key={idx}>{err}</div>)}</div>
                    </div>
                </>
            )
    );
}

function makeSubmissionErrorDialog(code: number, errors: string[], payload: MbdbData, ctx: FormContext) {
    return {
        title: 'Cannot deposit record because there was an issue on the backend',
        icons: [<SIcon name='warning' />, <SIcon name='database' />],
        content: makeSubmissionErrorContent(
            code,
            errors,
            payload, // The metadata object, we probably won't need this in production
        ),
        extraButtons: [{ label: 'Collect debugging info', id: 0, flags: 0, color: 0x4af0ff }],
        onButton: (id: number, flags: number) => {
            if (Dialog.isUserButton(flags) && id === 0) {
                collectDebugInfo(code, ctx, payload)
            }
        },
    };
}

function App() {
    const keeper = getKeeper();
    const { dataId, getData } = React.useMemo(() => {
        const dataId = uuid_v4();
        const getData = () => keeper.get(dataId).data;

        return { dataId, getData };
    }, []);
    const availableSchemas = React.useMemo(() => {
        const isDevel = Config.get('isDevel');
        const avail = [];
        for (const key of objKeys(SchemasRegister)) {
            const s = SchemasRegister[key as keyof typeof MbdbModels];
            if (!MbdbModels[key].dummy || isDevel) {
                avail.push({ key, text: s.name, value: key });
            }
        }

        return avail;
    }, []);
    const [selectedSchema, setSelectedSchema] = React.useState<keyof typeof MbdbModels>('mst');
    const ctxHandler = useContextHandler(dataId, selectedSchema);

    React.useEffect(() => {
        return () => getKeeper().remove(dataId);
    }, []);

    const _submitToMbdb = (noSanityChecks = false) => {
        const { toApi, errors, files } = Mbdb.toData(keeper.get(dataId).data, noSanityChecks ? { dontPrune: true, ignoreErrors: true } : void 0);

        const apiEndpoint = MbdbModels[selectedSchema].apiEndpoint
        let ep = apiEndpoint.startsWith('/') ? apiEndpoint.substring(1) : apiEndpoint;
        ep = ep.endsWith('/') ? ep.substring(0, ep.length - 1) : ep;

        const url = `${Config.get('baseUrl')}/${ep}/`;

        if (errors.length === 0 || noSanityChecks) {
            submitToMbdb(url, { metadata: toApi, files }, { asDraft: true }).then((res) => {
                if (Result.isError(res)) {
                    ErrorDialog.show(makeSubmissionErrorDialog(res.error.code, res.error.errors, toApi, getData()));
                }
            }).catch((e) => {
                ErrorDialog.show(makeSubmissionErrorDialog(0, [e.message], toApi, getData()));
            });
        } else {
            ErrorDialog.show({
                title: 'Cannot deposit record',
                icons: [<SIcon name='warning' />, <SIcon name='clipboard list' />],
                content: (
                    <>
                        <div className='mbdbi-deposition-error-report mbdbi-center-text mbdbi-strong'>Cannot deposit record because there are some invalid items in the form.</div>
                        <ul className='mbdbi-deposition-error-report'>
                            {errors.map((err, idx) => (
                                <li className='mbdbi-deposition-error-report' key={idx}>
                                    <div>{Data.Path.toString(err.path)}</div>
                                    <div>{err.message}</div>
                                </li>
                            )) ?? null}
                        </ul>
                    </>
                ),
            });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ alignItems: 'center', backgroundColor: '#eee', display: 'flex', flexDirection: 'column', gap: 'var(--mbdbi-hgap)' }}>
                <div style={{ display: 'grid', gap: 'var(--mbdbi-hgap)', gridTemplateColumns: 'auto auto auto auto' }}>
                    {/* First row */}
                    <SButton color='red' inverted onClick={() => console.log(getData())}>Dump Full Object (don't touch)</SButton>
                    <SButton color='red' inverted onClick={() => console.log(JSON.stringify(getData(), undefined, 2))}>Dump full JSON (don't touch)</SButton>
                    <SButton color='purple' inverted onClick={() => console.log(Mbdb.toData(getData()).toApi)}>Dump MBDB-schema object</SButton>
                    <SButton color='purple' inverted onClick={() => console.log(Mbdb.toData(getData(), { dontPrune: true, ignoreErrors: true }).toApi)}>Dump MBDB-schema object (no nicening)</SButton>

                    {/* Second row */}
                    <SButton
                        style={{ flex: 1 }}
                        color='teal'
                        onClick={() => {
                            const json = Persistence.toJson(getData().data, false);
                            doDownload('mbdb_ui_input', json, FileTypes.json);
                        }}
                    >
                        <SIcon name='download' />
                        Save form to JSON
                    </SButton>
                    <LoadFileButton
                        title='Load form from JSON'
                        onLoaded={(file) => {
                            Persistence.fromFile(file).then((json) => {
                                try {
                                    FormContext.load(json, getData());
                                    ctxHandler.update();
                                } catch (e) {
                                    ErrorDialog.show({ title: 'Cannot load form from Internal Input file', content: <div>{(e as Error).message}</div> });
                                }
                            }).catch((e) => {
                                ErrorDialog.show({ title: 'Cannot load form from Internal Input file', content: <div>{(e as Error).message}</div> });
                            })
                        }}
                        color='teal'
                        fluid
                    />
                    <SButton
                        color='blue'
                        onClick={() => _submitToMbdb()}
                    >
                        <SIcon name='cloud upload' />
                        Deposit record
                    </SButton>
                    <SButton
                        color='blue'
                        onClick={() => _submitToMbdb(true)}
                    >
                        <SIcon name='cloud upload' />
                        Deposit record (without sanity checks)
                    </SButton>

                    {/* Third row */}
                    <SButton
                        style={{ flex: 1 }}
                        color='olive'
                        onClick={() => {
                            try {
                                const json = MbdbSerialize.toJson(getData())
                                doDownload('mbdb_data', json, FileTypes.json);
                            } catch (errors) {
                                console.log(errors);
                            }
                        }}
                    >
                        <SIcon name='download' />
                        Save form as Mbdb data
                    </SButton>
                    <SButton
                        style={{ flex: 1 }}
                        color='olive'
                        onClick={() => {
                            try {
                                const json = MbdbSerialize.toJson(getData(), {ignoreErrors: true})
                                doDownload('mbdb_data', json, FileTypes.json);
                            } catch (errors) {
                                console.log(errors);
                            }
                        }}
                    >
                        <SIcon name='download' />
                        Save form as Mbdb data (no validation)
                    </SButton>
                    <LoadFileButton
                        title='Load form from Mbdb data'
                        onLoaded={(file) => {
                            MbdbDeserialize.fromFile(getData(), file).then((internalData) => {
                                try {
                                    FormContext.load(internalData, getData());
                                    ctxHandler.update();
                                } catch (e) {
                                    ErrorDialog.show({ title: 'Cannot load form from MBDB data file', content: <div>{(e as Error).message}</div> });
                                }
                            }).catch((e) => {
                                ErrorDialog.show({ title: 'Cannot load form from MBDB data file', content: <div>{(e as Error).message}</div> });
                            })
                        }}
                        color='olive'
                        fluid
                    />
                    <LoadFileButton
                        title='Load form from Mbdb data (allow partial input)'
                        onLoaded={(file) => {
                            MbdbDeserialize.fromFile(getData(), file, { allowPartials: true }).then((internalData) => {
                                try {
                                    FormContext.load(internalData, getData());
                                    ctxHandler.update();
                                } catch (e) {
                                    ErrorDialog.show({ title: 'Cannot load form from MBDB data file', content: <div>{(e as Error).message}</div> });
                                }
                            }).catch((e) => {
                                ErrorDialog.show({ title: 'Cannot load form from MBDB data file', content: <div>{(e as Error).message}</div> });
                            })
                        }}
                        color='olive'
                        fluid
                    />
                </div>

                <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 'var(--mbdbi-hgap)', zIndex: 100 }}>
                    <strong>Technique:</strong>
                    <SDropdown
                        options={availableSchemas}
                        value={selectedSchema}
                        onChange={(_ev, data) => {
                            setSelectedSchema(data.value as keyof typeof SchemasRegister);
                        }}
                        selection
                        fluid
                    />
                </div>
            </div>
            <MinimalInputForm dataId={dataId} schemaName={selectedSchema} formContextHandler={ctxHandler} />
        </div>
    );
}

export async function initApp(elemId: string) {
    const appRoot = document.getElementById(elemId);
    if (!appRoot) {
        throw new Error(`Cannot render application ${elemId} because no such element exists.`);
    }

    try {
        await Config.load();
    } catch (e) {
        console.warn(`Failed to load application configuration: ${e}`);
    }

    // If you are looking at this bit of code, it is possible that
    // you have just came back from some blog post or a React developer
    // docs that talk about rendering in StrictMode. Yes, the guy who wrote
    // this knew what StrictMode was. Yes, the guy knew that it is supposed
    // to be good. No, we cannot use it here.
    //
    // StrictMode will do an additional pass on rendering and effects to catch bugs.
    // This problem is that this breaks the way we handle references. This may trigger
    // unmounts of components with "referenceable" that are referenced by something.
    // When these components unmount, they unregister themselves from the list of referenceables.
    // Since they are referenced by something, this will trigger an assertion fail.
    // This scenario cannot realisically happen because the UI checks for this and
    // does not allow removals of referenceables that are referenced.

    // Use the legacy API to retain support for React 16
    ReactDOM.render(<App />, appRoot);
}
