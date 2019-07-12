import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes'
import { ResourceSeedData } from './seed';
import { MongoConfig } from './config/Mongoconfig';
import mongoose = require('mongoose');

const PORT = 3008;

class App {
    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();

    constructor() {
        this.config();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
        this.mongoSeedData();

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(cors({ credentials: true, origin: true }));

    }

    private mongoSetup(): void {
        // mongoose.Promise = global.Promise;
        // mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        let mongoConfig = new MongoConfig();
        mongoConfig.mongoConfig();
    }


    private mongoSeedData(): void {
        let seedData = new ResourceSeedData();
        seedData.Createresource();
    }


}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})