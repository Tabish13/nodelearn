var organizationModel = require('../models/organization');
var utilities = require('../utils/util');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('config.json')('./config.json');

function organizations() {
    this.invalidTokens = {};
    this.create = function(opts, cb) {
        opts = opts || {};
        var orgModel = this._getOrganizationModel(utilities._.assignIn(opts, { createPasswordHash: true }));
        if (orgModel.useremail && orgModel.password && orgModel.botuuid && orgModel.botname && orgModel.entaccount && orgModel.entpassword && orgModel.welcomemsg && orgModel.locale) {
            var currentEpochTime = utilities.GetEpochTime();
            orgModel.created = currentEpochTime;
            orgModel.updated = currentEpochTime;
            organizationModel.create(orgModel, cb);
        } else {
            cb("Insufficient parameter", { status: 'failed' });
        }
    }

    this.update = function(opts, cb) {
        opts = opts || {};
        var orgModel = this._getOrganizationModel(opts);
        if (!utilities._.isEmpty(orgModel)) {
            var currentEpochTime = utilities.GetEpochTime();
            orgModel.updated = currentEpochTime;
            organizationModel.update(orgModel, cb);
        } else {
            cb("Insufficient parameter", { status: 'failed' });
        }
    }

    this.doLogin = function(opts, cb) {
        opts = opts || {};
        var orgModel = this._getOrganizationModel(utilities._.assignIn(opts, { createPasswordHash: true }));
        var that = this;
        if (!utilities._.isEmpty(orgModel)) {
            organizationModel.doLogin(orgModel, function(err, res) {
                if (err) {
                    cb(err, res);
                } else {
                    if (res && res.length && utilities._.isArray(res)) {
                        var model = res[0];
                        var userModel = { useremail: model.useremail, password: model.password };
                        var token = that._generateToken(userModel);
                        cb(null, utilities._.assignIn(userModel, { token: token }));
                    }
                }
            });
        } else {
            cb("Insufficient parameter", { status: 'failed' });
        }
    }

    this.doLogout = function(opts, cb) {
        opts = opts || {};
        if (!utilities._.isEmpty(opts) && opts.token) {
            var payload = this._verifyToken(opts.token);
            if (payload) {
            	if(!utilities.invalidTokens[opts.token]){
	                utilities.invalidTokens[opts.token] = payload.exp;
	                this._expireToken({ useremail: payload.useremail, password: payload.password });
	                cb(null, { status: 'success' });
	            }
	            else
	            {
	            	cb("invalid token", { status: 'failed' });	
	            }
            } else {
                cb("invalid token", { status: 'failed' });
            }
        } else {
            cb("Logout unsuccessfull", { status: 'failed' });
        }
    }

    this._getEncryptedString = function(str) {
        if (str && str.length)
            return crypto.createHash('sha256').update(str).digest("hex");
        return null;
    }

    this._getOrganizationModel = function(options) {
        var model = {};
        if (typeof options !== 'object')
            return model;

        if (options.useremail)
            model.useremail = options.useremail;

        if (options.createPasswordHash && options.password) {
            var encryptedPassword = options.password ? this._getEncryptedString(options.password) : null;
            model.password = encryptedPassword;
        }

        if (options.botuuid)
            model.botuuid = options.botuuid;

        if (options.botname)
            model.botname = options.botname;

        if (options.entaccount)
            model.entaccount = options.entaccount;

        if (options.entpassword)
            model.entpassword = options.entpassword;

        if (options.welcomemsg)
            model.welcomemsg = options.welcomemsg;

        if (options.locale)
            model.locale = options.locale;

        return model;
    }

    this._generateToken = function(userModel) {
        var token = jwt.sign(userModel,
            config.secretkey, { expiresIn: '2h' }); //algorithm: 'RS256',
        return token;
    }

    this._verifyToken = function(token) {
        try {
            var decoded = jwt.verify(token, config.secretkey);
            console.log("verification successfull");
            return decoded;
        } catch (err) {
            console.log("verification unsuccessfull");
            return null;
        }
    }

    this._expireToken = function(userModel) {
        //setting expiresIn as 0 as jwt does not have expire method for the token, so creating a new token which expires immediately
        jwt.sign(userModel,
            config.secretkey, { expiresIn: 0 });
    }

}

module.exports = new organizations();
