import React from 'react';
import * as RDC from 'react-dom/client';
import { v4 as uuid_v4 } from 'uuid';
import {
    Button as SButton,
    Dropdown as SDropdown,
    Header as SHeader,
    Icon as SIcon,
    Modal as SModal,
} from 'semantic-ui-react';
import { Config } from './config';
import { FormContext, FormContextInstance } from './context';
import { FormContextHandler, _FormContextHandler } from './context/handler';
import { getKeeper } from './context/keeper';
import { ErrorDialog } from './ui/error-dialog';
import { HPadded } from './ui/padded';
import { Form } from './ui/form';
import { DataError, Mbdb } from './mbdb';
import { Deserialize as MbdbDeserialize } from './mbdb/deserialize';
import { MbdbData } from './mbdb/data';
import { MbdbModels } from './mbdb/models';
import { Serialize as MbdbSerialize } from './mbdb/serialize';
import { submitToMbdb } from './mbdb/submit';
import { TopLevelItem } from './schema';
import { Configuration } from './schema/configuration';
import { Data } from './schema/data';
import { Persistence } from './schema/persistence';
import { LoadFileButton } from './ui/load-file-button';
import { objKeys } from './util';
import { doDownload, FileTypes } from './util/download';

// HAKZ HAKZ HAKZ
import { Register as SchemasRegister } from './schema/schemas/register';
import { Register as ConfigRegister } from './schema/configuration/register';

function collectDebugInfo(errorCode: number, errorText: string, ctx: FormContext, mbdbObj: MbdbData) {
    let dbg = '';

    dbg += `Error ${errorCode}: ${errorText}\n\n`;

    dbg += '### Internal data representation ###\n';
    dbg += JSON.stringify(ctx.data, null, 2);
    dbg += '\n\n';

    dbg += '### MBDB data representation ###\n';
    dbg += JSON.stringify(mbdbObj, null, 2);

    console.log(dbg);
    navigator.clipboard.writeText(dbg);
}

function mbdbErrors(errors: { field: string, messages: string[] }[]) {
    const out = [];

    for (const err of errors) {
        const field = err.field;
        const msgs = err.messages;

        if (field && msgs && Array.isArray(msgs)) {
            out.push(`${field}: ${msgs.join(', ')}`);
        }
    }

    return out;
}

function SubmissionErrorDialog(props: {
    error: { status: number, message: string, errors: string[], payload: MbdbData } | null,
    contextDataGetter: () => FormContext,
    onDismissed: () => void
}) {
    return (
        <SModal
            basic
            open={props.error!== null}
        >
            <SHeader icon>
                <HPadded padding='center'>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--mbdb-2hgap)' }}>
                        <SIcon name='warning' />
                        <SIcon name='database' />
                    </div>
                </HPadded>
                Deposition failed due to an issue on the backend
            </SHeader>
            <SModal.Content>
                <div className='mbdb-deposition-error-report'>Deposition failed because the database reported an error</div>
                <div className='mbdb-deposition-error-report' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdb-2hgap)' }}>
                    {props.error
                        ?
                            <>
                                <div>Status code</div><div>{props.error.status}</div>
                                <div>Message</div><div>{props.error.message}</div>
                                <div>Errors</div><div>{props.error.errors.map((err, idx) => <div key={idx}>{err}</div>)}</div>
                            </>
                        : null
                    }
                </div>
            </SModal.Content>
            <SModal.Actions>
                <SButton
                    color='yellow'
                    inverted
                    onClick={() => collectDebugInfo(props.error!.status, props.error!.message, props.contextDataGetter(), props.error!.payload)}
                >Collect debugging info</SButton>

                <SButton
                    color='blue'
                    inverted
                    onClick={props.onDismissed}
                >Got it</SButton>
            </SModal.Actions>
        </SModal>
    );
}

