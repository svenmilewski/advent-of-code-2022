import {
    calculateScore,
    Choice,
    getScore,
    getScoreForWeapon,
    getScoreTheRightWay,
    getWeaponForChoice,
    getYourWeapon
} from '../../src/02';

describe('calculateScore', function () {
    it('should return draw on same weapon', function () {
        Object.values(Choice).forEach((choice) => {
            const chosenWeapon = getWeaponForChoice(choice)
            expect(calculateScore(chosenWeapon, chosenWeapon)).toEqual({
                opponent: 3 + getScoreForWeapon(chosenWeapon),
                you: 3 + getScoreForWeapon(chosenWeapon)
            })
        })
    });

    it.each`
    weapon           | weaponToBeat          
    ${Choice.A}      | ${Choice.C}    
    ${Choice.B}      | ${Choice.A}        
    ${Choice.C}      | ${Choice.B}      
   `
    ('should return correct winning score for $weapon', function ({weapon, weaponToBeat}) {
        const winningScore = 6;
        expect(calculateScore(weapon, weaponToBeat)).toEqual({
            opponent: winningScore + getScoreForWeapon(getWeaponForChoice(weapon)),
            you: getScoreForWeapon(getWeaponForChoice(weaponToBeat))
        })
    });

    it('should get the right weapon for part 2', function () {
        // DRAW
        expect(getYourWeapon(Choice.Y, Choice.A)).toEqual(getWeaponForChoice(Choice.A))
        expect(getYourWeapon(Choice.Y, Choice.B)).toEqual(getWeaponForChoice(Choice.B))
        expect(getYourWeapon(Choice.Y, Choice.C)).toEqual(getWeaponForChoice(Choice.C))
        // YOU WIN
        expect(getYourWeapon(Choice.Z, Choice.A)).toEqual(getWeaponForChoice(Choice.B))
        expect(getYourWeapon(Choice.Z, Choice.B)).toEqual(getWeaponForChoice(Choice.C))
        expect(getYourWeapon(Choice.Z, Choice.C)).toEqual(getWeaponForChoice(Choice.A))
        // YOU LOSE
        expect(getYourWeapon(Choice.X, Choice.A)).toEqual(getWeaponForChoice(Choice.C))
        expect(getYourWeapon(Choice.X, Choice.B)).toEqual(getWeaponForChoice(Choice.A))
        expect(getYourWeapon(Choice.X, Choice.C)).toEqual(getWeaponForChoice(Choice.B))
    });

    it('should return correct score (Part 1)', async function () {
        console.log(await getScore());
    });

    it('should return correct score (Part 2)', async function () {
        console.log(await getScoreTheRightWay());
    });
});