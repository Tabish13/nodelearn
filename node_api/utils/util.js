var config = require('config.json')('./config.json');
var winston = require('winston');
var _ = require('lodash');

function utils() {
    this.logger = null;
    this._ = _;
    this.invalidTokens = {};

    this.init = function() {
        //creating the logger file
        var logger;
        var transports = [];
        transports = [
            new(winston.transports.File)({
                name: 'info-file',
                filename: './logs/filelog-info.log',
                colorize: true,
                level: 'info'
            }),
            new(winston.transports.File)({
                name: 'error-file',
                filename: './logs/filelog-error.log',
                colorize: true,
                level: 'error'
            })
        ]
        if (config && config.Environment) {
            if (config.Environment == "development")
                transports.push(new(winston.transports.Console)({ level: 'error' })); //setting to show only error level messages
        }

        //log using the syntax - logger.log(<log_type>, "log message");
        this.logger = new winston.Logger({
            transports: transports
        });

        console.log("initialized logger...");

        var that = this;
        setInterval(function() {
            that.clearInvalidTokens();
        }, 1 * 60 * 60 * 1000);

    }

    this.GetEpochTime = function() {
        return Math.round(new Date().getTime() / 1000);
    }

    this.clearInvalidTokens = function() {
        var toBeRemovedTokens = [];
        var that = this;
        this._.forEach(this.invalidTokens, function(value, key) {
            var currentTime = that.GetEpochTime();
            if (value < currentTime) {
                toBeRemovedTokens.push(key);
            }
        });
        this.invalidTokens = this._.omit(this.invalidTokens, toBeRemovedTokens);
    }

}

module.exports = new utils();
