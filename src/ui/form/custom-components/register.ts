import { CustomComponent } from './';
import { ValueError } from './components/value-error';
import { assert } from '../../../assert';

const Common: Record<string, CustomComponent<any>> = {
    'value-error': ValueError,
} as const;

export const Register = {
    get(name: string, category = 'common') {
        let cc;

        switch (category) {
            case 'common':
                cc = Common[name];
                break;
            default:
                assert(false, `No custom component category "${category}"`);
        }

        assert(!!cc, `No custom component named ${name}`);
        return cc;
    },
};
