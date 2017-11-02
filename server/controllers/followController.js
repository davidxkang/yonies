const Follow = require('../db/index').Follow;

module.exports = {
  addFollow: (req, res) => {
    Follow.create({
        name: req.body.name,
        uid: req.body.uid
    })
    .then((data) => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
},

getFollow: (req, res) => {
    Follow.findAll({
        where: {uid: req.params.id}
    })
    .then((data) => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
},

deleteFollow: (req, res) => {
    Follow.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.send('deleted category')
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}
}