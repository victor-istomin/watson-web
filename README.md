# watson-web

A nodejs web-interface to [[https://github.com/TailorDev/Watson/ Watson time tracker]

== Requirements: ==
 * [[https://github.com/TailorDev/Watson/ Watson]]. Ensure you're using version with JSON log support, for example master 
 * node & npm

== Installation ==

 * install watson
 * checkout watson-web
 * schedule watson-web server start, e.g. in tmux:

    tmux
    cd watson-web
    npm start

== Usage ==

Web-intrface will be available on port 3000. You could configure your gouter to forward connections from local network/ WAN to port 3000 on your server

