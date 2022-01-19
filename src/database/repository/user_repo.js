const User = require('../../model/user');

class UserRepository {

    insert(obj) {
        return User.create({ ...obj});
    }

    update(id, obj) {
        return User.update({ ...obj}, {where: {id: id}});
    }

    delete(obj) {
        return User.destroy({ where: { id: obj.id } });
    }

    findById(id) {
        return User.findAll({where: { id: id } });
    }

    findAll() {
        return User.findAll();
    }
        
}

module.exports = UserRepository;