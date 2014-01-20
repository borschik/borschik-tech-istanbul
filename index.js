var fs = require('fs'),
    path = require('path'),
    Instrumenter = require('istanbul').Instrumenter,
    instrumenter = new Instrumenter({preserveComments: true}),
    cwd = process.cwd();

module.exports = function(borschik) {
    var base = borschik.getTech('js'),
        File = base.File.inherit({
            read: function() {
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
