const fs = require('fs');

nodeLog = {


    addLog: async function(mode,email,api,text) {

        var dateobj = new Date();
        var dateString = dateobj.toString();
        var logText = email + ' : ' +api+ ' : ' + text ;
        let key = Date.now();
        let file = require('./logs.json');
        file[mode][key] = logText;

        fs.writeFile('core/log/logs.json', JSON.stringify(file), (err) => {
            if (err) console.log('Error writing file:', err)
        });

    },

    deleteLog: async function(mode,key) {
        
        let file = require('./logs.json');
        delete file[mode][key];
        
        fs.writeFile('core/log/logs.json', JSON.stringify(file), (err) => {
            if (err) console.log('Error writing file:', err)
        });

        return file[mode];

    },

    deleteallLog: async function(mode) {
        
        let file = require('./logs.json');
        file[mode] = {};
        
        fs.writeFile('core/log/logs.json', JSON.stringify(file), (err) => {
            if (err) console.log('Error writing file:', err)
        });

        return file[mode];

    },

    getLog: async function(mode) {
        let jsonData = fs.readFileSync('core/log/logs.json', 'utf-8');
        let obj = JSON.parse(jsonData);
        return obj[mode];
    },

}

module.exports = nodeLog;