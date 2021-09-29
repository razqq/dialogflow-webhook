const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');


app.get('/', (req, res)=>{
    res.send("We are live")
});

app.post('/', express.json(), (req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });

    function demo(agent){
        agent.add("Sending response from Webhook server as v1.1.11.1");
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

app.listen(3333, ()=>console.log("Server is live at port 3333"));
