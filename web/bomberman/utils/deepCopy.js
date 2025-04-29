export function deepCopy(value) {
    if (value === null || typeof value !== 'object') return value;

    if (Array.isArray(value)) {
        return value.map(deepCopy);
    }

    const copied = {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            copied[key] = deepCopy(value[key]);
        }
    }

    return copied;
}