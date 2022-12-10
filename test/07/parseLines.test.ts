import {
    DirResult,
    isCommandLine,
    isDirLSLineResult,
    isFileLSLineResult,
    parseDirLSLineResult, parseFile,
    parseFileLSLineResult,
    parseLS, Result
} from '../../src/07';

describe('should determine line type', function () {
    it('should determine dir line', function () {
        expect(isDirLSLineResult("dir blubb")).toEqual(true);
    });
    it('should determine non-dir line', function () {
        expect(isDirLSLineResult("bla blubb")).toEqual(false);
    });
    it('should determine file line', function () {
        expect(isFileLSLineResult("1234 yep!")).toBe(true)
    });
    it('should determine non-file line (no name)', function () {
        expect(isFileLSLineResult("123 ")).toBe(false)
    });
    it('should determine non-file line (no size)', function () {
        expect(isFileLSLineResult("bla blubb")).toBe(false)
    });
});

describe('should parse line', function () {
    it('should parse dir line', function () {
        const dirName = "blubb";
        expect(parseDirLSLineResult(`dir ${dirName}`)).toEqual({
            directories: [],
            files: [],
            name: "blubb"
        })
    });
    it('should parse file line', function () {
        const fileName = "myFile";
        const size = "1987";
        expect(parseFileLSLineResult(`${size} ${fileName}`)).toEqual({
            name: fileName,
            size: parseInt(size)
        })
    });
});

describe('is command line', function () {
    it('should determine command line correctly', function () {
        expect(isCommandLine("$ derBefehl")).toBe(true)
    });
    it('should determine non-command line correctly', function () {
        expect(isCommandLine("$")).toBe(false)
    });
    it('should determine non-command line correctly', function () {
        expect(isCommandLine("anything else")).toBe(false)
    });
});

describe('parse ls result', function () {
    it('should correctly parse ls result', function () {
        const lsResult: Result[] = [
            'dir oneDir',
            '123 fileA',
            '456 fileB',
            'dir secondDir',
            '789 fileC',
            'some other stuff',
            '098 fileD',
            'dir blubber'
        ];

        expect(parseLS(lsResult)).toEqual({
            directories: [
                parseDirLSLineResult(lsResult[0] as DirResult),
                parseDirLSLineResult(lsResult[3] as DirResult),
                parseDirLSLineResult(lsResult[7] as DirResult)
            ],
            files: [
                parseFileLSLineResult(lsResult[1]),
                parseFileLSLineResult(lsResult[2]),
                parseFileLSLineResult(lsResult[4]),
                parseFileLSLineResult(lsResult[6]),
            ]
        })
    });
});

describe('should parse a terminal result',  function () {
    it.skip('should parse test file', async function () {
         expect(await parseFile(`${__dirname}/testInput.txt`)).toEqual("BLUBB")
    });
});