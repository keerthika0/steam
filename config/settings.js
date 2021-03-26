const env = process.env.NODE_ENV || 'development';

/*
	 Sets the environment variables by
	reading the contents of settings.json
	which has to be set according to the
	format given in settings.json.template
*/

if (env === 'development' || env === 'production') {

    let config = require('./settings.json');
    let envConfig = config[env];
    process.env.NODE_ENV = config.NODE_ENV;
    Object.keys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    });

}
