import app from './app.js';
import {connectDB} from './database.js';
import "dotenv/config";

 async function start() {
    await connectDB();
    const port = process.env.PORT || 8080;
    app.listen({ port }, () => { 
        console.log("Server listening on port: " + port);
    });

    return true;
}

start()