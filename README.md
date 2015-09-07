ATMessager
===

An API which can make sending messages by telegram bot be automatically and simply.

Installation
-----------
Note: This requires Node.js v0.10 to run. If you had not install it , you can download it at http://nodejs.org/download/ . 

1.Download the ATMessager source or clone the git repository.


2.Switch to the project root directory:

```bash
$ cd atmessager
```
3.Install the dependencies: 

```bash
$ npm install
```

Configuration
-----------
Firstly, copy all of the configuration file in config: 

```bash
$ cp config.example.json config.json
$ cp bots.exmaple.json bots.json
$ cp receivers.example.json receivers.json
$ cp senders.example.json senders.json
```

You can found all of the config file in config folder.

config.json
-----------

config.json contain the setting of server and log file path.

Example:

```json
{
	"server": {
		"port": "3000"
	},
	"access_log":{
		"path": "/var/log/atm/atm.access_log"
	},
	"app_log":{
		"path": "/var/log/atm/atm.app_log"
	}
}
```

bots.json
-----------
bots.json contain all of the registed telegram bot name, token and users of each bot.

Example:

```json
{
	"bots": {
		"botname": {
			"token": "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
			"users": ["user1", "user2"]
		}
	}
}
```
receivers.json
-----------

receivers.json contain all of the registed user name and chat id.

Example:

```json
{
	"receiver": {
		"receiver_name": {
			"chat_id": "1234567"
		}
	}
}
```

senders.json
-----------

senders.json contain all of the user name and password.

Example:

```json
{
	"senders": {
		"user_id": {
			"password1": "Sei0wao9",
			"password2": "Deeh8se6"
		}
	}
}
```