const express = require('express');
const wol = require('wakeonlan')
const ping = require('ping');
var Client = require('ssh2').Client;

const hosts = require('./hosts.json')

//create express app
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/status/:name', (req, res) => {
    let name = req.params.name

    for (let i = 0; i < hosts.length; i++) {
        if (hosts[i].name == name) {
            console.log('Sent ping to ' + hosts[i].name + ' with the ip ' + hosts[i].ip)
            ping.sys.probe(hosts[i].ip, function (isAlive) {
                var status = isAlive ? 'Online' : 'Offline';
                let msg = {
                    'name': name,
                    'status': status
                };
                console.log(msg);
                res.json(msg)
            });
        } else {
            console.log('Host ' + req.params.name + ' not found')
        }
    }
})

app.post('/wake/:name', (req, res) => {
    let name = req.params.name

    for (let i = 0; i < hosts.length; i++) {
        if (hosts[i].name == name) {
            console.log('Sending WOL package to ' + hosts[i].name + ' with the ip ' + hosts[i].ip)
            wol(hosts[i].mac, {address: hosts[i].ip}).then(() => {
                console.log('WOL package sent')
            })
        } else {
            console.log('Host ' + req.params.name + ' not found')
        }
    }
})

app.post('/shutdown/:name', (req, res) => {
    let name = req.params.name
    for (let i = 0; i < hosts.length; i++) {
        if (hosts[i].name == name) {
            var conn = new Client();
            conn.on('ready', function () {
                console.log('Client :: ready');
                conn.exec('sudo shutdown now', function(err, stream) {
                    if (err) throw err;
                    stream.on('close', function(code, signal) {
                        console.log('Shutdown Host');
                        conn.end();
                    }).on('data', function(data) {
                        console.log('STDOUT: ' + data);
                    }).stderr.on('data', function(data) {
                        console.log('STDERR: ' + data);
                    });
                });
            }).connect({
                host: hosts[i].ip,
                port: 22,
                username: hosts[i].username,
                password: hosts[i].password
            });
        } else {
            console.log('Host ' + req.params.name + ' not found')
        }
    }
});

app.listen(8888);

console.log('server is running on port 8080');
