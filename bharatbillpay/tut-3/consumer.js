var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var exchange = "logs1234";
        ch.assertExchange(exchange, 'fanout', {durable : false});
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log("Waiting for message to receive::::");
           // ch.bindQueue(q.queue, exchange, '');
            ch.bindQueue(q.queue, exchange, '');
            // ch.consume(q.queue, function(err, msg) {
            //     console.log(msg.content.toString());
            // },  {"noAck" : true});
            
            ch.consume(q.queue, function(msg) {
                console.log(" [x] %s", msg.content.toString());
              }, {noAck: true});
        });
    });
});