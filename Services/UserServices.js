const User = require('../Models/UserModel');

class UserService {
    async addUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async updateUser(id, userData) {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        return user;
    }

    async getUser(id) {
        const user = await User.findById(id);
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
