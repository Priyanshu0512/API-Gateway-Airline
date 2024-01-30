const {ServerConfig,Logger} = require('./config');
const express = require('express');
const app =express();
const apiRoutes =require('./routes');
const { rateLimit } =require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');


const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);


app.use('/flightService', createProxyMiddleware({ 
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite:{'^/flightService':'/'}
 }));

app.use('/bookingService', createProxyMiddleware({ 
    target: ServerConfig.BOOKING_SERVICE, 
    changeOrigin: true,
    pathRewrite:{'^/bookingService':'/'}  
}));

app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT,function exec(){
    console.log(`Successfully started the server on ${ServerConfig.PORT}`);
    Logger.info("Success",{});
})