const User = require('../db/index').User;
const redis = require('../redis.js');

module.exports = {
    addUser: (req, res) => {
        User.create({
            username: req.body.username,
            uid: req.body.uid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin_status: req.body.admin_status,
            age: req.body.age,
            gender: req.body.gender,
            street_address: req.body.street_address,
            city: req.body.city,
            state: req.body.state,
            zip_code: req.body.zip_code,
            email: req.body.email,
            phone: req.body.phone
        })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },


    getUserById: (req, res) => {
        User.findOne({where: {uid: req.params.id}})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },

    getUser: (req, res) => {
        User.findAll({where: {username: req.params.id}})
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },

    deleteUser: (req, res) => {
        User.destroy({
            where: {username: req.params.id}
        })
        .then(() => {
            res.send('deleted user')
        })
        .catch(err => {
            res.status(500).send(err);
        })
    }
}
