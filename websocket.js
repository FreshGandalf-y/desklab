const WebSocket = require('ws');
const fs = require('fs');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({server});

  wss.on("connection", ws => {
      console.log("New client connected!");
  
      ws.on("message", async function (message) {
          
          try {
              const data = JSON.parse(message);
              console.log('recived message', data);
  
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

              } else if (data.type === "CpuUsage") {            // if data.type === 'CpuUsage'
                  console.log("will send")
                  const cpus = {
                      cpu1: 1,                          // in this expiriment i used to show the cpu Usage but is not perfectly.
                      cpu2: 1,
                      cpu3: 1,
                      cpu4: 1
                  }
  
                  function getCpuUsage() {
                      const cpus = os.cpus();
                      let totalIdle = 0, totalTick = 0;
                      cpus.forEach(cpu => {
                          for (let type in cpu.times) {
                              totalTick += cpu.times[type];
                          }
                          totalIdle += cpu.times.idle;
                      });
                     return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
                  }
                      const start = getCpuUsage();
                      function hhh() {
                      setTimeout(() => {
                          const end = getCpuUsage();
                          const idleDiff = end.idle - start.idle;
                          const totalDiff = end.total - start.total;
                          const usage = 100 - (100 * idleDiff / totalDiff);
                          const ent = console.log(`CPU Usage: ${usage.toFixed(2)}%`);
                        
                      }, 1000);
                      isCpuDataSet = true;
                      
                  }
                  function setCpus(arg) {
                    if (isCpuDataSet == true) {
                        console.log("jj")
                        cpus.cpu1 = arg;
                        cpus.cpu2 = arg;
                        cpus.cpu3 = arg;
                        cpus.cpu4 = arg;
                        ws.send(JSON.stringify({type: "CpuUsage", cpus}))
                    }
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
