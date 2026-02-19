function errorsHandler(err, req, res, next) {
    // Forzo lo status 500 (errore interno del server)
    res.status(500)

    res.json({
        error: err.message,
    });
};

module.exports = errorsHandler;