/**
 * Summmary
 *
 * Takes a full file list and returns a object of summary data.
 */
module.exports = function bval (fileList) {
    var summary = {
        sessions: [],
        subjects: [],
        runs:     [],
        tasks:    [],
        suffixes: []
    };

    for (var key in fileList) {
        var file = fileList[key];
        var path = file.relativePath;

        var checks = {
            'ses':  'sessions',
            'sub':  'subjects',
            'run':  'runs',
            'task': 'tasks'
        };

        for (var key in checks) {
            // var check = checks[i];
            if (path.indexOf(key + '-') > -1) {
                var task = path.slice(path.indexOf(key + '-'));
                    task = task.slice(0, task.indexOf('/'));
                    if (task.indexOf('_') > -1) {task = task.slice(0, task.indexOf('_'));}
                    task = task.slice(key.length + 1);
                if (summary[checks[key]].indexOf(task) === -1) {summary[checks[key]].push(task);}
            }
        }

        if (path.endsWith('.nii') || path.endsWith('.nii.gz')) {
            var pathParts = path.split('_');
            var suffix    = pathParts[pathParts.length -1];
                suffix    = suffix.slice(0, suffix.indexOf('.'));
            if (summary.suffixes.indexOf(suffix) === -1) {summary.suffixes.push(suffix);}
        }

    }

    console.log(summary);
};
