import load from '../load';
import { parseIntCsv } from '../util';

function parseCards(lines: string[]) {
    let cards = [];

    for (let i = 0; i < lines.length; i += 6) {
        const numbers = lines.slice(i, i + 6)
            .join(' ')
            .split(' ')
            .map(x => parseInt(x, 10))
            .filter(x => !isNaN(x));
        cards.push(numbers);
    }

    return cards;
}

function mark(called: number, card: number[]) {
    const idx = card.indexOf(called);

    if (idx !== -1) return Object.assign([], card, { [idx]: null });
    else return card;
}

function check(card: number[]) {
    // rows
    for (let i = 0; i < card.length; i += 5) {
        const won = card.slice(i, i + 5).every(x => x === null);
        if (won) return true;
    }

    // columns
    const column = card.filter((value, index) => index % 5 === 0);
    const won = column.every(x => x === null);
    if (won) return true;

    return false;
}

function sum(card: number[]) {
    return card.reduce((acc, prev) => acc + prev, 0);
}

function bingo(lines: string[]) {
    let numbers = parseIntCsv(lines[0].trim(), 10);
    let cards = parseCards(lines.slice(1));
    let used = [];

    while (numbers.length && cards.length) {
        const call = numbers.shift();

        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === null) continue;

            cards[i] = mark(call, cards[i]);
            const won = check(cards[i]);

            if (won) {
                const unmarked = sum(cards[i]);

                used.push({
                    call,
                    unmarked,
                    product: call * unmarked,
                    card: cards[i]
                });
                cards[i] = null;
            }
        }
    }

    return used;
}

test('experiment', async () => {
    const input = await load('./04/sample.txt');
    const game = bingo(input);
    const o = game[0];
    expect(o.call).toEqual(24);
    expect(o.unmarked).toEqual(188);
    expect(o.product).toEqual(4512);
});

test('puzzle pt1', async () => {
    const input = await load('./04/input.txt');
    const game = bingo(input);
    const o = game[0];
    expect(o.call).toEqual(54);
    expect(o.unmarked).toEqual(639);
    expect(o.product).toEqual(34506);
});

test('puzzle pt2', async () => {
    const input = await load('./04/input.txt');
    const game = bingo(input);
    const o = game[game.length - 1];
    expect(o.call).toEqual(42);
    expect(o.unmarked).toEqual(183);
    expect(o.product).toEqual(7686);
});
