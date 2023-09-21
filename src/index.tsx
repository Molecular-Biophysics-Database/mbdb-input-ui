import React from 'react';
import { AppConfig, Config } from './config';
import { FormContext, FormContextInstance } from './context';
import { FormContextHandler } from './context/handler';
import { Form } from './ui/form';
import { Register as SchemaRegister } from './schema/schemas/register';

export function MbdbInputForm(schema: keyof typeof SchemaRegister, appConfiguration: Partial<AppConfig>) {
    const _schema = SchemaRegister[schema].schema;
    const ctxGetter = () => FormContext.create(_schema);
    const ctxUpdater = (handler: any) => setContextValue({ handler });
    const contextHandler = React.useMemo(() => {
        return FormContextHandler.make(ctxGetter, ctxUpdater);
    }, []);
    const [contextValue, setContextValue] = React.useState({ handler: contextHandler });

    React.useEffect(() => {
        Config.set(appConfiguration);
    }, []);

    return (
        <FormContextInstance.Provider value={contextValue}>
            <Form schema={_schema} />
        </FormContextInstance.Provider>
    );
}
