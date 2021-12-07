import { promises as fs } from 'fs';

async function load(sample = false): Promise<string[]> {
    const f = await fs.readFile(__dirname + (sample ? '/sample.txt' : '/input.txt'));
    const lines = f.toString().split('\n');
    return lines;
}

function frequency(lines: string[], pos: number) {
    let zero = 0;
    let one = 0;

    for (let line of lines) {
        if (line[pos] === '1') one += 1;
        else zero += 1;
    }

    return { zero: zero, one: one };
}

function pt(lines: string[]) {
    const len = lines[0].length - 1; // sadness
    const columns = [...Array(len).keys()].map(pos => frequency(lines, pos));
    const gamma = parseInt(columns.reduce((acc, x) => {
        return acc + (x.one < x.zero ? '1' : '0');
    }, ''), 2);
    const epsilon = parseInt(columns.reduce((acc, x) => {
        return acc + (x.one > x.zero ? '1' : '0');
    }, ''), 2);

    const o2 = parseInt(columns.reduce((acc, column, currentIndex) => {
        if (acc.length === 1) return acc;

        const f = frequency(acc, currentIndex);
        const target = (f.one === f.zero || f.one > f.zero)
            ? '1'
            : '0';
        return acc.filter(line => line[currentIndex] === target);
    }, lines)[0], 2);

    const co2 = parseInt(columns.reduce((acc, column, currentIndex) => {
        if (acc.length === 1) return acc;

        const f = frequency(acc, currentIndex);
        const target = (f.one === f.zero || f.one > f.zero)
            ? '0'
            : '1';
        return acc.filter(line => line[currentIndex] === target);
    }, lines)[0], 2);

    return {
        gamma,
        epsilon,
        power: gamma * epsilon,
        co2,
        o2,
        lifeSupport: co2 * o2
    };
}

test('experiment', async () => {
    const input = await load(true);
    expect(pt(input).power).toEqual(198);
    expect(pt(input).co2).toEqual(10);
    expect(pt(input).o2).toEqual(23);
    expect(pt(input).lifeSupport).toEqual(230);
});

test('puzzle', async () => {
    const input = await load(false);
    expect(pt(input).power).toEqual(2967914);
    expect(pt(input).lifeSupport).toEqual(7041258);
});
