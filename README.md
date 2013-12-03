borschik-tech-istanbul
======================

Tech module for [borschik](http://github.com/bem/borschik) that instruments js files on include
using [istanbul](https://github.com/gotwarlost/istanbul).

Usage
-----

First you should install `borschik` and this module into your project and save it into `package.json`

    npm install borschik borschik-tech-istanbul --save

Then you could run `borschik`

    node_modules/.bin/borschik --tech istanbul --input your.js --output your.min.js

License
-------

See [MIT](LICENSE) LICENSE.
