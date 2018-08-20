var 
    AMQP =   require('amqplib/callback_api');
   
   
function tut1_producer(opts) {

    AMQP.connect('amqp://localhost', function(err, conn) {

        conn.createChannel(function(err, ch) {
            //var q = "q_gw_bharatbillpay";
            var q = 'test_gateway';
            ch.assertQueue(q, {durable : false});
            ch.sendToQueue(q, new Buffer("Hello world"));
            console.log("send hello world");
        });


        setTimeout(()=> {
            conn.close();
            process.exit(0);
        },500)

    });

}


tut1_producer.prototype.receive_ack = function() {

}

tut1_producer.prototype.sendmessage = function() {

}


module.exports = tut1_producer;