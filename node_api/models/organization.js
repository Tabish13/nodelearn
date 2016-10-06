var connection = require('../dbhandler/databaseConnector');

function organizations() {

    this.get = function(cb) {
        connection.acquire(function(err, con) {
            con.query('select * from Organization', function(err, result) {
                con.release();
                cb(err, result);
            });
        });
    };

    this.create = function(organizationModel, cb) {
        connection.acquire(function(err, con) {
            con.query('insert into Organization set ?', organizationModel, function(err, result) {
                con.release();
                if (!err) {
                    cb(err, { status: 'success' });
                } else {
                    cb(err, { status: 'failed' });
                }
            });
        });
    };

    //todo
    this.update = function(organizationModel, cb) {
        connection.acquire(function(err, con) {
            con.query('update Organization set ?', organizationModel, function(err, result) {
                con.release();
                if (!err) {
                    cb(err, { status: 'success' });
                } else {
                    cb(err, { status: 'failed' });
                }
            });
        });
    };

    this.doLogin = function(organizationModel, cb) {
        connection.acquire(function(err, con) {
            con.query('select * from Organization where useremail = ? and password = ?', [organizationModel.useremail, organizationModel.password],
                function(err, result) {
                    con.release();
                    if (!err) {
                        cb(err, result);
                    } else {
                        cb(err, { status: 'failed' });
                    }
                });
        });
    }

}

module.exports = new organizations();
