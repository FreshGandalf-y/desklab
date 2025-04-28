const WebSocket = require('ws');
const fs = require('fs');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({server});

  wss.on("connection", ws => {
      console.log("New client connected!");
  
      ws.on("message", async function (message) {
          
          try {
              const data = JSON.parse(message);
              console.log('recived message');
  
              if (data.type === 'desktopsContant') {           // if data.type === 'desktopsContant'
                  
                  fs.readFile('contantDesktop.json', 'utf-8', (err, fileData) => {
                      if (err) {
                          console.error('mistake', err);
                          ws.send(JSON.stringify({type: 'error', message: 'mistake by loading File'}));
                      } else {
                          ws.send(JSON.stringify({type: 'desk-topsContant', html: fileData}));
                          console.log("send desktop-pictures")
                      }
                  })
               } else if (data.type === 'getContentDashbord') { // if data.type === 'getContentDashbord'
                  const isAutorized = true;

                  if (isAutorized) {                          // autorized ???

                      fs.readFile('dashbordFrontend.html', 'utf8', (err, fileData) => {
                         
                      if (err) {
                              console.error('Fehler beim Laden der Datei:', err);
                              ws.send({ type: 'error', message: 'mistake by loading File'});
                         } else {
                             ws.send(JSON.stringify({type: 'contant', html: fileData}));
                              console.log("Dashbord send")
                              
                          }
                      })

                  } else {
                      ws.send(JSON.stringify({type: 'error', message: 'no permittion'}))
                  } 
  
              } else if (data.type === 'chatmessage') {         // if data.type === 'chatmessage
                try {
                  console.log("data parsed", data)
                    
                  ws.send(JSON.stringify({type: 'chatResponse', data}));

                } catch (error) {
                    console.error("mistake:", error);
                }

              } else if (data.type === "CpuUsage") {   // if data.type === 'CpuUsage'


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
