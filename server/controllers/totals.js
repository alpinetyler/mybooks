module.exports = {
    read: (req, res) => {
        let db = req.app.get('db')
        let month = req.query.month
        let year = req.query.year
        let userid = req.query.userid
        db.getTotals(month, year, userid).then((response) => {
            res.send(response)
        }).catch(err => console.log(err))
    }

}