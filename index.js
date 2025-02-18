const dotenv=require('dotenv')
dotenv.config()
const port=process.env.PORT;
const http=require('http')
const cron = require('node-cron');

const app=require('./src/api/v1/app')
const {updateCarStatus}= require('./src/api/v1/helpers/carStatus_trigger')


const server=http.createServer(app)

cron.schedule('0 0 * * *', () => {
    console.log('Running daily task to update carStatus...');
    updateCarStatus();
  });

server.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})

module.exports=server