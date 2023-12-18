class UserManager {

    constructor() {
        this.socketsMap = new Map();
        this.userPlayingCards = {};
    }

    addUser({id, socket}) {
        this.socketsMap.set(id, socket);
    }

    removeUser(id) {
        this.socketsMap.delete(id);
    }

    getSocket({id}) {
        console.log(`UserManager: ${id}`);
        var ret = null;
        if (this.socketsMap.has(id)) {
            ret = this.socketsMap.get(id)
        }
        return ret;
    }

    getConnectedUsers() {
        console.log(this.socketsMap.keys());
    }
}

module.exports = UserManager;