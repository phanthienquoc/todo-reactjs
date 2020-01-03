export const formatNumberThousand = (string) => {
    let formatter = new Intl.NumberFormat();
    return formatter.format(string);
}

export const maxNumberInt = (number) => {
    return number > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : number;
}

export const isNumber = (string) => {
    return !isNaN(string);
}

export const removeComma = (string) => {
    return string.replace(/,/g, '');
}

export const isEmpty = (string) => {
    if (string === undefined || string === null) return true;
    return string.length === 0;
}