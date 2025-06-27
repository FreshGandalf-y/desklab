const WebSocket = require('ws');
const fs = require('fs');
const { saveMessage, readMessages } = require('./database/cmdprocesing.js'); 

function setupWebSocket(server) {
  const wss = new WebSocket.Server({server});

  wss.on("connection", ws => {
      console.log("New client connected!");
  
      ws.on("message", async function (message) {
          
        try {
            const data = JSON.parse(message);
            console.log('recived message', data);

            if (data.type === 'desktopsContant') {           // if data.type === 'desktopsContant'
                
               //ws.send(JSON.stringify({type: 'desk-topsContant', })); 
               // it have to be out of a database 
               console.log("desktops fehlen")
            } else if (data.type === 'getContentDashbord') { // if data.type === 'getContentDashbord'

              const isAutorized = true;
              if (isAutorized) {                          // autorized ???
                fs.readFile('dashbordFrontend.html', 'utf8', (err, fileData) => {
                  if (err) {
                    console.error('Fehler beim Laden der Datei:', err);
                    ws.send({ type: 'error', message: 'mistake by loading Dashboard (becouse it don´t exist'});
                  } else {
                    ws.send(JSON.stringify({type: 'contant', html: fileData}));
                    console.log("Dashbord send");
                  };
                });
              } else {
                ws.send(JSON.stringify({type: 'error', message: 'entering is not permitted'}))
              }; 
            } else if (data.type === 'chatmessage') {         // if data.type === 'chatmessage'
              
              try {
                const myusrName = data.data.myusrName;
                const theLastCommand = data.data.theLastCommand;
                
                saveMessage({ myusrName, theLastCommand });
                try {
                  const response = await readMessages({type: 'lastMsgResponse', time: 'last 1 message' });
                  ws.send(JSON.stringify({type: 'chatResponse', response}));
                } catch (err){
                  console.error("in websocket.js:", err)
                } 

              } catch (error){
                  console.error("mistake:", error); 
              };
            } else if (data.type === 'lastMsgResponse') {                     // response messages
              console.log('the client whants something:', data);
              
                try {
                  const response = await readMessages(data);
                  ws.send(JSON.stringify({type: 'chatResponse', response}));
                } catch (err){
                  console.error("in websocket:", err)
                } 
            } 
    
        } catch (error) {
            console.error('mistake', error)
        }
     });

    ws.on("close", () => {
        console.log("Client has disconnected")
    });
  });
};

module.exports = { setupWebSocket };
