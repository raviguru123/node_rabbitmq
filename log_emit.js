var amqp = require('amqplib/callback_api');
amqp.connect("amqp://localhost", function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'direct_logs';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'default message';
        var severity = (args.length > 0) ? args[0] : 'info';
        ch.assertExchange(ex, 'direct', {durable : false});
        ch.publish(ex, severity, new Buffer(msg));
        console.log(" [x] sent %s",severity, msg);
        setTimeout(()=>{
            conn.close();
            process.exit(0);
        },50);
    });
})