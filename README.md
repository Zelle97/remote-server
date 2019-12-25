# Remote-server

This is the server backend for the home-remote-app.
Its a simple express server that uses some tools to influence and check on hosts in the network.

## Util

This application has 3 different utilities. It can 
 - check if a host is online
 - start a host with a WoL package
 - shutdown a host via remote execution
 - provide a list of all configured hosts
 
## Disclaimer

This application is for use in your secure home network only!
To start a host you will need specific data (mac and ip).
To shutdown a host you will need a user with sudo access rights. Furthermore you need to store the username and the password in plain text in the hosts.json.
If you use it only in your private network everything is fine but remember it if you want to extend it to be accessible from outside!

## Prequesites

Make sure the motherboard of the host you want to start with a WoL package supports it and the setting is enabled in the BIOS.
To shutdown a host with remote execution the user needs to have sudo permissions and the password prompt for sudo commands has to be disabled.

### Stand-Alone

If you want to use the remote-server backend without the home-remote-compose file you can do this in two ways.

 1) Run the Docker Container without the compose from home-remote-app
 2) Clone this repo and execute 'npm i' and 'npm start'
 
Either way you need to configure the hosts.json file. in the config folder there is a sample which you can extend for your usage.
Remember that if you use Docker you should mount the config directory as a volume.

### Docker and Architectures

This application was mainly developed to be used to start and shutdown other computers from a smaller device ( like a raspberry ).
The Docker images for this app are automaticly build from DockerHub.
But if you want to use this app on a raspberry you have to build the image yourself 
because DockerHub doesen't support the automated building of multiple architectures ( at this moment ).

To do so clone this repo and execute 'docker build . -t zellesdocker/remote-dashboard'.
This will build the image with the architecture of the system you are executing the command on.

##### Author & Licence

If you have any questions or improvement Ideas feel free to open an Issue or a feature request.

**Projects** © [Zelle97](https://github.com/Zelle97), All Projects are released under the MIT License.

> Authored and maintained by Zelle97 · GitHub [@Zelle97](https://github.com/Zelle97)
