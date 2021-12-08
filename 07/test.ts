import load from '../load';
import { parseIntCsv, range, sum } from '../util';

function solution(input: string[], constant_fuel = true) {
    const crabs = parseIntCsv(input[0], 10);
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);

    const fuel = range(min, max - min).map(target => {
        const usage = crabs.map(crab => {
            const diff = Math.abs(target - crab);

            if (constant_fuel) {
                return diff;
            } else {
                if (diff === 0) return 0;
                else return sum(range(1, diff));
            }
        });

        return sum(usage);
    });

    return Math.min(...fuel);
}

describe('day 7', () => {
    test('experiment pt1', async () => {
        const input = await load('./07/sample.txt');
        expect(solution(input)).toBe(37);
    });

    test('puzzle pt1', async () => {
        const input = await load('./07/input.txt');
        expect(solution(input)).toBe(341534);
    });

    test('experiment pt2', async () => {
        const input = await load('./07/sample.txt');
        expect(solution(input, false)).toBe(168);
    });

    test('puzzle pt2', async () => {
        const input = await load('./07/input.txt');
        expect(solution(input, false)).toBe(93397632);
    });
});
