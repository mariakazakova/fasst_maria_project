import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
const express = require ('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tortues");

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
