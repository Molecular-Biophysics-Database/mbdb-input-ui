MBDB input form
===

This repository contains code of the input form that serves as the primary means how to deposit data into the MBDB Biophysics Database.
MBDB input form is built on top of [React](https://react.dev/) and [Semantic UI](https://semantic-ui.com/).

## Use of the form components in custom code

### Simple case

To embed the input form in a custom code, you may use the following code snippet

```jsx
import { ManagedInputForm } from '@mbdb/input-form/lib';
import { getKeeper } from '@mbdb/input-form/lib/context/keeper';

// Data identifier in the input form's internal data storage
// You will need this identifier to retrieve the data filled in the form.
// If you want to have multiple forms in your application, you will have
// to generate a unique identifier for each form.
const mbdbDataId = 'mbdb-form-data-id';

function ComponentWithInputForm() {
    return (
        <div>
            <button onClick={() => {
                const formData = getKeeper().get(mbdbDataId).data;
                console.log(data);
            }}>Dump form data</button>

            <ManagedInputForm dataId={mbdbDataId} schemaName='mst' />
        </div>
    );
}
```

The code above will display a for and allow you to read its content by quering the `Keeper` data storage object.

### Advanced case

If you need more than read-only access to the form's data, a bit more sophistication is needed.
Apart from the form component you will also need to create a `handler`. You can use the `handler` to manipulate data in the form
and tell the form to re-render itself.

The code below demonstrates how to create the `handler` and `MinimalInputForm` component to get a form over which you can have full
control from "the outside".

```jsx
import { MinimalInputForm, initForm } from '@mbdb/input-form/lib';
import { FormContext } from '@mbdb/input-form/lib/context';
import { FormContextHandler } from '@mbdb/input-form/lib/context/handler';
import { Deserialize } from '@mbdb/input-form/lib/mbdb/deserialize';
import { getKeeper } from '@mbdb/input-form/lib/context/keeper';

// Data identifier in the input form's internal data storage
// You will need this identifier to retrieve the data filled in the form.
// If you want to have multiple forms in your application, you will have
// to generate a unique identifier for each form.
const mbdbDataId = 'mbdb-form-data-id';
const mbdbSchemaName = 'mst';

function ComponentWithInputForm() {
    const { ctxHandler } = React.useMemo(() => {
        const keeper = getKeeper();
        initForm(mbdbDataId, mbdbSchemaName);

        const ctxGetter = () => keeper.get(mbdbDataId).data;
        const ctxUpdater = (handler) => setContextValue({ handler });
        const ctxHandler = FormContextHandler.make(ctxGetter, ctxUpdater);

        return { ctxHandler };
    }, []);
    const [_contextValue, setContextValue] = React.useState({ handler: ctxHandler });
    const [inputFile, setInputFile] = React.useState(null);

    return (
        <div>
            <button onClick={() => {
                const formData = ctxHandler.data();
                console.log(formData);
            }}>Dump form data</button>

            <input
                type='file'
                accept='application/json'
                onChange={(ev) => {
                    if (ev.currentTarget.files) setInputFile(ev.currentTarget.files[0]);
                }}
            />

            <button onClick={() => {
                if (inputFile === null) return;

                const getData = () => getKeeper().get(mbdbDataId).data;
                Deserialize.fromFile(getData(), inputFile, { allowPartials: true }).then((internalData) => {
	                try {
                        FormContext.load(internalData, getData());
                        ctxHandler.update();
                    } catch (e) {
                        console.error(e);
                    }
                }).catch((e) => {
                    console.error(e);
                })
            }}>Load data from file</button>

            <MinimalInputForm dataId={mbdbDataId} schemaName={mbdbSchemaName} formContextHandler={ctxHandler} />
        </div>
    );
}
```

## Important notes
The `Keeper` is a simple _key-value_ store and it does not keep track of whether the data it stores is actually used.
When you are done using the input form (i. e. when your component that embeds the form unmounts), do not forget to call
`getKeeper().remove(ID)` to avoid memory leaks.


## Styling
MBDB input form relies heavily on Semantic UI components. If your application already uses Semantic UI, MBDB input form will
receive styling directly from your application as long as the code that embeds the form imports your Semantic UI CSS.

If your application does not use Semantic UI, you may use the `mbdb-input-form.css` and `*.woff` files provided in the `dist` directory to get proper styling
of the Semantic UI components.
