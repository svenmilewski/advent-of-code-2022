import {createInterface} from 'readline';
import {createReadStream} from 'fs';
import {getFromMap} from '../util';
import {once} from 'events';

export enum Weapon {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

export enum Choice {
    A = 'A',
    B = 'B',
    C = 'C',
    X = 'X',
    Y = 'Y',
    Z = 'Z'
}

const choiceMap = new Map<Choice, Weapon>([
    [Choice.A, Weapon.ROCK],
    [Choice.X, Weapon.ROCK],
    [Choice.B, Weapon.PAPER],
    [Choice.Y, Weapon.PAPER],
    [Choice.C, Weapon.SCISSORS],
    [Choice.Z, Weapon.SCISSORS]
])

export const getWeaponForChoice = (choice: Choice): Weapon =>
    getFromMap(choiceMap, choice)


const scoreMap = new Map<Weapon, number>([
        [
            Weapon.ROCK, 1
        ],
        [
            Weapon.PAPER, 2
        ],
        [
            Weapon.SCISSORS, 3
        ]
    ]
)

export const getScoreForWeapon = (weapon: Weapon): number =>
    getFromMap(scoreMap, weapon)


const beatMap = new Map<Weapon, Weapon>([
    [Weapon.ROCK, Weapon.SCISSORS],
    [Weapon.SCISSORS, Weapon.PAPER],
    [Weapon.PAPER, Weapon.ROCK]
])

const getBeatingWeapon = (weapon: Weapon) => getFromMap(beatMap, weapon)

const DRAW = 3;
const WIN = 6;

export const calculateScore = (opponentWeapon: Weapon, yourWeapon: Weapon): { opponent: number, you: number } => {
    let opponentScore = getScoreForWeapon(opponentWeapon);
    let yourScore = getScoreForWeapon(yourWeapon)
    if (opponentWeapon === yourWeapon) {
        opponentScore += DRAW
        yourScore += DRAW
    } else if (getBeatingWeapon(opponentWeapon) === yourWeapon) opponentScore += WIN
    else if (getBeatingWeapon(yourWeapon) === opponentWeapon) yourScore += WIN
    return {
        opponent: opponentScore,
        you: yourScore
    }
}

export const getScore = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    let yourScore = 0;
    lineReader.on('line', (line) => {
        const values = line.split(" ").filter((value): value is Choice => Object.keys(Choice).includes(value));
        const opponentWeapon = getWeaponForChoice(values[0]);
        const yourWeapon = getWeaponForChoice(values[1]);
        const {you} = calculateScore(opponentWeapon, yourWeapon);
        yourScore += you;
    });
    await once(lineReader, 'close');

    return yourScore;
}

const isChoice = (value: string): value is Choice => Object.keys(Choice).includes(value);


// X => YOU LOSE
// Y => DRAW
// Z => YOU WIN

export const getYourWeapon = (yourChoice: Choice, opponentsChoice: Choice): Weapon => {
    if (yourChoice === 'X') return getBeatingWeapon(getWeaponForChoice(opponentsChoice));
    if (yourChoice === 'Y') return getWeaponForChoice(opponentsChoice);
    if (yourChoice === 'Z') {
        const beatenWeapon = Object.values(Weapon).find((weapon) => getBeatingWeapon(weapon) === getWeaponForChoice(opponentsChoice));
        if (!beatenWeapon) throw new Error(`No weapon found that makes you los for opponent's choice ${opponentsChoice}`)
        return beatenWeapon;
    }
    throw new Error(`Your choice must be X (you lose), Y (draw) or Z (you win)`)
}

export const getScoreTheRightWay = async (filePath = `${__dirname}/input.txt`) => {
    const lineReader = createInterface(createReadStream(filePath));
    let yourScore = 0;
    lineReader.on('line', (line) => {
        const opponentValue = line.split(" ")[0];
        const yourValue = line.split(" ")[1];
        if (isChoice(opponentValue) && isChoice(yourValue)) {
            const yourChoice = getYourWeapon(yourValue, opponentValue)
            const {you} = calculateScore(getWeaponForChoice(opponentValue), yourChoice);
            yourScore += you;
        } else {
            throw new Error(`Opponents choice ${opponentValue} is not a valid Choice.`)
        }

    });
    await once(lineReader, 'close');

    return yourScore;
}

