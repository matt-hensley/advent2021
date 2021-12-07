import { promises as fs } from 'fs';

async function day1(measure = 1) {
    const f = await fs.readFile('./day1.txt');
    const inputs = f.toString().split('\n').map(x => parseInt(x));//.slice(0, 10);
    const increments = inputs.reduce((acc, curr, index) => {
        if (measure > index) return acc;
        // if (measure + index > inputs.length) return acc;

        const sum = inputs.slice(index - measure, index).reduce((acc, prev) => acc + prev, 0);
        const left = inputs.slice(index - measure, index).reduce((acc, prev) => acc + prev, 0);
        const right = inputs.slice(index - measure + 1, index + 1).reduce((acc, prev) => acc + prev, 0);
        console.log(left, right)

        if (left < right) return acc + 1;

        return acc;
    }, 0);
    console.log(increments);
}

day1(3);
