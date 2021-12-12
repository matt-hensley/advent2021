import load from '../load';
import { sum } from '../util';

function partition<T>(items: T[], predicate: (T) => boolean): T[][] {
    let yes = [], no = [];
    for (let item of items) {
        if (predicate(item)) yes.push(item);
        else no.push(item);
    }
    // return [yes.length ? yes : null, no.length ? no : null];
    return [yes, no];
}

function intersects(target: string, candidate: string) {
    return candidate.split('').every(c => target.indexOf(c) !== -1);
}

function parse(input: string[]) {
    const pairs = input.map(x => {
        return x.split('|').map(y => {
            return y.split(' ')
                .map(z => z.trim())
                .filter(z => z.length > 0)
                .map(s => s.split('').sort().join(''));
        });
    });
    return pairs;
}

function pt1(input: string[]) {
    const pairs = parse(input);
    const counts = pairs.map(pair => {
        const [patterns, output] = pair;
        const one = output.filter(x => x.length === 2).length;
        const four = output.filter(x => x.length === 4).length;
        const seven = output.filter(x => x.length === 3).length;
        const eight = output.filter(x => x.length === 7).length;
        return sum([one, four, seven, eight]);
    });

    return sum(counts);
}

function pt2(input: string[]) {
    const pairs = parse(input);
    const outputs = pairs.map(pair => {
        const [patterns, output] = pair;
        const one = patterns.find(x => x.length === 2);
        const four = patterns.find(x => x.length === 4);
        const seven = patterns.find(x => x.length === 3);
        const eight = patterns.find(x => x.length === 7);

        const nine_zero_or_six = patterns.filter(x => x.length === 6);
        const [[nine], not_nines] = partition(nine_zero_or_six, x => {
            return intersects(x, four);
        });
        const [[zero], [six]] = partition(not_nines, x => {
            return intersects(x, one);
        });

        const three_five_or_two = patterns.filter(x => x.length === 5);
        const [[three], not_threes] = partition(three_five_or_two, x => {
            return intersects(x, one);
        });
        const [[five], [two]] = partition(not_threes, x => {
            return intersects(nine, x);
        });

        const mapping = [zero, one, two, three, four, five, six, seven, eight, nine];
        const digits = output.map(x => mapping.indexOf(x));
        return parseInt(digits.join(''), 10);
    });

    return sum(outputs);
}

describe('day 8', () => {
    test('experiment pt1', async () => {
        const input = await load('./08/sample.txt');
        expect(pt1(input)).toBe(26);
    });

    test('puzzle pt1', async () => {
        const input = await load('./08/input.txt');
        expect(pt1(input)).toBe(381);
    });

    test('experiment pt2', async () => {
        const input = await load('./08/sample.txt');
        expect(pt2(input)).toBe(61229);
    });

    test('puzzle pt2', async () => {
        const input = await load('./08/input.txt');
        expect(pt2(input)).toBe(1023686);
    });
});
