# LiMeApp

[![Greenkeeper badge](https://badges.greenkeeper.io/libremesh/lime-app.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/libremesh/lime-app.svg?branch=develop)](https://travis-ci.org/libremesh/lime-app) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Geek-free Web App for setup and mantainance of Libremesh nodes built on Preact

<p align="center"><br><br>
    <img height="480" src="docs/assets/screenshots.gif" alt="Screenshots" />
</p>

## Development Environment Installation

**Clone this repo:**

```bash
git clone https://github.com/libremesh/lime-app.git limeapp
cd limeapp
```

**Install the dependencies:**

```bash
npm install

# Or with docker
docker-compose run --rm ui npm i
```

## Development Workflow

### Start a live-reload development server

The LiMeApp is a frontend application for services running on a LibreMesh router.
By running:

```bash
npm run dev

# Or with docker
docker-compose up
```

we can serve the LiMeApp with hot reloading and it will proxy every backend request to http://10.13.0.1, the default ip address for LibreMesh routers.

If you already have a LibreMesh router reachable at any given IP address, let's say 10.5.0.9, you can use it as a backend with:

```bash
env NODE_HOST=10.5.0.9 npm run dev
```

If you want, you can also setup a virtual LibreMesh node following [lime-packages: TESTING.md](https://github.com/libremesh/lime-packages/blob/master/TESTING.md#development-with-qemu-virtual-machine), which will be available at http://10.13.0.1 by default.

### Generate a production build

```bash
npm run build:production
```

Now you can copy the bundles to the router:

```bash
ssh root@10.13.0.1 "rm -rf /www/app/*" && scp -r ./build/* root@10.13.0.1:/www/app
```

### Run tests

```bash
npm run tests
```

### Contribute

Plase, read the ["How to contribute and code of conduct"](CONTRIBUTING.md) documentation.
We also have a [Tutorial](docs/Tutorial.md) for newcomers :)
