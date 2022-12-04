import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {once} from 'events';

export const divideRucksack = (content: string): string[] => {
    if (!(content.length % 2 === 0)) throw new Error(`Rucksack content ${content} is not safely dividable.`)
    const compartment1 = content.slice(0, content.length / 2);
    const compartment2 = content.slice(content.length / 2);
    return [compartment1, compartment2]
}

export const getDoubleItem = (content: string): string | null => {
    const compartments = divideRucksack(content);
    let doubleChar;
    for (const char of compartments[0]) {
        if (compartments[1].includes(char)) {
            doubleChar = char;
            break;
        }
    }
    return doubleChar ?? null
}

export const getPriority = (char: string) => {
    const charCode = char.charCodeAt(0);
    return charCode > 96 ? charCode - 96 : charCode - 38
}

export const getPrioritySum = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    let sum = 0;
    lineReader.on('line', (line) => {
        const doubleItem = getDoubleItem(line);
        if (doubleItem) sum += getPriority(doubleItem)
    });
    await once(lineReader, 'close');
    return sum;
}

export const getBadge = (rucksacks: string[]): string => {
    let badge;
    for (const char of rucksacks[0]) {
        if (rucksacks[1].includes(char) && rucksacks[2].includes(char)) {
            badge = char;
            break;
        }
    }
    if (!badge) {
        throw new Error(`No badges found for rucksacks: ${rucksacks}`)
    }
    return badge;
}

export const getPrioritySumForBadges = async (filePath = `${__dirname}/input.txt`) => {
    const teamSize = 3;
    const lineReader = createInterface(createReadStream(filePath));
    let sum = 0;
    let lines: string[] = [];
    lineReader.on('line', (line) => {
        lines.push(line)
        if (lines.length === teamSize) {
            sum += getPriority(getBadge(lines));
            lines = [];
        }
    });
    await once(lineReader, 'close');
    return sum;
}