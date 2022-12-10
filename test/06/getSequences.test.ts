import {getSequences, getStartMarkerOccurence, isStartOfPacketMarker} from '../../src/06';
import {inputString} from '../../src/06/input';

describe('get sequences', function () {
    it('should return sequences correctly (sequence % 4 = 0)', function () {
        const sequence = "abcdefgh";
        expect(getSequences(sequence, 4)).toEqual([
            "abcd",
            "bcde",
            "cdef",
            "defg",
            "efgh"
        ])
    });
    it('should return no sequence (sequence lenght < 4)', function () {
        const sequence = "abc";
        expect(getSequences(sequence, 4)).toEqual([])
    });
});

describe('is start marker', function () {
    it('should return true when all chars are different', function () {
        expect(isStartOfPacketMarker("abcd")).toBe(true)
    });
    it('should return false when chars repeat', function () {
        expect(isStartOfPacketMarker("aabc")).toBe(false)
    });
});

describe('get start of packet marker occurence', function () {
    const startOfPacketSequenceSize = 4;
    it('should return first occurence of a start marker', function () {
        expect(getStartMarkerOccurence("abcabcad",startOfPacketSequenceSize)).toEqual(8)
    });

    it('should solve the input string', function () {
        expect(getStartMarkerOccurence(inputString,startOfPacketSequenceSize)).toEqual(1760)
    });
});

describe('get start of message marker occurence', function () {
    const startOfMessageSequenceSize = 14;
    it('should return first occurence of a start marker', function () {
        expect(getStartMarkerOccurence("abcabcad1234567890",startOfMessageSequenceSize)).toEqual(18)
    });

    it('should solve the input string', function () {
        expect(getStartMarkerOccurence(inputString,startOfMessageSequenceSize)).toEqual(2974)
    });
});

