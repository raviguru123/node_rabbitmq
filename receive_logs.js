var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'logs';
        ch.assertExchange(ex, 'fanout', {durable : false});
        ch.assertQueue('', {exclusive : true}, function(err, q) {
            console.log(" Waiting for message is %s. To exit press CTRLS+C", q.queue);
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, function(msg) {
                console.log("[x] Message Received %s",msg.content.toString());
            }, {noAck : true});
        });
    });
});