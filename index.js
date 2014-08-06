var fs = require('fs'),
    path = require('path'),
    Instrumenter = require('istanbul').Instrumenter,
    instrumenter = new Instrumenter({preserveComments: true}),
    cwd = process.cwd();

module.exports = function(borschik) {
    var base = borschik.getTech('js'),
        File = base.File.inherit({
            read: function() {
                var ip = this.tech.opts.techOptions.instrumentPaths;
                // Validate every include path if instrumentPaths option is specified
                if (ip) {
                    var instrument = false;
                    for(var p = 0; p < ip.length; p++) {
                        if (this.path.indexOf(ip[p]) === 0) {
                            instrument = true;
                            break;
                        }
                    }

                    // include path doesn't match any path from instrumentPaths
                    // -> don't instrument it and process as normal js.
                    if (!instrument) {
                        return this.__base();
                    }
                }
                var content = fs.readFileSync(this.processPath(this.path), 'utf8'),
                    instrumented = instrumenter.instrumentSync(content, path.relative(cwd, this.path));
                this.content = this.parse(instrumented);
            }
        }),
        Tech = base.Tech.inherit({
            File: File
        });

    return {
        File: File,
        Tech: Tech
    };
};
