const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = app =>{
    app.use(
        createProxyMiddleware('/buscar', {
            target: 'http://localhost:3000',
            changeOrigin: true
        })
    )
}