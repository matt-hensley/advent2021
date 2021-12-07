import { promises as fs } from 'fs';

export default async function load(filename: string): Promise<string[]> {
    const f = await fs.readFile(filename);
    const lines = f.toString().split('\n');
    return lines;
}
