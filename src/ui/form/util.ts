import { replaceAll } from '../../util';

export function niceLabel(label: string, noop = false) {
    if (label.length === 0 || noop) return label;

    return label[0].toLocaleUpperCase() + replaceAll(label.substring(1), '_', ' ');
}
