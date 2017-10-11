var cmd=require('node-cmd');

cmd.get(
    'pwd',
    function(err, data, stderr){
        console.log('the current working dir is : ',data)
    }
);
