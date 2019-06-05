# LiMeApp
[![Greenkeeper badge](https://badges.greenkeeper.io/libremesh/lime-app.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/libremesh/lime-app.svg?branch=develop)](https://travis-ci.org/libremesh/lime-app) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


**Simple, lightweight and scalable PWA for diagnosis of Libremesh nodes**


<p align="center"><br><br>
    <img src="https://raw.githubusercontent.com/libremesh/lime-app/fd31c213/screenshot.gif" alt="Screenshot" />
</p>


## Development Environment Installation

**Clone this repo:**

```
git clone https://github.com/libremesh/lime-app.git limeapp
cd limeapp
```

**Install the dependencies:**

```
npm install
```


## Development Workflow
Read the ["How to contribute and code of conduct"](CONTRIBUTING.md) documentation

**Start a live-reload development server:**

```
WEB_PATH="/" npm run dev
```

**Generate a production build in `./build`:**

```
WEB_PATH="/" npm run build --production
```

> You can now deploy the contents of the `build` directory to production on github pages!
>
> Fork and `npm run deploy`


## Router Installation

In order to install the software in the node, the node must have several ubus packages installed ( see https://github.com/libremesh/lime-packages).

For develop you can run `WEB_PATH='/app' npm run build --production` and then copy the build folder to the /www/app directory of the node and go.
