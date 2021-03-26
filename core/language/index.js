const fs = require('fs');

var languages = {

    createFile: async function(language, symbol) {

        return new Promise(
            (resolve, reject) => {
               
                fs.copyFile('core/language/original.json', 'core/language/' + symbol + '.json', (err) => {
                    if (err) throw err;
                    console.log('source.txt was copied to destination.txt');
                    resolve(true);
                });
            }
        );
    },

    renameFile: async function(symbol1, symbol2) {

        return new Promise(
            (resolve, reject) => {
                fs.rename('core/language/' + symbol1 + '.json', 'core/language/' + symbol2 + '.json', function(err) {
                    console.log('File Renamed!');
                    fs.unlink('core/language/' + symbol1 + '.json', function(err) {
                        console.log('File deleted!');
                        resolve(true);
                    });
                });
            }
        );

    },

    addNewKey: async function(symbol, key, word) {

        let file = require('./' + symbol + '.json');
        file[key] = word;

        return new Promise(
            (resolve, reject) => {
                fs.writeFile('core/language/' + symbol + '.json', JSON.stringify(file), (err) => {
                    if (err) console.log('Error writing file:', err)
                    resolve(true);
                });
            }
        );

    },


    getFile: async function(symbol) {
        let jsonData = fs.readFileSync('core/language/' + symbol + '.json', 'utf-8');
        let obj = JSON.parse(jsonData);
        return obj;
    },



    deleteFile: async function(symbol) {
        try {
            fs.unlink('./' + symbol + '.json', function(err) {
                console.log('File deleted!');
            });
        } catch (err) {

        }
    },

    getResponse: async function(symbol, key) {
        try {
            symbol = !symbol ? "original" : symbol;

            let file = require('./' + symbol + '.json');

            return file[key];
        } catch (err) {

        }
    }

}

module.exports = languages;

