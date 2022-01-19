const Account = require('../../model/account');

class AccountRepository {

    insert(obj) {
        return Account.create({ ...obj});
    }

    update(id, obj) {
        return Account.update({ ...obj}, {where: {id: id}});
    }

    delete(obj) {
        return Account.destroy({ where: { id: obj.id } });
    }

    findById(id) {
        return Account.findAll({where: { id: id } });
    }

    findByUsername(username) {
        return Account.findAll({where: { username: username } });
    }

    findAll() {
        return Account.findAll();
    }
        
}

module.exports = AccountRepository;