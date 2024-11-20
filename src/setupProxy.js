module.exports = function(app) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('X-Frame-Options', 'ALLOWALL');
        res.header('Content-Security-Policy', "frame-ancestors *");
        next();
    });
}; 