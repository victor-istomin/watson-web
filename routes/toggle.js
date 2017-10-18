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

const getStopPromise   = (stopOrCancel) => getAsync('watson ' + stopOrCancel);
const getStartPromise  = (job) => getAsync('watson start ' + job.replace(/[^\w\d-_,. ]/g, ""));

/* GET home page. */
var console = require('console');
var bodyParser = require('body-parser');

let jsonParser = bodyParser.json();


router.post('/', function(req, response) {
    console.log('Hello post');

    var action = null;
    if (req.body.type === 'start')
        action = getStartPromise(req.body.project);
    else if (req.body.type === 'stop' || req.body.type === 'cancel')
        action = getStopPromise(req.body.type);

    if (action)
    {
        action.then(function(result) { response.send('OK'); });
    }
    else
    {
        action.then(function(result) { response.send('Fail'); });
    }

})
.get( function(req,res){res.json({message: 'get request'});} );

module.exports = router;
