import express from "express";
import helmet from "helmet";
import { execute } from "./src/config/db.js";
import administratorsRoutes from "./src/routes/administratorsRoutes.js";
import cinemaComplexRoutes from "./src/routes/cinemaComplexRoutes.js";
import auditoriumsRoutes from "./src/routes/auditoriumsRoutes.js";


async function server(){

        const app = express();
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.disable("x-powered-by");

        app.use(administratorsRoutes);
        app.use(cinemaComplexRoutes);
        app.use(auditoriumsRoutes);
        execute();

        app.listen(3000, () => {
             console.log(`
                 ################################################

                 🛡️  Server listening on port: 3000 🛡️

                    http://localhost:3000/

                    Press Ctrl+C to quit.

                 ################################################
            `);
        });

}

server();