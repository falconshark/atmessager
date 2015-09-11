ATMessager
===

An web API which can make sending messages by telegram bot be automatically and simply.

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
Before using ATMessager, you should copy and edit all of the configuration file in config: 

```bash
$ cp config.example.json config.json
$ cp bots.exmaple.json bots.json
$ cp receivers.example.json receivers.json
$ cp senders.example.json senders.json
```

You can found all of the config file in config folder.

config.json
-----------

config.json contain the setting of server and log file path. You can change the listen port of ATMessager and where to save log files.

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
bots.json contain all of the registed telegram bot name, token and users of each bot. ATMessager will use these bot name to find the token, and use username and password (In senders.json) to do authentication.

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

receivers.json contain all of the registed user name and chat id. ATMessager will use these receiver name to find their chat id.

Example:

```json
{
	"receivers": {
		"receiver_name": {
			"chat_id": "1234567"
		}
	}
}
```

senders.json
-----------

senders.json contain all of the user name and password. ATMessager will use these username(In bots.json) and password to do authentication.

Moreover, you can add the prefix into message too.

Example:

```json
{
	"senders": {
		"user_id": {
			"password1": "Sei0wao9",
			"password2": "Deeh8se6",
			"prefix": "Your own string"
		}
	}
}
```
Usage
-----------

Use this command to start ATMessager:

```bash
$ node app.js
``` 

If you want to let ATMessager get config file from customized path, use this command:

```bash
$ node app.js [path of config file] [path of bots config file] [path of senders config files] [path of receivers config files]
```
Examples:

```bash
node app.js /opt/atm/config.json /opt/atm/bots.json /opt/atm/senders.json /opt/atm/receivers.json
```

If you want to run it at the background, use forever:

```bash
$ sudo npm install forever -g
$ forever start app.js
```

After start the ATMessager, you can call the API to send message by telegram bot with post method.

Here is an example:

```bash
curl --data "receiver=sardo & message=hello & botname=atmessager
& sender=dollars0427 &password=hello123" http://192.168.1.1:3000/message
```

If success, It will return status code 201, and a JSON object like this:

```json
{ "receiver": "sardo",
  "botname": "atmessager",
  "message": "hello",
  "sendTime": "Mon Sep 07 2015 23:17:24 GMT+0800 (HKT)" }
```

Otherwise, It will return status code 401 or 403, and a error object like this:

```json
{ "error_code": 401, "description": "Error: Unauthorized" }
```

Unit Test
-----------

You can run the unit-test of this project by using nodeunit.

1.Switch to the test directory. It is in the root directory of project.

2.Install the dependencies:

```bash
npm install
```

3.Copy the configuration file and edit it:

```bash
$ cp testconfig.example.json testconfig.json
$ cp bots.exmaple.json bots.json
$ cp receivers.example.json receivers.json
$ cp senders.example.json senders.json
```

It is same as configuration part.

3.Run nodeunit to test each part:

```bash
$ nodeunit testcase.js
```

Issues
-----------
If there are any bug, please feel feel to open a issues.