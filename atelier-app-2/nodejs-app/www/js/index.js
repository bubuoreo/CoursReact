function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// async function getSpringbootUsers(htmlElem) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/users`);
//         if (!response.ok) {
//             htmlElem.innerHTML = 'Erreur réseau lors de la requête';
//         } else {
//             var result = await response.json();
//             console.log(result);

//             for (const user of result) {
//                 const div = document.createElement('div')
//                 div.innerText = user.login
//                 htmlElem.appendChild(div)
//             }
//         }
//     } catch (error) {
//         htmlElem.innerHTML = 'Erreur lors de la récupération des utilisateurs:' + error;
//     }
// }

function load() {

    var randomNumber = getRandomInt(1, 1000);
    const socket = io({ query: { id: randomNumber } });
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var dest = document.getElementById('destinataire');
    var userParagraph = document.getElementById('idUser');
    var connectedUsersParagraph = document.getElementById('connectedUsers');
    var springbootUsersParagraph = document.getElementById('springbootUsers');
    userParagraph.innerHTML = `User : ${randomNumber}`;

    // getSpringbootUsers(springbootUsersParagraph);
    socket.emit('getSpringbootUsers');

    document.getElementById('playButton').addEventListener('click', () => {
        var cardList = {};
        const cardInfo = {
            "att": 100,
            "def": 50,
            "hp": 50,
            "energy": 20
        };
        for (let index = 0; index < 4; index++) {
            cardList[getRandomInt(1, 100)] = cardInfo;
        }
        var money = 100;
        var cardsJson = JSON.stringify(cardList);
        socket.emit('play', { cardsJson, money });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (input.value) {
            const body = { "msg": input.value };
            if (dest.value) {
                body["dest"] = dest.value;
            }
            socket.emit('chat message', JSON.stringify(body));
            input.value = '';

        }
    });

    document.getElementById('attackButton').addEventListener('click', () => {
        var source = document.getElementById('myCard').value;
        console.log(source);
        var target = document.getElementById('opponentCard').value;
        socket.emit('attaque', { source, target });
    });

    document.getElementById('endTurn').addEventListener('click', () => {
        socket.emit('endTurn')
    });

    socket.on('chat message', function (msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('start', function (data) {
        var parsedData = JSON.parse(data);

        var p = document.createElement('p');
        p.innerHTML = "myDetails : " + JSON.stringify(parsedData.myDetails);
        document.getElementById('infoDiv').appendChild(p);

        var p = document.createElement('p');
        p.innerHTML = "opponentDetails : " + JSON.stringify(parsedData.opponentDetails);
        document.getElementById('infoDiv').appendChild(p);

        if (!parsedData.myDetails.canAttack) {
            document.getElementById('attackButton').disabled = true
        }
    });

    socket.on('feedback_attack', function (data) {
        const parsedData = JSON.parse(data)
        
        var p = document.createElement('p');
        p.innerHTML = "myDetails : " + JSON.stringify(parsedData.self);
        document.getElementById('infoDiv').appendChild(p);
        
        var p = document.createElement('p');
        p.innerHTML = "opponentDetails : " + JSON.stringify(parsedData.opponent);
        document.getElementById('infoDiv').appendChild(p);
    })
    
    socket.on('fail_attack', function (msg) {
        alert(msg);
    });
    
    socket.on('updateConnectedUsers', (data) => {
        connectedUsersParagraph.innerHTML = `Utilisateurs connectés : ${data}`;
    });

    socket.on('updateSpringbootUsers', (data) => {
        springbootUsersParagraph.innerText = `Utilisateurs connectés : ${data}`;
    });
}