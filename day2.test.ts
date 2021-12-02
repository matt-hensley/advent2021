import { promises as fs } from 'fs';

async function load(): Promise<string[]> {
    const f = await fs.readFile('./day2.input.txt');
    const lines = f.toString().split('\n');
    return lines;
}

function day2(lines: string[]) {
    let pos = 0;
    let depth = 0;

    for (let line of lines) {
        const [command, value] = line.split(' ');
        const num = Number(value);

        if (command.match(/^forward/)) pos += num;
        else if (command.match(/^up/)) depth -= num;
        else if (command.match(/^down/)) depth += num;
    }

    return pos * depth;
}

describe('day 2', () => {
    test('experiment', () => {
        expect(day2(['up 1', 'down 1', 'forward 1'])).toEqual(0);
        expect(day2(['up 1', 'up 1', 'forward 7'])).toEqual(-14);
    });

    test('puzzle', async () => {
        const lines = await load();
        expect(day2(lines)).toEqual(2019945);
    });
});
