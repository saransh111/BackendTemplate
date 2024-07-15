const User = require('../Models/UserModel');

class UserService {
    async addUser(userData) {
        const user = await User.findBy({username});
        if(user==null){
            const user = new User(userData);
            await user.save();
            return user;
        }
        else{
            return null;
        }
    }

    async updateUser(id, userData) {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        return user;
    }

    async getUser(username) {
        const user = await User.findBy({username});
        return user;
    }

    async removeUser(id) {
        const result = await User.findByIdAndDelete(id);
        return result !== null;
    }

    async getAllUsers() {
        const users = await User.find({});
        return users;
    }
}

module.exports = UserService ;
