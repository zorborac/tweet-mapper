# Tweet Mapping Challenge

## Description

This app displays tweets on a world map in real time. 

It also allows filtering of the tweets in real time based on the keyword typed into the filter box in the top right corner. 

It combines the Mapbox API with Twitter's API to do this.

## Demo

You can play with the demo here: http://tommichaelweber.com/tweet-mapper/

## Installation

### Development Environment

For fast uniform development environment creation, use https://vagrantcloud.com/cbumgard/nodejs. This provides all necessary build tools.

Otherwise ... 

### Prerequisites

Git - probably already installed as you are viewing this from github, but can be found at http://git-scm.com/.

You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.

### Clone Repo

```bash
git clone https://github.com/zorborac/tweet-mapper.git
cd tweet-mapper
```

### Server

Go into the api directory and install the nodejs dependencies with npm:
```bash
cd api
npm install
```

Create a Twitter application on https://dev.twitter.com. Then, generate your own access token for this app. You should now have
* API key
* API secret
* Access token
* Access token secret

Replace those values in `config/twitter.js`:
```javascript
var T = new Twit({
    consumer_key:         'API key',
    consumer_secret:      'API secret',
    access_token:         'Access token',
    access_token_secret:  'Access token secret'
})
```

If you run the nodejs application `node app.js`, you should get:
```bash
   info  - socket.io started
 node socket.io tweet app started on port 5000
 Listening to tweets from the Whole World
```

## Usage

### Server

You have to start the nodejs server first: `node app.js`

from the /api directory.

### Client
  
Navigate your terminal window to the /tweet-mapper directory, and run

```
npm start
```

This will install the dependencies and then launch a simple HTTP server.

You should now be able to open your web browser to http://localhost:8000/app/index.html

And begin having fun!

If port 8000 is already in use by your system this will fail.

Look at line 11 of package.json
if a different port is necessary. 

The client side files can realistically be served by whatever http server you prefer.
If that's the case run

```
npm install
```

rather than npm start from the root folder.


### Troubleshooting

The node.js app defaults to port 5000. If this is in use on your system it will fail to launch. 

Change the default server port by changing the values on 

line 4 of /api/app.js

line 11 of /app/js/services.js

and 

line 50 of /app/index.html


## Stack

* AngularJS
* Node.js
* Socket.io

## Thanks to the following projects

Much of the server architecture is owed to

https://github.com/kdelemme/live-tweet-io

These are some sweet angular directives for the Mapbox API

https://github.com/licyeus/angular-mapbox

And the base structure came from angular-seed

https://github.com/angular/angular-seed

## Licence
The MIT License (MIT)

Copyright (c) 2014 Tom Weber (tom@tommichaelweber.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
