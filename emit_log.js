var amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'hello world!';
        ch.assertExchange(ex, 'fanout', {durable : false});
        ch.publish(ex, '', new Buffer(msg));
        console.log("[x] sent %s", msg);
    });

    setTimeout(function() {
        conn.close();
        process.exit(0);
    },500);
});