import {getTopCrates9000, getTopCrates9001} from '../../src/05';

describe('get top crates 9000', function () {
    it('should should return top crates', async function () {
        expect(await getTopCrates9000()).toEqual("TWSGQHNHL")
    });
});

describe('get top crates 9001', function () {
    it('should should return top crates', async function () {
        expect(await getTopCrates9001()).toEqual("JNRSCDWPP")
    });
});