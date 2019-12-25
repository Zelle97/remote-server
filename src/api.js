let util = require('./util.js');

module.exports = function (expressApp) {
    expressApp.get('/hosts', (req, res) => {
        util.getHosts(res);
    });

    expressApp.get('/status/:name', (req, res) => {
        let name = req.params.name;
        util.getStatus(name, res);
    });

    expressApp.post('/wake/:name', (req) => {
        let name = req.params.name;
        util.wakeUp(name);
    });

    expressApp.post('/shutdown/:name', (req) => {
        let name = req.params.name;
        util.shutDown(name);
    });
};

