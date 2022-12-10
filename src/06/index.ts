export const getSequences = (datastream: string, blocksize: number): string[] => {
    const sequences: string[] = [];
    for (let i = 0; i + blocksize <= datastream.length; i++) {
        sequences.push(datastream.slice(i, i + blocksize));
    }

    return sequences;
};

export const isStartOfPacketMarker = (sequence: string) => {
    const charArray = sequence.split('');
    return new Set(charArray).size === sequence.length;
};

export const getStartMarkerOccurence = (inputString: string, blocksize: number): number => {
   return getSequences(inputString, blocksize).findIndex(isStartOfPacketMarker) + blocksize;
};
