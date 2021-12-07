import load from '../load';

function day2(lines: string[], aiming = false) {
    let pos = 0;
    let depth = 0;
    let aim = 0;

    for (let line of lines) {
        const [command, value] = line.split(' ');
        const num = Number(value);

        if (aiming) {
            if (command.match(/^forward/)) {
                pos += num;
                depth += aim * num;
            } else if (command.match(/^up/)) aim -= num;
            else if (command.match(/^down/)) aim += num;
        } else {
            if (command.match(/^forward/)) pos += num;
            else if (command.match(/^up/)) depth -= num;
            else if (command.match(/^down/)) depth += num;
        }
    }

    return pos * depth;
}

describe('day 2', () => {
    test('experiment', () => {
        expect(day2(['up 1', 'down 1', 'forward 1'])).toEqual(0);
        expect(day2(['up 1', 'up 1', 'forward 7'])).toEqual(-14);
    });

    test('puzzle', async () => {
        const lines = await load('./02/day2.input.txt');
        expect(day2(lines)).toEqual(2019945);
    });

    test('puzzle pt 2', async () => {
        const lines = await load('./02/day2.input.txt');
        expect(day2(lines, true)).toEqual(1599311480);
    });
});
