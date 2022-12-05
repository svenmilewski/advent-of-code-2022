import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {once} from 'events';
import {getFromMap, isNumber} from '../util';


const isEmptyStackTop = (input: string): boolean => {
    return input === '   ';
}

const isStackedCrate = (input: string): boolean => {
    return input.charCodeAt(0) === 91 && input.charCodeAt(2) === 93 && input.charCodeAt(1) >= 65 && input.charCodeAt(1) <= 90
}

const isStackLine = (line: string): boolean => {
    const firstCrate = line.slice(0, 3);
    return isEmptyStackTop(firstCrate) || isStackedCrate(firstCrate)
}

const isStackBottomLine = (line: string) => {
    // match pattern " 1 "
    return isNumber(line.slice(1, 2));

}

const isProcedureStepLine = (line: string): boolean => {
    const parts = line.split(' ');
    // match pattern "move 12 from 2 to 4"
    return parts[0] === 'move' &&
        isNumber(parts[1]) &&
        parts[2] === 'from' &&
        isNumber(parts[3]) &&
        parts[4] === 'to' &&
        isNumber(parts[5])
}

const stacks = new Map<number, string[]>();

const parseStackLine = (line: string): void => {
    for (let i = 0, currentStack = 1; i < line.length; i += 4, currentStack++) {
        const item = (line.slice(i, i + 3));
        if (stacks.get(currentStack) === undefined) {
            stacks.set(currentStack, [])
        }
        getFromMap(stacks, currentStack).push(item.charAt(1));
    }
}

const parseProcedureStepLine9000 = (line: string) => {
    const parts = line.split(' ');
    // match pattern "move 12 from 2 to 4"
    const amount = parseInt(parts[1]);
    const from = parseInt(parts[3]);
    const to = parseInt(parts[5])
    const fromStack = getFromMap(stacks, from);
    const toStack = getFromMap(stacks, to);
    for (let i = 0; i < amount; i++) {
        const movedCrate = fromStack.pop();
        if (movedCrate) {
            toStack.push(movedCrate);
        }
    }
}

const parseProcedureStepLine9001 = (line: string) => {
    const parts = line.split(' ');
    // match pattern "move 12 from 2 to 4"
    const amount = parseInt(parts[1]);
    const from = parseInt(parts[3]);
    const to = parseInt(parts[5])
    const fromStack = getFromMap(stacks, from);
    const toStack = getFromMap(stacks, to);

    const movedCrates = fromStack.splice(-amount, amount);
    toStack.push(...movedCrates)
}



export const getTopCrates9000 = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    lineReader.on('line', (line) => {
        if (isStackLine(line)) {
            parseStackLine(line);
        } else if (isStackBottomLine(line)) {
            stacks.forEach((stack, key, map) => {
                map.set(key, stack.reverse().filter(crate => crate !== ' '))
            });
        } else if (isProcedureStepLine(line)) {
            return parseProcedureStepLine9000(line)
        }
    });
    await once(lineReader, 'close');
    const topCrates = Array.from(stacks.values()).map(stack => stack.pop())
    return topCrates.join("")
}

export const getTopCrates9001 = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    lineReader.on('line', (line) => {
        if (isStackLine(line)) {
            parseStackLine(line);
        } else if (isStackBottomLine(line)) {
            stacks.forEach((stack, key, map) => {
                map.set(key, stack.reverse().filter(crate => crate !== ' '))
            });
        } else if (isProcedureStepLine(line)) {
            return parseProcedureStepLine9001(line)
        }
    });
    await once(lineReader, 'close');
    const topCrates = Array.from(stacks.values()).map(stack => stack.pop())
    return topCrates.join("")
}