/*jshint esversion: 6 */

let twoDigits = x => (x < 10 ? '0' : '') + x;

function Iso8601ToTimespan(startString, stopString, out)
{
    let startTime = (startString && startString.length > 0) ? new Date(startString) : null;
    let stopTime  = (stopString && stopString.length > 0)   ? new Date(stopString)  : null;

    let formattedStart = startTime ? (twoDigits(startTime.getHours()) + ':' + twoDigits(startTime.getMinutes())) : '';
    let formattedStop  = stopTime ? (twoDigits(stopTime.getHours()) + ':' + twoDigits(stopTime.getMinutes())) : 'now';
    let result         = formattedStart + ' - ' + formattedStop;

    if (out)
        out.write(result);

    return result;
}
