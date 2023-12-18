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
                "def": 50
            };
            cardList[getRandomInt(1,100)] = cardInfo;
        }
        console.log(cardList);
        socket.emit('play', JSON.stringify(cardList));
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

    socket.on('chat message', function (msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
}