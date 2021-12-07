import load from '../load';

function step(l: number, r: number) {
    if (l < r) return 1;
    if (l > r) return -1;
    return 0;
}

function solution(input: string[], diagonal = false) {
    const lines = input.map(line => {
        const [start, end] = line.split('->');
        const [x1, y1] = start.split(',').map((n) => parseInt(n.trim(), 10));
        const [x2, y2] = end.split(',').map((n) => parseInt(n.trim(), 10));
        return { x1, y1, x2, y2 };
    });
    let points = {};

    for (const line of lines) {
        if (diagonal === false && (line.x1 !== line.x2 && line.y1 !== line.y2)) {
            continue;
        }

        const xStep = step(line.x1, line.x2);
        const yStep = step(line.y1, line.y2);

        let x = line.x1;
        let y = line.y1;

        while (x !== line.x2 + xStep || y !== line.y2 + yStep) {
            const coord = `${x}x${y}`;
            points[coord] = (points[coord] || 0) + 1;

            x += xStep;
            y += yStep;
        }
    }

    return [...Object.values(points)].filter(x => x > 1).length;
}

describe('day 5', () => {
    test('experiment pt1', async () => {
        const input = await load('./05/sample.txt');
        const x = solution(input);
        expect(x).toBe(5);
    });

    test('experiment pt2', async () => {
        const input = await load('./05/sample.txt');
        const x = solution(input, true);
        expect(x).toBe(12);
    });

    test('puzzle pt1', async () => {
        const input = await load('./05/input.txt');
        const x = solution(input);
        expect(x).toBe(5280);
    });

    test('puzzle pt2', async () => {
        const input = await load('./05/input.txt');
        const x = solution(input, true);
        expect(x).toBe(16716);
    });
});
