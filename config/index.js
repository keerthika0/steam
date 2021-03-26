const fs = require('fs');

var env = {

    update: async function(mode,key, word) {


        let file = require('./settings.json');
        file[mode][key] = word;

        console.log(file[mode]);
        console.log(file[mode][key]);

        return new Promise(
            (resolve, reject) => {
                fs.writeFile('config/settings.json', JSON.stringify(file), (err) => {
                    if (err) console.log('Error writing file:', err)
                    resolve(true);
                });
            }
        );
    },

    getFile: async function(mode) {
        let jsonData = fs.readFileSync('config/settings.json', 'utf-8');
        let obj = JSON.parse(jsonData);
        return obj[mode];
    },

    changeMode: async function(mode) {
        let file = require('./settings.json');
        file.NODE_ENV = mode;
        return new Promise(
            (resolve, reject) => {
                fs.writeFile('config/settings.json', JSON.stringify(file), (err) => {
                    if (err) console.log('Error writing file:', err)
                    resolve(true);
                });
            }
        );
    },
}

module.exports = env;