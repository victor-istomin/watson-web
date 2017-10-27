# watson-web

A nodejs web-interface to [Watson time tracker](https://github.com/TailorDev/Watson/)

## Requirements:

 * [Watson time tracker](https://github.com/TailorDev/Watson/). Ensure you're using version with JSON log support, for example actual master should work fine
 * node & npm

## Installation 

 * install watson
 * checkout watson-web
 * schedule watson-web server start, e.g. in tmux:
```shell
    tmux
    cd watson-web
    npm start
```

## Usage

Web-intrface will be available on port 3000. You could configure your gouter to forward connections from local network/ WAN to port 3000 on your server

