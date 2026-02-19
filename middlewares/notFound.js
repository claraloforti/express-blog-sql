function notFound(req, res, next) {
    // Forzo status 404 Not Found
    res.status(404)

    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};

module.exports = notFound;