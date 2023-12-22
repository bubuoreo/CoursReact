const fetch = require('node-fetch');

class SpringbootService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getAllUsers() {
        console.log(`On essaye d\'obtenir les users du serveur Springboot à l\'URL: ${this.baseUrl}/users`);
        var ret = '';
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            if (!response.ok) {
                ret += 'Erreur réseau lors de la requête';
            } else {
                var result = await response.json();
                ret = result
            }
            return ret;

        } catch (error) {
            ret += 'Erreur lors de la récupération des utilisateurs:' + error;
            return ret;
        }
    }

    async updateUserMoney({ userId, newMoney }) {
        console.log(`On met à jour les porte feuilles des utilisateurs sur le serveur Springboot à l\'URL: ${this.baseUrl}/user/${userId}`);
        const response = await fetch(this.baseUrl + "/user/" + "6", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "account": newMoney
            })
        });
        if (!response.ok) {
            ret += 'Erreur réseau lors de la requête';
        } else {
            var result = await response.json();
            console.log(result);
        }

    }
}

module.exports = SpringbootService;