import mongoose from 'mongoose';
import pino from 'pino';
import { isOperationalError, logError, returnError } from './error/baseError';
import {app} from './server'


const url = process.env.URL;
const logger = pino()
const PORT = process.env.PORT || 3000

    mongoose.connect(url).then((data) => {
        logger.info({success: 'connected to database'})

    })

app.use(logError)
app.use(returnError)

process.on('unhandledRejection', err => {
    throw err
})

process.on('uncaughtException', err =>{
    logError(err)

    if(!isOperationalError(err)){
        process.exit(1)
    }
})

app.listen(PORT, () => logger.info({connected: 'we connected to server'}))




