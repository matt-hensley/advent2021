import { promises as fs } from 'fs';

const sum = (a, b) => a + b;

async function load_input(): Promise<number[]> {
    const f = await fs.readFile(__dirname + '/day1.txt');
    const inputs = f.toString().split('\n').map(x => parseInt(x));
    return inputs;
}

function day1(inputs, window = 1) {
    const increments = inputs.reduce((acc, curr, index) => {
        if (window > index) return acc;

        // this looks required per ascii diagram?
        // if (window + index > inputs.length) return acc;

        const left = inputs.slice(index - window, index).reduce(sum, 0);
        const right = inputs.slice(index - window + 1, index + 1).reduce(sum, 0);

        if (left < right) return acc + 1;

        return acc;
    }, 0);
    return increments;
}

// [[window size, expected output], ...]
test.each([[1, 1602], [3, 1633]])('puzzle, window = %i', async (window, expected) => {
    const inputs = await load_input();
    expect(day1(inputs, window)).toEqual(expected);
});
