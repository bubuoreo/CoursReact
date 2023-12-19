function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load() {

    var randomNumber = getRandomInt(1, 1000);
    const socket = io({ query: { id: randomNumber } });
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var dest = document.getElementById('destinataire');
    var userParagraph = document.getElementById('idUser');
    userParagraph.innerHTML = `User : ${randomNumber}`;

    document.getElementById('playButton').addEventListener('click', () => {
        var cardList = {};
        for (let index = 0; index < 4; index++) {
            const cardInfo = {
                "att": 100,
                "def": 50,
                "hp": 50,
                "energy": 20
            };
            cardList[getRandomInt(1, 100)] = cardInfo;
        }
        var money = 860;
        var cardsJson = JSON.stringify(cardList);
        socket.emit('play', {cardsJson, money});
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
        var target = document.getElementById('opponentCard').value;
        socket.emit('attaque', { source, target });
    });

    socket.on('chat message', function (msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('start', function (infos) {
        var parsedInfos = JSON.parse(infos);

        var p = document.createElement('p');
        p.innerHTML = "myDetails : " + JSON.stringify(parsedInfos.myDetails);
        document.getElementById('infoDiv').appendChild(p);

        var p = document.createElement('p');
        p.innerHTML = "opponentDetails : " + JSON.stringify(parsedInfos.opponentDetails);
        document.getElementById('infoDiv').appendChild(p);

        if (!parsedInfos.myDetails.canAttack) {
            document.getElementById('attackButton').disabled = true
        }
    });
    
    socket.on('fail_attack', function (msg) {
        alert(msg);
    });
}