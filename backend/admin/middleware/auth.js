const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from cookie
    const token = req.cookies.token;

    // Check if no token
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token, authorization denied',
            isTokenExpired: true
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is about to expire (less than 24 hours remaining)
        const tokenExp = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const hoursUntilExpiry = (tokenExp - now) / (1000 * 60 * 60);

        if (hoursUntilExpiry < 24) {
            // Add warning header
            res.set('X-Token-Expiry-Warning', `Token will expire in ${Math.round(hoursUntilExpiry)} hours`);
        }

        // Add user from payload
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token has expired, please login again',
                isTokenExpired: true
            });
        }
        res.status(401).json({ 
            success: false,
            message: 'Token is not valid',
            isTokenExpired: false
        });
    }
}; 