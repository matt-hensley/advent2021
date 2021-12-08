import load from '../load';
import { range } from '../util';

function bruteforce(input: string[], days: number) {
    const init = input[0].split(',').map(x => parseInt(x, 10));
    let state = init;

    for (const day of range(0, days)) {
        let born = [];
        state = state.map(fish => {
            if (fish === 0) {
                born.push(8);
                return 6;
            } else {
                return fish - 1;
            }
        });
        state = [...state, ...born];
    }

    return state.length;
}

function solution(input: string[], days: number) {
    let buckets = range(0, 9).fill(0);

    for (let x of input[0].split(',')) {
        const num = parseInt(x, 10);
        buckets[num] += 1;
    }

    for (const day of range(0, days)) {
        const born = buckets.shift();
        buckets[6] += born;
        buckets = [...buckets, born];
    }

    return buckets.reduce((acc, prev) => {
        return acc + prev;
    }, 0);
}

describe('day 6', () => {
    test('experiment pt1', async () => {
        const input = await load('./06/sample.txt');
        expect(solution(input, 18)).toBe(26);
        expect(solution(input, 80)).toBe(5934);
    });

    test('puzzle pt1', async () => {
        const input = await load('./06/input.txt');
        expect(solution(input, 80)).toBe(365131);
    });

    test('experiment pt2', async () => {
        const input = await load('./06/sample.txt');
        expect(solution(input, 256)).toBe(26984457539);
    });

    test('puzzle pt1', async () => {
        const input = await load('./06/input.txt');
        expect(solution(input, 256)).toBe(1650309278600);
    });
});
