const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Bearer <token>

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).send("Unathorized");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (e, payload) => {
        if (e) {
            res.status(403).send("Invalid token");
        }
        req.user = payload;
        next();
    });

}

module.exports = { authenticateToken };