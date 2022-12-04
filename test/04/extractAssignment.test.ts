import {countFullContained, countOverlap, doOverlap, extractAssignment} from '../../src/04';

describe('extract assignment', function () {
    it('should correctly extract assignment', function () {
        expect(extractAssignment("0-4")).toEqual({
            start: 0,
            end: 4
        })
    });
    it('should correctly count the full containing assignments', async function () {
        console.log(await countFullContained())
    });

    it('should correctly determine overlap', function () {
        expect(doOverlap("1-3", "4-6")).toEqual(false)
        expect(doOverlap("5-9", "1-4")).toEqual(false)

        expect(doOverlap("1-3", "3-6")).toEqual(true)
        expect(doOverlap("5-9", "3-5")).toEqual(true)

        expect(doOverlap("1-3", "2-6")).toEqual(true)
        expect(doOverlap("2-6", "1-3")).toEqual(true)

    });

    it('should correctly count the overlapping assignments', async function () {
        console.log(await countOverlap())
    });
});