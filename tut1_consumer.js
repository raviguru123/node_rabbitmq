var     
    AMQP = require('amqplib/callback_api');




function tut1_consumer() {
    AMQP.connect("amqp://localhost", function(err, conn) {
      conn.createChannel(function(err, ch) {
            var q = "task_queue";
            ch.assertQueue(q, {durable : true});
            ch.consume(q, function(msg) {
                var secs = msg.content.toString().split('.').length - 1;
                console.log("[x] messsage received %s",msg.content.toString());
                setTimeout(()=>{
                    console.log("[x] done");
                    ch.ack(msg);
                },secs*1000);
            }, {noAck : false});
      })
    });
}

if(require.main == module) {
    var obj = tut1_consumer();
}

module.exports = tut1_consumer;