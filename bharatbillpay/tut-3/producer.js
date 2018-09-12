var amqp = require('amqplib/callback_api');


amqp.connect("amqp://localhost", function(err, conn) {
    conn.createChannel(function(err, ch) {
        var excahange = "logs1234";
        var msg = process.argv.slice(2).join(' ') || 'Default message';
        ch.assertExchange(excahange, 'fanout', {durable : false});
        ch.publish(excahange, '', new Buffer(msg));
        console.log("Sent Message ::", msg);
    });

    setTimeout(()=>{
        conn.close();
        process.exit(0);
    },100)
})
