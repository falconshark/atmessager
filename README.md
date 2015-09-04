ATMessager
===

An API which can make sending messages by telegram bot be automatically and simply.

Installation
-----------
Note: This requires Node.js v0.10 to run. If you had not install it , you can download it at http://nodejs.org/download/ . 

1.Download the ATMessager source or clone the git repository.


2.Switch to the project root directory:

```bash
$ cd sqlwathcer
```
3.Install the dependencies: 

```bash
$ npm install
```

Configuration
-----------
1.Copy the configuration file: 

```bash
$ cp config.example.json config.json
$ cp bots.exmaple.json bots.json
$ cp receivers.example.json receivers.json
$ cp senders.example.json senders.json
```

You can found all of the config file in config folder.

2.If you want to change the port number of ATMessger,
you can change it in config.json:

```json
{
	"server": {
		"port": "3000"
	}
}

```

3.You should input the name,token and username of your telegram bot to bots.json. These users wll be used for authorization.

```json
{
	"botname": {
		"token": "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
		"users": ["user1", "user2"]
	}
}
```

4.You should input the receiver name and chat id to receivers.json.

```json
{
  "receiver":{
    "chat_id":"1234567"
  }
} 
```