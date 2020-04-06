module.exports = {
    read: (req, res) => {
        let db = req.app.get('db')
        db.getTotals().then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    }

}