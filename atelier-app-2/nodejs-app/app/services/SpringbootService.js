const fetch = require('node-fetch');

class SpringbootService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getAllUsers(req, res) {
        console.log(`On essaye d\'obtenir les users du serveur Springboot à l\'URL: ${this.baseUrl}/users`);
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            if (!response.ok) {
                throw new Error('Erreur réseau lors de la requête');
            }
            var test = await response.json();
            return res.end(`${JSON.stringify(test)}`);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            return [];
        }
    }
}

module.exports = SpringbootService;