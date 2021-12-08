export default function range(start: number, count: number) {
    return [...Array(count).keys()].map(x => x + start);
}
