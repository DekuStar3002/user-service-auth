const express = require('express');
const cookieParser = require('cookie-parser');
const route = require('./src/server');
const app = require('express')();
app.use(cookieParser());
app.use(express.json());
app.use(route);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})