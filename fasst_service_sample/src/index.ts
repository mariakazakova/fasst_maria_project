import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost/tortues");

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
