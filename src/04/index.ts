import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {once} from 'events';


export const extractAssignment = (assignment: string): { start: number, end: number } => {
    const splitAssignment = assignment.split("-");
    return {
        start: parseInt(splitAssignment[0]),
        end: parseInt(splitAssignment[1])
    }
}

const doesFullContain = (assignment1: string, assignment2: string) => {
    const extractedAssigment1 = extractAssignment(assignment1)
    const extractedAssigment2 = extractAssignment(assignment2)
    // 1-4 2-3
    // 1-4 1-3
    // 1-4 1-4
    if (extractedAssigment1.start <= extractedAssigment2.start && extractedAssigment1.end >= extractedAssigment2.end) return true;

        // 2-3 1-4
        // 1-3 1-4
    // 1-4 1-4
    else if (extractedAssigment1.start >= extractedAssigment2.start && extractedAssigment1.end <= extractedAssigment2.end) return true;

    return false;
}

export const doOverlap = (assignment1: string, assignment2: string) => {
    const extractedAssigment1 = extractAssignment(assignment1)
    const extractedAssigment2 = extractAssignment(assignment2)

    // 1-3 4-6
    if (extractedAssigment1.end < extractedAssigment2.start) return false;

    // 4-6 1-3
    else if (extractedAssigment1.start > extractedAssigment2.end) return false;

    return true;
}

export const countFullContained = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    let sum = 0;
    lineReader.on('line', (line) => {
        const assignment1 = line.split(',')[0]
        const assignment2 = line.split(',')[1]
        if (doesFullContain(assignment1, assignment2)) sum++;
    });
    await once(lineReader, 'close');
    return sum;
}

export const countOverlap = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    let sum = 0;
    lineReader.on('line', (line) => {
        const assignment1 = line.split(',')[0]
        const assignment2 = line.split(',')[1]
        if (doOverlap(assignment1, assignment2)) sum++;
    });
    await once(lineReader, 'close');
    return sum;
}