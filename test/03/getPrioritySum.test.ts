import {divideRucksack, getBadge, getPriority, getPrioritySum, getPrioritySumForBadges} from '../../src/03';

describe('getPrioritySum', function () {
    it.each
        `
        char   | score
        ${'a'} | ${1}
        ${'b'} | ${2}
        ${'c'} | ${3}
        ${'d'} | ${4}
        ${'e'} | ${5}
        ${'f'} | ${6}
        ${'g'} | ${7}
        ${'h'} | ${8}
        ${'i'} | ${9}
        ${'j'} | ${10}
        ${'k'} | ${11}
        ${'l'} | ${12}
        ${'m'} | ${13}
        ${'n'} | ${14}
        ${'o'} | ${15}
        ${'p'} | ${16}
        ${'q'} | ${17}
        ${'r'} | ${18}
        ${'s'} | ${19}
        ${'t'} | ${20}
        ${'u'} | ${21}
        ${'v'} | ${22}
        ${'w'} | ${23}
        ${'x'} | ${24}
        ${'y'} | ${25}
        ${'z'} | ${26}
        `
    ('should return correct priority for char', function ({char,score}) {
        expect(getPriority(char)).toEqual(score)
        expect(getPriority(char.toUpperCase())).toEqual(score + 26)
    });

    it('should divide rucksack correctly', function () {
        expect(divideRucksack('abcdefgh')).toEqual(['abcd', 'efgh'])
    });

    it('should get corect badge', function () {
        const rucksacks = [
            "abcdefghi",
            "hjk",
            "optrzzUJNh"
        ];
        expect(getBadge(rucksacks)).toEqual('h')
    });

    it('should return correct priority sum', async function () {
        console.log(await getPrioritySum())
    });

    it('should return correct bagde priority sum', async function () {
        console.log(await getPrioritySumForBadges())
    });


});