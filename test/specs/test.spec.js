import utils from 'core/utils';
import 'babel-polyfill';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

'use strict';

describe('testing', () => {
    it('testing', () => {
        console.log(utils)
        expect(utils.soup_).to.equal('!#$%()*+,-./:;=?@[]^_`{|}~' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
    });
});
