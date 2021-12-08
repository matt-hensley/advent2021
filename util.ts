export function parseIntCsv(values: string, radix: number) {
    return values.split(',').map(x => parseInt(x, radix));
}

export function range(start: number, count: number) {
    return [...Array(count).keys()].map(x => x + start);
}

export function sum(numbers: number[]): number {
    return numbers.reduce((acc, prev) => acc + prev, 0);
}
