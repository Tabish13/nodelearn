/**
 * The routes class which handles all the routes and sends the response accordingly
 *
 * @module routes
 */

var utilities = require('../utils/util');
var users = require('../controllers/users');
var organization = require('../controllers/organization');

module.exports = function(app) {

    /*****************Organization API Listing - Start*******************************/

    /**
     * This endpoint handles creation of the new organization
     * 
     * Response will be - {test : test}
     * 
     * 
     * @module routes
     *
     * @submodule Creation of new organization 
     *
     * @param {Object} [req] request Object
     * @param {Object} [req.useremail] email id of the user
     * @param {Object} [req.password] password of the user
     * @param {Object} [req.botuuid] uuid of the bot 
     * @param {Object} [req.botname] name of the bot
     * @param {Object} [req.entaccount] enterprise account
     * @param {Object} [req.entpassword] enterprise password welcomemsg
     * @param {Object} [req.welcomemsg] welcome message for the bot
     * @param {Object} [req.locale] locale for the bot
     *
     * @param {Object} response
     */
    app.post('/org', function(req, res) {
        if (req.body) {
            utilities.logger.log('info', 'Organization creation');
            organization.create(req.body, function(err, result) {
                if (err) {
                    res.send(err);
                    utilities.logger.log('error', err);
                } else {
                    utilities.logger.log('info', 'Organization creation successful');
                    res.send(result);
                }
            });
        }
    });

    /**
     * This endpoint handles updation of the existing organization
     * 
     * @module routes
     * @submodule Updation of organization 
     * @param {Object} [req] request Object
     * @param {Object} [req.useremail] email id of the user
     * @param {Object} [req.password] password of the user
     * @param {Object} [req.botuuid] uuid of the bot 
     * @param {Object} [req.botname] name of the bot
     * @param {Object} [req.entaccount] enterprise account
     * @param {Object} [req.entpassword] enterprise password welcomemsg
     * @param {Object} [req.welcomemsg] welcome message for the bot
     * @param {Object} [req.locale] locale for the bot
     *
     * @param {Object} response
     */
    app.put('/org/:orgid', function(req, res) {
        var orgId = req.params.orgid;
        if (orgId && req.body) {
            utilities.logger.log('info', 'Organization updation');
            organization.update(utilities._.assignIn(req.body, req.params), function(err, result) {
                if (err) {
                    res.send(err);
                    utilities.logger.log('error', err);
                } else {
                    utilities.logger.log('info', 'Organization updation successful');
                    res.send(result);
                }
            });
        }
    });

    /**
     * This endpoint handles login of the user
     * 
     * @module routes
     * @submodule login
     * @param {Object} [req] request Object
     * @param {Object} [req.useremail] email id of the user
     * @param {Object} [req.password] password of the user
     *
     * @param {Object} response
     */
    app.post('/org/login', function(req, res) {
        if (req.body) {
            utilities.logger.log('info', 'login initialization');
            organization.doLogin(req.body, function(err, result) {
                if (err) {
                    res.send(err);
                    utilities.logger.log('error', err);
                } else {
                    utilities.logger.log('info', 'login successful');
                    res.send(result);
                }
            });
        } else {
            res.send('insufficient Parameters.');
        }
    });

    /**
     * This endpoint handles logout of the user
     * 
     * @module routes
     * @submodule log out
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.post('/org/logout', function(req, res) {
        if (req.headers && req.headers.authorization) {
            utilities.logger.log('info', 'logout initialization');
            organization.doLogout({ token: req.headers.authorization }, function(err, result) {
                if (err) {
                    utilities.logger.log('error', err);
                    res.send(err);
                } else{
                    utilities.logger.log('info', 'logout successful');
                    res.send(result);
                }
            });
        } else {
            res.send('insufficient Parameters.');
        }
    });

    /*****************Organization API Listing - End*******************************/

    /*****************Module API Listing - Start*******************************/

    /**
     * This endpoint handles creation of a new module
     * 
     * @module routes
     * @submodule creation of new module
     * @param {Object} [req] request Object
     * @param {Object} [req.name] name of the module
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/module', function(req, res) {

    });

    /**
     * This endpoint handles updation of a existing module
     * 
     * @module routes
     * @submodule updation of module
     * @param {Object} [req] request Object
     * @param {Object} [req.name] name of the module
     *
     * @param {Object} response
     */
    app.put('/org/:orgid/module/:moduleid', function(req, res) {

    });

    /**
     * This endpoint gets all the modules based on organization id
     * 
     * @module routes
     * @submodule get all modules for an organization
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/module', function(req, res) {

    });

    /**
     * This endpoint gets a specific module based on id
     * 
     * @module routes
     * @submodule get module by id
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/module/:moduleid', function(req, res) {

    });
    /*****************Module API Listing - End*******************************/

    /*****************Module Questions API Listing - Start*******************************/

    /**
     * This endpoint inserts a question at the given position and reorder questions. If position already exists, throws error.
     * 
     * @module routes
     * @submodule insert question by position
     * @param {Object} [req] request Object
     * @param {Object} [req.qtname] question to be inserted in to the module
     * @param {Object} [req.options] options
     * @param {Object} [req.profilefield] profile field of the question
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/module/:moduleid/list/:pos/insert', function(req, res) {

    });

    /**
     * This endpoint deletes question at the given position and reorder questions. If position already exists, throws error.
     * 
     * @module routes
     * @submodule delete question by position
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/module/:moduleid/list/:pos/delete', function(req, res) {

    });

    /**
     * This endpoint inserts a question at the end.
     * 
     * @module routes
     * @submodule insert question at the end
     * @param {Object} [req] request Object
     * @param {Object} [req.qtname] question to be inserted in to the module
     * @param {Object} [req.options] options
     * @param {Object} [req.profilefield] profile field of the question
     *
     * @param {Object} response
     */
    app.put('/org/:orgid/module/:moduleid/list', function(req, res) {

    });

    /**
     * This endpoint Gets the question at the given position. If position doesn't exists, throws error.
     * 
     * @module routes
     * @submodule get question by position
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/module/:moduleid/list/:pos', function(req, res) {

    });

    /**
     * This endpoint Gets the question based on its id. If id doesn't exists, throws error.
     * 
     * @module routes
     * @submodule get question by id
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/module/:moduleid/question/:id', function(req, res) {

    });

    /*****************Module Questions API Listing - End*******************************/

    /*****************Campaign and Destination API Listing - Start*******************************/

    /**
     * This endpoint creates a new campaign
     * 
     * @module routes
     * @submodule create a new campaign
     * @param {Object} [req] request Object
     * @param {Object} [req.name] name for the campaign 
     * @param {Object} [req.smstemplate] sms template for the campaign
     * @param {Object} [req.emailtemplate] email template for the campaign
     * @param {Object} [req.module] module for the ccampaign
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/campaign', function(req, res) {

    });

    /**
     * This endpoint updates of campaign
     * 
     * @module routes
     * @submodule updation of the campaign
     * @param {Object} [req] request Object
     * @param {Object} [req.name] name for the campaign 
     * @param {Object} [req.smstemplate] sms template for the campaign
     * @param {Object} [req.emailtemplate] email template for the campaign
     * @param {Object} [req.module] module for the ccampaign
     *
     * @param {Object} response
     */
    app.put('/org/:orgid/campaign/:campid', function(req, res) {

    });

    /**
     * This endpoint uploads file with destination list
     * 
     * @module routes
     * @submodule upload file with profile info
     * @param {Object} [req] request Object
     * @param {Object} [req.file] file to get data from 
     *
     * @param {Object} response
     */
    app.put('/org/:orgid/campaign/:campid/dest/upload', function(req, res) {

    });

    /**
     * This endpoint gets list of destination
     * 
     * @module routes
     * @submodule get list of destination
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/campaign/:campid/dest', function(req, res) {

    });

    /**
     * This endpoint adds a new destination to campaign
     * 
     * @module routes
     * @submodule Add new destination to campaign
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/campaign/:campid/dest', function(req, res) {

    });

    /**
     * This endpoint deletes destination
     * 
     * @module routes
     * @submodule delete a destination
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.delete('/org/:orgid/campaign/:campid/dest', function(req, res) {

    });

    /**
     * This endpoint runs the campaign i.e. send the email/sms etc
     * 
     * @module routes
     * @submodule run the campaign
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/campaign/:campid/run', function(req, res) {

    });

    /*****************Campaign and Destination API Listing - End*******************************/

    /*****************Profile API Listing - Start*******************************/

    /**
     * This endpoint gets list of profiles
     * 
     * @module routes
     * @submodule get list of profiles
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/profile', function(req, res) {

    });

    /**
     * This endpoint creates profiles
     * 
     * @module routes
     * @submodule create a new profile
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.post('/org/:orgid/profile', function(req, res) {

    });

    /**
     * This endpoint gets a specific profile based on profile id
     * 
     * @module routes
     * @submodule get profile by id
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/profile/:profileid', function(req, res) {

    });

    /**
     * This endpoint gets a profile based on channelprofile id
     * 
     * @module routes
     * @submodule get profile by channelid
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/profile/channel/:profileid', function(req, res) {

    });

    /**
     * This endpoint gets profile fields
     * 
     * @module routes
     * @submodule get profile fields
     * @param {Object} [req] request Object
     *
     * @param {Object} response
     */
    app.get('/org/:orgid/profile/fields', function(req, res) {

    });

    /*****************Profile API Listing - End*******************************/


    /*router.get('/', function(req, res) {
        res.send("Asasdasdsa");
    });

    router.get('/test', function(req, res) {res.send("Asasdasdsaasdsdasda");});

    router.get('/download', function(req, res) {
        var query = req.query;

        if (query.url && query.url.length) {

            request("http://api.openweathermap.org/data/2.5/weather?q=rome&APPID=29163d5ca39fac5285c05a3034cdae4a", function(error, response, body) {
                if(error){
                    console.log(error);
                    res.send("some error occured");
                    return;
                }
                res.send(body);
            })
            .pipe(request.put('http://localhost:3000/insert'));
        }
    });

    router.put('/insert', function(req,res){

    });*/

};
