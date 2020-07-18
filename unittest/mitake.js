const fs = require('fs');
const { count } = require('console');

exports.songs = [];
exports.labels = [];
exports.allChords = [];
exports.labelCounts = [];
exports.labelProbabilities = [];
exports.chordCountsInLabels = {};
exports.probabilityOfChordsInLabels = {};

exports.train = (chords, label) => {

    this.songs.push([label, chords]);
    this.labels.push(label);

    //#region 將其函式化
    // for (var i = 0; i < chords.length; i++) {
    //     if (!allChords.includes(chords[i])) {
    //         allChords.push(chords[i]);
    //     }
    // }
    //#endregion
    this.allChords = this.pushChords(this.allChords);
    
    //#region 將其函式化
    // if (!!(Object.keys(labelCounts).includes(label))) {
    //     labelCounts[label] = labelCounts[label] + 1;
    // } else {
    //     labelCounts[label] = 1;
    // }
    //#endregion
    this.labelCounts = this.countLabel(label, this.labelCounts);
};

exports.pushChords = (chords, arr) => {
    for (var i = 0; i < chords.length; i++) {
        if (!arr.includes(chords[i])) {
            arr.push(chords[i]);
        }
    }
    return arr;
};

exports.countLabel = (label, arr) => {
    if ((Object.keys(arr).includes(label))) {
        arr[label] += 1;
    } else {
        arr[label] = 1;
    }
    return arr
};

exports.getNumberOfSongs = () => {
    return this.songs.length;
};

exports.setLabelProbabilities = () => {
    Object.keys(this.labelCounts).forEach(label => {
        var numberOfSongs = this.getNumberOfSongs();
        this.labelProbabilities[label] = this.labelCounts[label] / numberOfSongs;
    });
};

exports.setChordCountsInLabels = () => {
    this.songs.forEach(i => {
        if (this.chordCountsInLabels[i[0]] === undefined || this.chordCountsInLabels[i[0]] == null) {
            this.chordCountsInLabels[i[0]] = {};
        }

        i[1].forEach(j => {
            if (this.chordCountsInLabels[i[0]][j] > 0) {
                this.chordCountsInLabels[i[0]][j] += 1;
            } else {
                this.chordCountsInLabels[i[0]][j] = 1;
            }
        });
    });
}

exports.setProbabilityOfChordsInLabels = () => {
    this.probabilityOfChordsInLabels = this.chordCountsInLabels;
    Object.keys(this.probabilityOfChordsInLabels).forEach(i => {
        Object.keys(this.probabilityOfChordsInLabels[i]).forEach(j => {
            this.probabilityOfChordsInLabels[i][j] = this.probabilityOfChordsInLabels[i][j] * 1.0 / this.songs.length;
        });
    });
}

exports.classify = chords => {
    var ttal = this.labelProbabilities;

    console.log(ttal);

    var classified = {};

    Object.keys(ttal).forEach(obj => {
        var first = this.labelProbabilities[obj] + 1.01;

        chords.forEach(chord => {
            var probabilityOfChordInLabel = this.probabilityOfChordsInLabels[obj][chord];

            if (probabilityOfChordInLabel === undefined) {
                first + 1.01;
            } else {
                first = first * (probabilityOfChordInLabel + 1.01);
            }
        });

        classified[obj] = first;
    });

    console.log(classified);
};

this.classify(['d', 'g', 'e', 'dm']);
this.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);