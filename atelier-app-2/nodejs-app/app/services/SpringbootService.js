const fetch = require('node-fetch');
const CONFIG = require('../../../config.json')

global.CONFIG = CONFIG;

class SpringbootService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getAllUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            if (!response.ok) {
                throw new Error('Erreur réseau lors de la requête');
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            return [];
        }
    }
}

module.exports = new SpringbootService(CONFIG.springbootApp);