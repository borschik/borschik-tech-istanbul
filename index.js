var path = require('path'),
    Instrumenter = require('istanbul').Instrumenter,
    instrumenter = new Instrumenter(),
    cwd = process.cwd();

module.exports = function(borschik) {
    var base = borschik.getTech('js'),
        File = base.File.inherit({
            processInclude: function(baseFile) {
                return instrumenter.instrumentSync(this.__base(baseFile), path.relative(cwd, this.path));
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
