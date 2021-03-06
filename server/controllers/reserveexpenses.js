module.exports = {
    read: (req, res, next) => {
        let db = req.app.get('db')
        let userid = req.query.userid
        db.getReserveExpenses(userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        // console.log(999, req.body)
        db.createReserveExpense(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    update: (req, res) => {
        let { id } = req.params
        let db = req.app.get('db')
        let expenses = req.body
        //console.log(8888, expenses)
        expenses.id = id
        db.updateReserveExpense(expenses).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id, userid} = req.params;//get this from param on url
        db.deleteReserveExpense(id, userid).then(response => {
            res.status(200).send(response);
        });
    }

}

