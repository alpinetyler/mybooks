module.exports = {
    read: (req, res) => {
        let db = req.app.get('db')
        let userid = req.query.userid
        console.log("categories userid is:", userid)
        db.getCategories(userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    create: (req, res) => {
        let db = req.app.get('db')
        db.createCategory(req.body).then(response => {
            res.send(response)
        }).catch(err => console.log(err))
    },

    delete: (req, res) => {
        let db = req.app.get('db');
        const { id, userid } = req.params;//get this from param on url
        db.deleteCategory(id, userid).then(response => {
            res.status(200).send(response);
        });
    }

}

