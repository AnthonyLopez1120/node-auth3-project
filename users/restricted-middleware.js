const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(authorization) {
        const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

        jwt.verify(authorization, secret, function(error, decodedToken) {
            if (error) {
                console.log(error);
                res.status(401).json({errorMessage: "Invalid Token"})
            } else {
                req.token = decodedToken;
                next();
            }
        });
    } else {
    res.status(400).json({ message: 'Please login and try again.' });
  }
};