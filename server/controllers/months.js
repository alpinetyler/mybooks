module.exports = {
    read: (req, res) => {
        let db = req.app.get('db')
        let userid= req.query.userid
        console.log("months userid is:", userid)
        db.getMonths(userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        //console.log(1111, req.body)
        db.createMonth(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id } = req.params;//get this from param on url
        db.deleteMonth([id]).then(response => {
            res.status(200).send(response);
        });
    }

}

