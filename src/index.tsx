import React from 'react';
import PropTypes from 'prop-types';
import { AppConfig, Config } from './config';
import { FormContext, FormContextInstance } from './context';
import { FormContextHandler, _FormContextHandler } from './context/handler';
import { getKeeper } from './context/keeper';
import { MbdbModels } from './mbdb/models';
import { Form } from './ui/form';
import { Configuration } from './schema/configuration';
import { Register as ConfigurationRegister } from './schema/configuration/register';
import { Register as SchemaRegister } from './schema/schemas/register';
import { Uuid } from './schema/uuid';
import { objKeys } from './util';

import 'semantic-ui-less/semantic.less';
import '../assets/input-form.css';

export type SchemaNames = keyof typeof MbdbModels;

/**
 * Configures the schema object and creates or updates the
 * `FormContext` object in the `Keeper` data storage object.
 *
 * @param { string } dataId - ID of the data within the `Keeper` data storage object.
 * @param { SchemaNames } schemaName - Name of the schema to use
 * @return { void }
 */
export function initForm(dataId: string, schemaName: SchemaNames) {
    const schema = Configuration.configure(
        SchemaRegister[schemaName].schema,
        ConfigurationRegister[schemaName]
    );

    const data = FormContext.create(schema);
    getKeeper().set(dataId, { schemaName, data });
}

/**
 * Custom hook that creates the FormContextHandler.
 * @param { string } dataId - ID of the data within the `Keeper` data storage object
 * @param { SchemaName } schemaName - Name of the schema to use
 * @return { _FormContextHandler }
 */
export function useContextHandler(dataId: string, schemaName: SchemaNames) {
    const ctxHandler = React.useMemo(() => {
        initForm(dataId, schemaName);

        const ctxGetter = () => getKeeper().get(dataId)!.data!;
        const ctxUpdater = (handler: any) => setContextValue({ handler });
        const ctxHandler = FormContextHandler.make(ctxGetter, ctxUpdater);

        return ctxHandler;
    }, []);
    const [_contextValue, setContextValue] = React.useState({ handler: ctxHandler });

    return ctxHandler;
}

/**
 * `MinimalInputForm` is a component that creates an input form based of the provided `schemaName`.
 * Unlike `ManagedInputForm`, `MinimalInputForm` receives `FormContextHandler` instance as a property.
 * This gives the user full control over the data in the form and the option to trigger re-renders
 * if the form's data is changed externally.
 * `MinimalInputForm` does not initialize the configuration object. It is the user's responsibility
 * to do that prior to rendering the component. *
 * See the code of `ManagedInputForm` for guidance how to create a `FormContextHandler` instance.
 *
 * @param props - The properties object
 * @param { string } props.dataId - ID of the data within the `Keeper` data storage object. Shall be unique for each rendered form.
 * @param { SchemaNames } props.schemaName - Name of the schema to render in the form
 * @param { _FormContextHandler } props.formContextHandler - `_FormContextHandler` instance
 */
export function MinimalInputForm(props: { dataId: string, schemaName: SchemaNames, formContextHandler: _FormContextHandler }) {
    // BEWARE: No, we cannot use useEffect here because it runs too late.
    // We need to execute this logic *before* the Form gets rendered to avoid ending up
    // in an inconsistent state
    const stored = getKeeper().get(props.dataId);
    if (stored) {
        if (stored.schemaName !== props.schemaName) {
            initForm(props.dataId, props.schemaName);
        }
    }

    return (
        <div className='mbdbi-app-tainer'>
            <FormContextInstance.Provider value={{ handler: props.formContextHandler }}>
                <Form schema={props.formContextHandler.schema()} />
            </FormContextInstance.Provider>
        </div>
    );
}

/**
 * `ManagedInputForm` is a component that creates an input form based of the provided `schemaName`.
 * Unlike `StandaloneInputForm`, `ManagedInputForm` allows the user to specify the `dataId` as a property.
 * The `dataId` may then be used to retrieve data from the form. It is the responsibility of the user
 * to provide sensible `dataId` values.
 * `ManagedInputForm` does not initialize the configuration object. It is the user's responsibility
 * to do that prior to rendering the component.
 *
 * @param props - The properties object
 * @param { string } props.dataId - ID of the data within the `Keeper` data storage object. Shall be unique for each rendered form.
 * @param { SchemaNames } props.schemaName - Name of the schema to render in the form
 */
export function ManagedInputForm(props: { dataId: string, schemaName: SchemaNames }) {
    const ctxHandler = useContextHandler(props.dataId, props.schemaName);

    return <MinimalInputForm dataId={props.dataId} schemaName={props.schemaName} formContextHandler={ctxHandler} />;
}
ManagedInputForm.propTypes = {
    dataId: PropTypes.string.isRequired,
    schemaName: PropTypes.oneOf(Object.values(objKeys(MbdbModels))),
}

/**
 * `StandaloneInputForm` is a component that creates an input form based of the provided `schemaName`.
 * `StandaloneInputForm` will also create the corresponding data object for the form and initialize
 * configuration object if `appConfiguration` is provided.
 * At the moment the component does not provide any functionality to retrieve the data directly
 * and should be only used for testing.
 *
 * @param props - The properties object
 * @param { SchemaNames } props.schemaName - Name of the schema to render in the form
 * @param props.appConfiguration - Optional configuration options
 */
export function StandaloneInputForm(props: { schemaName: SchemaNames, appConfiguration: Partial<AppConfig> }) {
    const dataId = React.useMemo(() => Uuid.get(), []);
    React.useEffect(() => {
        Config.set(props.appConfiguration);

        return () =>  {
            getKeeper().remove(dataId);
        };
    }, []);

    return <ManagedInputForm dataId={dataId} schemaName={props.schemaName} />;
}
StandaloneInputForm.propTypes = {
    schemaName: PropTypes.oneOf(Object.values(objKeys(MbdbModels))),
    appConfiguration: PropTypes.shape({
        baseUrl: PropTypes.string,
        isDevel: PropTypes.bool,
        vocabulariesApiEndpoint: PropTypes.string,
    }),
}
