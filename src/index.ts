import app from "./app"
import dotenv from "dotenv"

dotenv.config()


process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})


const port =process.env.SERVER_PORT || 8080;

app.listen(port,()=>{
    console.log(`start server on ${port}`);
    
})

process.on('unhandledRejection',e=>{
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(e);
    process.exit(1);
})