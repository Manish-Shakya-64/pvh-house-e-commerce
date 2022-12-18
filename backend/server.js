const app = require('./app');
const dotenv= require('dotenv');
const connectDatabase = require('./config/database');

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down server due to uncaught exception`)
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"})

//connecting to database
connectDatabase()

const server = app.listen(process.env.PORT,() => {
    console.log(`sever is working on http://localhost:${process.env.PORT}`);
})

//unhandled Promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});