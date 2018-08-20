var amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        q  = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || 'hello world';
        console.log("process.argvprocess.argvprocess.argv",process.argv);
        ch.assertQueue(q, {durable : true});
        ch.prefetch(1);
        ch.sendToQueue(q, new Buffer(msg), {persistent : true});
        console.log("[x] message sent '%s'",msg);
    });
});