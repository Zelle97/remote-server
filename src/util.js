const wol = require('wakeonlan')
const ping = require('ping');
let Client = require('ssh2').Client;

const hosts = require('../config/hosts.json');

module.exports = {
    getHosts: function (response) {
        let filteredHosts = filterHosts();
        response.json(filteredHosts);
    },

    getStatus: function (name, response) {
        let host = getHost(name);
        if (host !== undefined) {
            pingHost(host.ip, name, response);
        } else {
            response.json({'error': 'Host ' + name + ' not found!'});
            console.log('Host ' + name + ' not found!');
        }
    },

    wakeUp: function (name) {
        let host = getHost(name);
        if (host !== undefined) sendWoLPackage(host);
        console.log('Host ' + name + ' not found!');
    },

    shutDown: function (name) {
        let host = getHost(name);
        if (host !== undefined) executeShutdown(host);
        console.log('Host ' + name + ' not found!');
    }
};

function filterHosts() {
    let filtered = [];
    hosts.forEach(host => {
        filtered.push({"name": host.name, "online": host.online})
    });
    return filtered;

}

function getHost(name) {
    return hosts.find(host => name === host.name);
}

function pingHost(hostIp, name, response) {
    console.log('Ping to host ' + name);
    ping.sys.probe(hostIp, function (isAlive) {
        let status = isAlive ? 'Online' : 'Offline';
        response.json(buildStatusMessage(name, status))
    });
}

function buildStatusMessage(name, status) {
    return {
        'name': name,
        'status': status
    };
}

function sendWoLPackage(host) {
    console.log('Sending WoL package to host ' + host.name);
    wol(host.mac, {address: host.ip}).then(() => {
    })
}

function executeShutdown(host) {
    console.log('Executing shutdown for host ' + host.name);
    let conn = new Client();
    conn.on('ready', function () {
        conn.exec('sudo shutdown now', function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                console.log('Shutdown Host');
                conn.end();
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: host.ip,
        port: 22,
        username: host.username,
        password: host.password
    });
}















