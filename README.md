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
WEB_PATH=/ npm run dev
```

**Generate a production build in `./build`:**

```
npm run build
```

> You can now deploy the contents of the `build` directory to production on github pages!
>
> Fork and `npm run deploy`


**Start local production server:**

```
npm start
```

## Router Installation

In order to install the softwarae in the node, the node must have the lime-webui-ng-luci package installed (can be found in the flavor lime_newui_test available through https://github.com/libremesh/lime-sdk).

To generate the image for a wdr-4310 for example, you do this:
```
./cooker -c ar71xx/generic --flavor=lime_newui_test --profile=tl-wdr4310-v1
```

For develop you can run npm run build and then copy the build folder to the /www directory of the node and go.
