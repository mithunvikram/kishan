import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes';
import { MongoConfig } from './config/Mongoconfig';
import mongoose = require('mongoose');
import { RoleSeedData } from './seed';

const PORT = 3007;

class App {

    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = 'mongodb://127.0.0.1/GeppettoDev';


    constructor() {
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
        this.mongoSeedData();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        // let mongoConfig = new MongoConfig();
        // mongoConfig.mongoConfig();
    }

    private mongoSeedData(): void {
        let seedData = new RoleSeedData();
        seedData.Createrole();
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})