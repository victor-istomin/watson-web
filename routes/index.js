/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');

function getAsync(commandLine)
{
    return new Promise(function (resolve, reject) {
        cmd.get(commandLine, (err, result, stderr) => { return err ? reject(err) : resolve(result); });
    });
}

const getLogPromise = () => getAsync('watson log');
const getStatPromise = () => getAsync('watson status');
const getReportPromise = () => getAsync('watson report -c');

/* GET home page. */
router.get('/', function(req, response, next) {
    Promise.all([getLogPromise(), getStatPromise(), getReportPromise()]).then(function(result) {
        response.render('index', {
            title:       'Watson web',
            watsonLog:    result[0],
            watsonStat:   result[1],
            watsonReport: result[2]
        });
    });
});

module.exports = router;
