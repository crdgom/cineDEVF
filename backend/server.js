import express from "express";
import helmet from "helmet";


async function server(){
    try{

        const app = express();
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.disable("x-powered-by");

        app.listen(3000, () => {
             console.log(`
                 ################################################

                 🛡️  Server listening on port: 3000 🛡️

                    http://localhost:3000/

                    Press Ctrl+C to quit.

                 ################################################
            `);
        });
    }catch(e){
        console.log(e);
    }
}

server();