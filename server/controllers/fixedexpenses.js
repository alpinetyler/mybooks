module.exports = {
    read: (req, res, next) => {
        let db = req.app.get('db')
        let userid= req.query.userid
        db.getFixedExpenses(userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        db.createFixedExpense(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    update: (req, res) => {
        let { id } = req.params
        let db = req.app.get('db')
        let fixedexpenses = req.body
        fixedexpenses.id = id // do I need this here?
        db.updateFixedExpense(fixedExpenses).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id } = req.params;//get this from param on url
        db.deleteFixedExpense([id]).then(response => {
            res.status(200).send(response);
        });
    }

}

