var healthCheck = function(req,res) {
    res.sendStatus(200);
};

module.exports = {
    'healthCheck':healthCheck
};
