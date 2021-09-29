const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const port = process.env.port || 3000

app.get('/', (req, res)=>{
    var today = new Date();
    var time = today.getHours()
    res.send(time.toString())

});

app.post('/', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });

    function demo(agent){
        var today = new Date();
        var time = today.getHours()
        agent.add(time.toString())
        //agent.add("Sending response from Webhook server as v1.1.11.1");
    }
    function customPayloadDemo(agent){
        var payloadData = {
            "richContent": [
              [
                {
                  "type": "accordion",
                  "title": "Accordion title",
                  "subtitle": "Accordion subtitle",
                  "image": {
                    "src": {
                      "rawUrl": "https://example.com/images/logo.png"
                    }
                  },
                  "text": "Accordion text"
                }
              ]
            ]
          }

          agent.add( new dfff.Payload(agent.UNSPECIFIED, payloadData, {sendAsMessage: true, rawPayload: true }))
    }

    var intentMap = new Map();
    intentMap.set('webhookDemo',demo )
    intentMap.set('customPayloadDemo', customPayloadDemo)
    

    agent.handleRequest(intentMap);

});

app.listen(port, ()=>console.log("Server is live at port 3333"));
