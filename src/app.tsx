import React from 'react';
import ReactDOM from 'react-dom';
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
import { Form } from './ui/form';
import { Mbdb } from './mbdb';
import { MbdbData } from './mbdb/data';
import { MbdbModels } from './mbdb/models';
import { submitToMbdb } from './mbdb/submit';
import { ComplexItem, Item } from './schema';
import { Configuration } from './schema/configuration';
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

function fakeItTillYouMakeIt(inner: Item[]) {
    return { input: inner } as Item;
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
                <SIcon name='warning' />
                Deposition failed
            </SHeader>
            <SModal.Content>
                <div>Deposition failed because the database reported an error</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdb-hgap)' }}>
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
    const [inputFormErrors, setInputFormErrors] = React.useState<string[] | null>(null);
    const [loadError, setLoadError] = React.useState<string | null>(null);

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

    return (
        <>
            <ErrorDialog
                isOpen={inputFormErrors !== null}
                title='Cannot deposit record'
                onDismissed={() => setInputFormErrors(null)}
            >
                <div>Cannot deposit record because there are some invalid values in the input</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--mbdb-hgap)' }}>
                    {inputFormErrors?.map((err, idx) => (
                        <React.Fragment key={idx}>
                            <div>{idx + 1}:</div>
                            <div>{err}</div>
                        </React.Fragment>
                    )) ?? null}
                </div>
            </ErrorDialog>
            <ErrorDialog
                isOpen={loadError !== null}
                title='Cannot load form from file'
                onDismissed={() => setLoadError(null)}
            >
                <div>Cannot load form from a file because the file appears invalid</div>
                <div>{loadError}</div>
            </ErrorDialog>
            <SubmissionErrorDialog error={submitError} contextDataGetter={ctxGetter} onDismissed={() => setSubmitError(null)} />

            <div>
                <div style={{ alignItems: 'center', backgroundColor: '#eee', display: 'flex', flexDirection: 'column', gap: 'var(--mbdb-hgap)' }}>
                    <div style={{ display: 'grid', gap: 'var(--mbdb-hgap)', gridTemplateColumns: 'auto auto auto' }}>
                        {/* First row */}
                        <SButton color='red' inverted onClick={() => console.log(ctxGetter())}>Dump Full Object (don't touch)</SButton>
                        <SButton color='red' inverted onClick={() => console.log(JSON.stringify(ctxGetter(), undefined, 2))}>Dump full JSON (don't touch)</SButton>
                        <SButton color='purple' inverted onClick={() => console.log(Mbdb.toData(ctxGetter(), fakeItTillYouMakeIt(schema) as ComplexItem).toApi)}>Dump MBDB-schema object</SButton>

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
                                        setLoadError((e as Error).message);
                                    }
                                }).catch((e) => {
                                    setLoadError((e as Error).message);
                                })
                            }}
                            color='teal'
                            fluid
                        />
                        <SButton
                            color='blue'
                            onClick={() => {
                                const { toApi, errors } = Mbdb.toData(ctxGetter(), fakeItTillYouMakeIt(schema) as ComplexItem);

                                if (errors.length === 0) {
                                    submitToMbdb(Config.get('baseUrl'), MbdbModels[selectedSchema].apiEndpoint, toApi).then((resp) => {
                                        if (resp.ok) {
                                            setSubmitError(null)
                                        } else {
                                            resp.json().then((j) => {
                                                setSubmitError({
                                                    status: resp.status,
                                                    message: j.message || resp.statusText,
                                                    errors: mbdbErrors(j.errors ?? []),
                                                    payload: toApi, // The metadata object, we probably won't need this in production
                                                });
                                            })
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
                            }}
                        >
                            <SIcon name='cloud upload' />
                            Deposit record (yes, really!)
                        </SButton>
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

export function FormBlock(props: { schema: Item[], contextValue: { handler: _FormContextHandler } }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', height: '95vh' }}>
            <FormContextInstance.Provider value={props.contextValue}>
                <Form schema={props.schema} />
            </FormContextInstance.Provider>
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
        ReactDOM.render(<App />, appRoot);
    } catch (e) {
        console.log(`Failed to load application configuration: ${e}`);
    }
}
