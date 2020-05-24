module.exports = {
    read: (req, res, next) => {
        let db = req.app.get('db')
        let userid= req.query.userid
        console.log("fixedexpenses userid is:", userid)
        db.getFixedExpenses(userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        console.log("create fixed expense id:", req.body.userid)
        db.createFixedExpense(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    update: (req, res) => {
        let { id } = req.params
        let db = req.app.get('db')
        let fixedexpenses = req.body
        // console.log(9999, fixedexpenses)
        fixedexpenses.id = id // do I need this here?
        db.updateFixedExpenses(fixedexpenses).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id, userid } = req.params;//get this from param on url
        // console.log(5555, id)
        db.deleteFixedExpense(id, userid).then(response => {
            res.status(200).send(response);
        });
    }

}

