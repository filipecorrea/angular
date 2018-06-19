# Web

Web starter application based on Node.js and Angular.

## Prerequisites

- [Node.js]
- [Bower]
- [Grunt]

## Setup

Install [npm] packages. At root directory, run:

`$ npm install`

Install [Bower] packages. At client directory, run:

`$ bower install`

## Run

If you want to use DB2, at root directory, run:

`$ export DYLD_LIBRARY_PATH=./node_modules/ibm_db/installer/clidriver/lib/icc:$IBM_DB_HOME/lib/icc`

At root directory, run:

`$ grunt`

[Node.js]: <http://nodejs.org>
[Bower]: <http://bower.io>
[Grunt]: <http://gruntjs.com>
[npm]: <https://www.npmjs.com>
