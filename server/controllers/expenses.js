module.exports = {
    read: (req, res, next) => {
        let db = req.app.get('db')
        let month = req.query.month
        let year = req.query.year
        let userid = req.query.userid
        // console.log("expense userid is:", userid, year, month)
        db.getExpenses(month, year, userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        // console.log(888, req.body)
        db.createExpense(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    update: (req, res) => {
        let { id } = req.params
        let db = req.app.get('db')
        let expenses = req.body
        //console.log(8888, expenses)
        expenses.id = id
        db.updateExpense(expenses).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id, userid } = req.params;//get this from param on url
        db.deleteExpense(id, userid).then(response => {
            res.status(200).send(response);
        });
    }

}

