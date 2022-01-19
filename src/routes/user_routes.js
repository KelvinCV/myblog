const express = require('express');
const route = express.Router();

const UserRepository = require('../database/repository/user_repo');

let uRepo = new UserRepository();

//Endpoints

// Find All - Buscar todos os usuários
route.get('/', async (_, res) => {

    const users = await uRepo.findAll();

    resp = {
        status: 'OK',
        data: users
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(resp));
 // res.status(200).json(resp);

})

// Find by ID - Buscar o usuário com determinado ID 
route.get('/:id', async (req, res) => {
    let id = req.params.id
    let user = await uRepo.findById(id);

    if (user.length > 0) {
        let resp = {
            status: 'OK',
            data: user[0],
    };
    
    res.status(200).send(JSON.stringify(resp));

    } else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} was not found.`,
        };
        res.status(404).send(JSON.stringify(resp));
    }
});

// Insert - Cadastrar um novo usuário 
route.post('/', async (req, res) => {
    let u = req.body;

    if (u.nome == undefined || u.email == undefined) {
        resp = {
            status: 'ERROR',
            description: 'User JSON with id, nome and email fields must be provided.'
        }

        res.status(400).send(JSON.stringify(resp));
        return;
    }

    const user = await uRepo.insert(u);

    resp = {
        status: 'OK',
        data: `User with id ${user.id} has been inserted successfully.`
    }

    res.status(200).send(JSON.stringify(resp));

})

// Update - Atualizar um usuário existente com um determinado ID
route.put('/:id', async (req, res) => {
    let id = req.params.id;
    let u = req.body;

    let user = await uRepo.findById(id);

    if (user.length > 0) {
        if (u.nome == undefined || u.email == undefined) {
            let resp = {
                status: 'ERROR',
                description: 'User JSON with id, nome and email fields must be provided.'
            }
            res.status(400).send(JSON.stringify(resp));
        } 
    

    user = await uRepo.update(id, u);

    let resp = {
        status: 'OK',
        data: `User with id ${id} has been updated successfully.`
    }

        res.status(200).send(JSON.stringify(resp));

    } else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} was not found.`
        }

        res.status(404).send(JSON.stringify(resp));
    }
});

// Delete - Excluir um usuário existente com um determinado ID 
route.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let user = await uRepo.findById(id);

    if (user.length > 0) {
        await uRepo.delete(user[0]);

    let resp = {
        status: 'OK',
        description: `User with id ${id} has been deleted successfully.`
    };
    res.status(200).send(JSON.stringify(resp));

    } else {
        let resp = {
            status: 'ERROR',
            description: `User with id ${id} was not found.`
        };

        res.status(404).send(JSON.stringify(resp));
    }
});

module.exports = route;