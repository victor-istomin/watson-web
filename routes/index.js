/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');
var countdown = require('countdown');

function getAsync(commandLine, converter)
{
    converter = converter ? converter : (s) => s;
    return new Promise(function (resolve, reject) {
        cmd.get(commandLine, (err, result, stderr) => { return err ? reject(err) : resolve(converter(result)); });
    });
}

function ConvertJsonToLog(jsonString)
{
    let rawArray = JSON.parse(jsonString);
    const durationUnits = countdown.DAYS | countdown.HOURS | countdown.MINUTES;

    results = rawArray.map( item => {
        let start = new Date(item.start), stop = new Date(item.stop);
        const activeMs = 300;       // consider stop == now if fidderence is less that 'activeMS'
        const recentMs = 60 * 1000; // consider item as just started during this interval
        let i = {
            date:      start.toLocaleDateString(),
            startTime: start.toISOString(),
            stopTime:  stop.toISOString(),
            start:     start,
            stop:      stop,
            duration:  countdown(start, stop, durationUnits).toString(),
            project:   item.project,
            tags:      item.tags.join('; '),
            isActive:      ((Date.now() - stop) < activeMs),
            isJustStarted: ((Date.now() - start) < recentMs)
        };

        return i;
    });

    let byDate = {};
    for (let item of results)
    {
        let dateString = item.date;
        byDate[dateString] = byDate[dateString] || [];
        byDate[dateString].push(item);
    }

    // items bay not came in chronological order
    let sorderDates = [];
    let duration = (item) => (item.stop ? (item.stop - item.start) : 0);

    for (let dateString in byDate)
    {
        if (typeof(byDate[dateString]) !== typeof([]) || byDate[dateString].length === 0)
            continue;

        let itemsUnsorted = byDate[dateString];
        let durationTotal = itemsUnsorted.reduce( (acc, current) => (acc + duration(current)), 0);

        let projects = {};
        for (let record of itemsUnsorted)
        {
            let durationMs = record.stop - record.start;
            if (durationMs < 60 * 1000)
                continue;   // filter out accidental switches

            if (!projects[record.project])
            {
                projects[record.project] = { duration: durationMs, occurrences: 1 };
            }
            else
            {
                projects[record.project].duration += durationMs;
                projects[record.project].occurrences += 1;
            }
        }

        let totalsSorted = [];
        for (let projectName in projects)
        {
            let totalString = countdown(0, projects[projectName].duration, durationUnits).toString();
            let average = projects[projectName].duration / projects[projectName].occurrences;
            let averageString = countdown(0, average, durationUnits).toString();

            totalsSorted.push({
                project: projectName,
                total: projects[projectName].duration,
                averageString: averageString,
                totalString: totalString });
        }
        totalsSorted.sort( (a,b) => (a.total < b.total) );

        let dateSummary = {
            date:      dateString,
            totalTime: countdown(0, durationTotal, durationUnits).toString(),
            items:     itemsUnsorted,
            projects:  totalsSorted,
        };

        dateSummary.items.sort( (a,b) => (a.start > b.start) );

        sorderDates.push(dateSummary);
    }

    sorderDates.sort( (a,b) => (a.items[0].start < b.items[0].start) );
    return sorderDates;
}


const getLogPromise = () => getAsync('watson log --current --json', ConvertJsonToLog);


/* GET page. */
router.get('/', function(req, response, next) {
    Promise.all([getLogPromise(), /*getReportPromise()*/]).then(function(result) {
        response.render('index', {
            title:       'Watson web',
            watsonLog:    result[0],
        });
    });
});

module.exports = router;
