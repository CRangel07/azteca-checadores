

const showAdminPage = (req, res) => {
    const {username} = req.session.user;
    res.render('admin', {username});
};

module.exports = {
    showAdminPage,
};