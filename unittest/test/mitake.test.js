const test = require('../mitake.js');
const assert = require('assert');
const { isObject } = require('util');

describe('面試題目測試', () => {

    let imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
    let lable = 'easy';

    it('#pushChords()', () => {
        let allChords = [];
        allChords = test.pushChords(imagine, allChords);
        assert.equal(Array.isArray(allChords) === true, true);
        assert.equal(allChords.length, imagine.length);
    });

    it('#countLabel()', () => {
        let labelCounts = [];

        labelCounts = test.countLabel(lable, labelCounts);

        assert.equal(Array.isArray(labelCounts) === true, true);
        assert.equal(labelCounts[lable], 1);
        assert.equal(Object.keys(labelCounts).length, 1);
    });

    it('#train()', () => {
        test.train(imagine, lable);

        assert.equal(Array.isArray(test.songs) === true, true);
        assert.equal(test.labelCounts[lable], 1);
        assert.equal(Object.keys(test.labelCounts).length, 1);
    });

    it('#getNumberOfSongs()', () => {
        test.getNumberOfSongs();

        assert.equal(Array.isArray(test.songs) === true, true);
        assert.equal(test.songs.length, 1);
    });

    it('#setLabelProbabilities()', () => {
        test.setLabelProbabilities();

        assert.equal(Array.isArray(test.labelProbabilities) === true, true);
        assert.equal(test.labelProbabilities.length, 0);
    });
    
    it('#setChordCountsInLabels()', () => {
        test.setChordCountsInLabels();
        let count = Object.keys(test.chordCountsInLabels.easy).length;


        assert.equal(Array.isArray(test.chordCountsInLabels) === false, true);
        assert.equal(isObject(test.chordCountsInLabels) === true, true);
        assert.equal(count == 7, true);
    });

    it('#setProbabilityOfChordsInLabels()', () => {
        test.setProbabilityOfChordsInLabels();
        let count = Object.keys(test.probabilityOfChordsInLabels.easy).length;

        assert.equal(isObject(test.probabilityOfChordsInLabels) === true, true);
        assert.equal(count, 7);
    });

    //#region node原生assert模組
    // it('#getPageUsers()', () => {
    //     console.log('尚未測試');
    //     const data = userService.getPageUsers(2, 10);
    //     assert.equal(data.users.length, 10);
    //     assert.equal(Array.isArray(data.users), true);
    //     const eData = userService.getPageUsers('2EE', '1d0');
    //     // assert.equal(eData.users.length, 10);
    //     // assert.equal(Array.isArray(eData.users), true);
    //     assert.equal(eData.code, 0, '如果傳入異常數值，則code為0');
    //     assert.equal(eData, {
    //         'code' : 0,
    //         'message' : 'page參數，數值異常' 
    //     }, '如果傳入異常數值，應該返回對象...');
    // });
    //#endregion

});