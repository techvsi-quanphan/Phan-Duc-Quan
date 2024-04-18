import './pre-start';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import 'reflect-metadata';
import { Container } from 'inversify';
import {
    interfaces,
    InversifyExpressServer,
    TYPE,
} from 'inversify-express-utils';
import * as swagger from 'swagger-express-ts';
import { ResourcesService } from './resource/resource.service';
import { ResourcesController } from './resource/resource.controller';
import env from './env';
import logger from 'jet-logger';
import { ResourceModel } from './resource/resource.model';
import { connect } from "mongoose";

// connect to db
connect(
    'mongodb://mongo:27017/db',{
        autoCreate: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
// set up container
const container = new Container();

container
    .bind<ResourcesService>(ResourcesService.name)
    .to(ResourcesService)
    .inSingletonScope();

container
    .bind(ResourcesController)
    .toSelf();

container
    .bind<typeof ResourceModel>("ResourceModel")
    .toConstantValue(ResourceModel)

container
    .bind<ResourcesService>(ResourcesService)
    .toSelf();

// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use(
        '/api-docs/swagger/assets',
        express.static('node_modules/swagger-ui-dist')
    );
    app.use(bodyParser.json());
    app.use(
        swagger.express({
            definition: {
                externalDocs: {
                    url: '/api-docs/swagger',
                },
                info: {
                    title: 'CRUD - RESOURCE API',
                    version: '1.0',
                },
                responses: {
                    500: {},
                },
            },
        })
    );
});

server.setErrorConfig((app: any) => {
    app.use(
        (
            err: Error,
            request: express.Request,
            response: express.Response,
            next: express.NextFunction
        ) => {
            console.error(err.stack);
            response.status(500).send('Something broke!');
        }
    );
});

const app = server.build();
const msg = ('Express server started on port: ' + env.app.port.toString());

app.listen(env.app.port, () => logger.info(msg));

