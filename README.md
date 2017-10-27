# watson-web

A nodejs web-interface to [Watson time tracker](https://github.com/TailorDev/Watson/)

## Requirements:

 * [Watson time tracker](https://github.com/TailorDev/Watson/). Ensure you're using version with JSON log support, for example actual master should work fine. Version from this project subomdules should work fine too.
 * node & npm

## Installation 

 * install watson
 * install watson-web
 ```shell
git clone git@github.com:victor-istomin/watson-web.git
cd watson-web
npm install

# check if it works:
npm start
```

 * schedule or perform manually watson-web server start, e.g. in tmux:
```shell
tmux
cd watson-web
npm start
```

## Usage

Web-intrface will be available on port 3000. You could configure your gouter to forward connections from local network/ WAN to port 3000 on your server

## TODOs:

* listening address and port configuration
* authorization
