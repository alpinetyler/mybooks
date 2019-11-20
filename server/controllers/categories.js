module.exports = {
    read: (req, res) => {
        let db = req.app.get('db')
        db.getCategories().then((response) => {
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
        const { id } = req.params;//get this from param on url
        db.deleteCategory([id]).then(response => {
            res.status(200).send(response);
        });
    }

}

