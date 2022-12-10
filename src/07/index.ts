import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { once } from 'events';

export const COMMAND_PROMPT = '$';

export const LS_COMMAND = 'ls';
export const CD_COMMAND = 'cd';

export type LsCommand = `ls ${string}`;
export type CdCommand = `cd ${string}`;

export const DIR = 'dir';
export type Result = DirResult | FileResult;
export type DirResult = `${typeof DIR} ${string}`;
export type FileResult = `${string} ${string}`;

export type Filesystem = Directory & {
  name: '/';
};

export type File = {
  name: string;
  size: number;
};

export type Directory = {
  name: string;
  directories: Directory[];
  files: File[];
  '..'?: Directory;
};

export const parseLS = (
  lsResults: string[]
): Pick<Directory, 'directories' | 'files'> => {
  const directory: Pick<Directory, 'directories' | 'files'> = {
    directories: [],
    files: []
  };
  lsResults.forEach((line) => {
    if (isDirLSLineResult(line)) {
      directory.directories.push(parseDirLSLineResult(line));
    } else if (isFileLSLineResult(line)) {
      directory.files.push(parseFileLSLineResult(line));
    } else {
      // unrecognized line
    }
  });

  return directory;
};

export const isCommandLine = (line: string) => {
  return line.startsWith(`${COMMAND_PROMPT} `);
};

export const isCdCommand = (command: string): command is CdCommand => {
  return command.startsWith(`${COMMAND_PROMPT} ${CD_COMMAND} `);
};

const parseDirectoryNameFromCdCommand = (cdCommand: CdCommand) => {
  return cdCommand.slice(`${COMMAND_PROMPT} ${CD_COMMAND}`.length + 1);
};

export const isDirLSLineResult = (line: string): line is DirResult => {
  return line.startsWith(DIR);
};

export const isFileLSLineResult = (line: string): line is FileResult => {
  const command = line.match(/(?<size>\d+) (?<name>\w*)/);
  if (!command?.groups?.size || !command?.groups?.name) {
    return false;
  }
  return (
    !isNaN(parseInt(command?.groups?.size)) &&
    typeof command?.groups.name === 'string' &&
    command?.groups.name.length > 0
  );
};

export const parseDirLSLineResult = (line: DirResult): Directory => {
  return {
    name: line.slice(DIR.length + 1),
    directories: [],
    files: []
  };
};

export const parseFileLSLineResult = (
  line: FileResult
): { size: number; name: string } => {
  const command = line.match(/(?<size>\d+) (?<name>\w*)/);
  if (!command?.groups?.size || !command?.groups?.name) {
    throw new Error('FileLSLineResult not parseable');
  }
  return {
    name: command.groups.name,
    size: parseInt(command.groups.size)
  };
};

export const parseFile = async (filePath = `${__dirname}/input.txt`) => {
  const startPath = '/';
  const fileSystem: Filesystem = {
    files: [],
    name: startPath,
    directories: []
  };
  let currentDirectory: Directory = fileSystem;
  const lineReader = createInterface(createReadStream(filePath));
  lineReader.on('line', (line) => {
    if (isCommandLine(line)) {
      if (isCdCommand(line)) {
        const subDirectoryName: string = parseDirectoryNameFromCdCommand(line);
        if (subDirectoryName === '..') {
          if (currentDirectory['..']) {
            currentDirectory = currentDirectory['..'];
          }
        } else {
          const subDirectory: Directory = {
            name: subDirectoryName,
            directories: [],
            files: [],
            '..': currentDirectory
          };
          if (
            !currentDirectory.directories.find(
              (directory) => directory.name === subDirectoryName
            )
          ) {
            currentDirectory.directories.push(subDirectory);
          }
          const parentDir = currentDirectory;
          currentDirectory = { ...subDirectory, '..': parentDir };
        }
      }
    }
  });
  await once(lineReader, 'close');
};
