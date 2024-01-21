const {ServerConfig,Logger} = require('./config');
const express = require('express');
const app =express();
const apiRoutes =require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);


app.listen(ServerConfig.PORT,function exec(){
    console.log(`Successfully started the server on ${ServerConfig.PORT}`);
    Logger.info("Success",{});
})