function App() {
    const keeper = getKeeper();
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
    const [submitError, setSubmitError] = React.useState<{ status: number, message: string, errors: string[], payload: MbdbData } | null>(null);
    const [inputFormErrors, setInputFormErrors] = React.useState<DataError[] | null>(null);
    const [loadError, setLoadError] = React.useState<{ title: string, message: string } | null>(null);

    const dataId = React.useMemo(() => uuid_v4(), []);
    const schema = React.useMemo(() => {
        const schema = Configuration.configure(SchemasRegister[selectedSchema].schema, ConfigRegister[selectedSchema]);
        const data = FormContext.create(schema);
        keeper.set(dataId, data);

        return schema;
    }, [selectedSchema]);

    const ctxGetter = () => keeper.get(dataId);
    const ctxUpdater = (handler: any) => setContextValue({ handler });
    const contextHandler = React.useMemo(() => {
        return FormContextHandler.make(ctxGetter, ctxUpdater);
    }, []);
    const [contextValue, setContextValue] = React.useState({ handler: contextHandler });

    const _submitToMbdb = (noSanityChecks = false) => {
        const { toApi, errors } = Mbdb.toData(ctxGetter(), noSanityChecks ? { dontPrune: true, ignoreErrors: true } : void 0);

        if (errors.length === 0 || noSanityChecks) {
            submitToMbdb(Config.get('baseUrl'), MbdbModels[selectedSchema].apiEndpoint, toApi).then((resp) => {
                if (resp.ok) {
                    setSubmitError(null);
                } else {
                    resp.json().then((j) => {
                        setSubmitError({
                            status: resp.status,
                            message: j.message || resp.statusText,
                            errors: mbdbErrors(j.errors ?? []),
                            payload: toApi, // The metadata object, we probably won't need this in production
                        });
                    }).catch(() => {
                        setSubmitError({
                            status: resp.status,
                            message: resp.statusText,
                            errors: [],
                            payload: toApi,
                        });
                    });
                }
            }).catch((e) => setSubmitError({
                status: 0,
                message: e.message,
                errors: [],
                payload: toApi, // The metadata object, we probably won't need this in production
            }));
        } else {
            setInputFormErrors(errors);
        }
    };

    return (
        <>
            <ErrorDialog
                isOpen={inputFormErrors !== null}
                title='Cannot deposit record'
                onDismissed={() => setInputFormErrors(null)}
                icons={
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--mbdb-2hgap)' }}>
                        <SIcon name='warning' />
                        <SIcon name='clipboard list' />
                    </div>
                }
            >
                <div className='mbdb-deposition-error-report'>Cannot deposit record because there are some invalid items in the form.</div>
                <ul className='mbdb-deposition-error-report'>
                    {inputFormErrors?.map((err, idx) => (
                        <li className='mbdb-deposition-error-report' key={idx}>
                            <div>{Data.Path.toString(err.path)}</div>
                            <div>{err.message}</div>
                        </li>
                    )) ?? null}
                </ul>
            </ErrorDialog>
            <ErrorDialog
                isOpen={loadError !== null}
                title={loadError?.title ?? ''}
                onDismissed={() => setLoadError(null)}
            >
                <div>Cannot load form from a file because the file appears invalid</div>
                <div>{loadError?.message}</div>
            </ErrorDialog>
            <SubmissionErrorDialog error={submitError} contextDataGetter={ctxGetter} onDismissed={() => setSubmitError(null)} />

            <div className='mbdb-app-tainer'>
                <div style={{ alignItems: 'center', backgroundColor: '#eee', display: 'flex', flexDirection: 'column', gap: 'var(--mbdb-hgap)' }}>
                    <div style={{ display: 'grid', gap: 'var(--mbdb-hgap)', gridTemplateColumns: 'auto auto auto auto' }}>
                        {/* First row */}
                        <SButton color='red' inverted onClick={() => console.log(ctxGetter())}>Dump Full Object (don't touch)</SButton>
                        <SButton color='red' inverted onClick={() => console.log(JSON.stringify(ctxGetter(), undefined, 2))}>Dump full JSON (don't touch)</SButton>
                        <SButton color='purple' inverted onClick={() => console.log(Mbdb.toData(ctxGetter()).toApi)}>Dump MBDB-schema object</SButton>
                        <SButton color='purple' inverted onClick={() => console.log(Mbdb.toData(ctxGetter(), { dontPrune: true, ignoreErrors: true }).toApi)}>Dump MBDB-schema object (no nicening)</SButton>

                        {/* Second row */}
                        <SButton
                            style={{ flex: 1 }}
                            color='teal'
                            onClick={() => {
                                const json = Persistence.toJson(ctxGetter().data, false);
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
                                        FormContext.load(json, ctxGetter());
                                        contextHandler.update();
                                    } catch (e) {
                                        setLoadError({ title: 'Cannot load form from Internal Input file', message: (e as Error).message });
                                    }
                                }).catch((e) => {
                                    setLoadError({ title: 'Cannot load form from Internal Input file', message: (e as Error).message });
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
                                    const json = MbdbSerialize.toJson(ctxGetter())
                                    doDownload('mbdb_data', json, FileTypes.json);
                                } catch (errors) {
                                    console.log(errors);
                                }
                            }}
                        >
                            <SIcon name='download' />
                            Save form as Mbdb data
                        </SButton>
                        <LoadFileButton
                            title='Load form from Mbdb data'
                            onLoaded={(file) => {
                                MbdbDeserialize.fromFile(ctxGetter(), file).then((internalData) => {
                                    try {
                                        FormContext.load(internalData, ctxGetter());
                                        contextHandler.update();
                                    } catch (e) {
                                        setLoadError({ title: 'Cannot load form from MBDB data file', message: (e as Error).message });
                                    }
                                }).catch((e) => {
                                    setLoadError({ title: 'Cannot load form from MBDB data file', message: (e as Error).message });
                                })
                            }}
                            color='olive'
                            fluid
                        />
                        <LoadFileButton
                            title='Load form from Mbdb data (allow partial input)'
                            onLoaded={(file) => {
                                MbdbDeserialize.fromFile(ctxGetter(), file, { allowPartials: true }).then((internalData) => {
                                    try {
                                        FormContext.load(internalData, ctxGetter());
                                        contextHandler.update();
                                    } catch (e) {
                                        setLoadError({ title: 'Cannot load form from MBDB data file', message: (e as Error).message });
                                    }
                                }).catch((e) => {
                                    setLoadError({ title: 'Cannot load form from MBDB data file', message: (e as Error).message });
                                })
                            }}
                            color='olive'
                            fluid
                        />
                    </div>

                    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 'var(--mbdb-hgap)' }}>
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
                <FormBlock schema={schema} contextValue={contextValue} />
            </div>
        </>
    );
}

export function FormBlock(props: { schema: TopLevelItem, contextValue: { handler: _FormContextHandler } }) {
    React.useEffect(() => {
        props.contextValue.handler.navigation.clear();
    }, [props.schema]);

    return (
        <FormContextInstance.Provider value={props.contextValue}>
            <Form schema={props.schema} />
        </FormContextInstance.Provider>
    );
}

export async function initApp(elemId: string) {
    const appRoot = document.getElementById(elemId);
    if (!appRoot) {
        throw new Error(`Cannot render application ${elemId} because no such element exists.`);
    }

    try {
        await Config.load();
        const root = RDC.createRoot(appRoot);

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
        root.render(<App />);
    } catch (e) {
        console.log(`Failed to load application configuration: ${e}`);
    }
}
