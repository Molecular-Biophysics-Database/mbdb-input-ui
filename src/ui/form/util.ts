import { replaceAll } from '../../util';

export function niceLabel(label: string) {
    if (label.length === 0) return label;

    return label[0].toLocaleUpperCase() + replaceAll(label.substring(1), '_', ' ');
}
