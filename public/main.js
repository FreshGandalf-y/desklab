//main 
function site(e) {
  console.log(e);
  let url = "Desktop.html?" + e.src;
  window.location.assign(url);
} // wollte ich eigentlich für dynamische seiten benutzen


var usrName; //defauld: anonymous
var password; //defauld: NULL
var loggedIn = false
var connection;
const date = Date()

var ipServer = "localhost"
var valueForWs;



const ws = new WebSocket("ws://" + location.host + '/ws/')

ws.onopen = function () {
  console.log("we are connected");
};

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.type === 'contant') {
    console.log("html data arrived (Dashbord)", data)
    let blob = new Blob([data.html], { type: "text/html"});
    let url = URL.createObjectURL(blob);
    document.getElementById('dynamicDashbord').src = url;
    
  } else if (data.type === 'error') {
    console.log('Error:', data.message);
  } else if (data.type === 'chatResponse') {
    console.log("chatresponse recived", data)
    writeMessages(data.response);

  } else if (data.type === 'desk-topsContant') {
    console.log("desktops recived", data.html)
    //for (const deskt in data.Dea)
  } else if (data.type === 'messageBuffer') {

  } else {
    console.log('incorrect message')
    ws.send('incorrect message')
  }
}

function desktopsContant() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({type: 'desktopsContant'}))
  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({type: 'desktopsContant'}))
    })
  }
}

function sendData( error) {
  const data = {
    myusrName: usrName,
    theLastCommand: valueForWs,
    datetime: date
  }
  ws.send(JSON.stringify({type: 'chatmessage', data: data}));
  if (error) {
    console.log("send arguments to ws does not function")
  } else {
    console.log("send arguments to ws enabled")
  }
}

function showDashbord(error) {
  if (loggedIn == true) {
    var url = "dashbord.html";
    window.location.assign(url);
  } else {
    document.getElementById("customAlert").style.display = "flex";
  }
}


function seeDashboard() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'getContentDashbord'}))
  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ type: 'getContentDashbord'}))
    })
  }
}

// joke- and normal-Alert

function closecontainer(id) {
  document.getElementById(id).style.display = "none";
  if (id === "customAlert") {
    nicepicture()
  }
}

function showcontainer(id) {
  document.getElementById(id).style.display = "flex";
  console.log(id);
  if (id === "terminal") {
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.top = "360px";
    document.getElementById(id).style.right = "60px";
  }  
}

function nicepicture(arg) {
  document.getElementById("nicepicture-Container").style.display = "flex";
}

function borderpicture(img) {
  img.style.border = "3px solid red";
  console.log("newborder")
}

function nicepictureRight() {
  document.getElementById("nicepicture-Container").style.display = "none";
  console.log("pictures are closed" )
  alert("Error: not authentificated")
};

function commitSignIn(err) {
  const username = document.getElementById("userNameVerification")
  const password = document.getElementById("passwordVerification")

  const data = {
    userName: username,
    passWord: password,
  };
  ws.send(JSON.stringify({type: 'userVerification' ,data}));
  if (err) {
    console.error(err)
  } else {
    console.log("send usernames to Server succed")
  }
}

function fullInfo(error) {
  document.getElementById("ipAdress").innerHTML = " " + ipServer + " ";
  
  if (loggedIn == true) {
    connection = "open";
  } else {
    connection = "closed";
  }
  document.getElementById("connection?").innerHTML = " " + connection + " ";
}

function username() {
  
  usrName = usrName ?? "anonymous";
  document.getElementById("usrl").innerHTML = usrName + ": ";

  console.log(usrName)
}

function creatorname() {
  document.getElementById("creatorName").innerHTML = usrName;
  console.log("Hallo" + usrName)
}

document.addEventListener("keydown", function(event) {
  const flex = document.getElementById("terminal").style.display;
  if (flex === "flex") {
    if (event.key === "Enter") {
      chatcontant()
    }
  } else {
    console.log("no usable function for this key")
  }
})

function chatcontant() {
  var lastmesage = document.getElementById("input");
  var value = lastmesage.value;
  if (value === "") {
    console.error("no value in input field");
  } else {
    console.log("last command: " + value);
    commandToWs(value);
  }
  
};

function grabCommants() {
  try {
   ws.send(JSON.stringify({ 
    type: 'lastMsgResponse',
    time: 'last 20 messages'
  }));
  } catch (err) {
    console.error(err)
  }
};

function writeMessages(message) {
  
  console.log('Typ:', typeof message)
  console.log('Array.isArray:', Array.isArray(message));
  try {
    const container = document.getElementById("chatcontainer");
    const overflow = document.getElementById("overflowscroll");
    
    if (!Array.isArray(message)) {
      console.error("writeMessage whants to have a Array!")
      return;
    }
    const reversed = message.slice().reverse();

    reversed.forEach(obj => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('chat-message');
      
      const time = new Date(obj.timestamp).toLocaleString();

      messageDiv.innerHTML = `
        <p><strong>- ${obj.username}</strong> <em>(${time})</em></p>
        <h1>${obj.lastcommand}</h1>
      `;
      container.appendChild(messageDiv);
    });
    overflow.scrollTop = overflow.scrollHeight;
  } catch (err) {
    console.error(err);
  }
} 

function commandToWs(arg) {
    valueForWs = arg;
    sendData();
};
