const {format} = require ('date-fns');
const {v4: uuid} = require ('uuid');
const fs = require ('fs');
const fsPromises = require ('fs').promises
const path = require ('path');

const logEvents = async (message, logFileName)=>{
    const dateTime = `${format(new Date(), 'yyyy-MM-dd \tHH:mm:ss')}`;
    const logMessage = `${dateTime}\t${uuid()}\t${message}\n`; //uuid is a unique identifier which creats a specific id for each log message/items

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logMessage);
    }catch(err){
        console.log(err);
    }
}

const logger = (req, res, next)=>{ // the next function is used to call the next piece of middleware function in the stack
    logEvents(`${req.method}\t${req.url}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method}\t${req.path}`)
    next()
};

module.exports = {logEvents, logger};