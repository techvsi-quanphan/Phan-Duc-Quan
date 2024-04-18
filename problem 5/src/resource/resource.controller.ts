import 'reflect-metadata';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import {
    controller,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost,
    interfaces,
    requestParam,
} from 'inversify-express-utils';
import 'reflect-metadata';
import {
    ApiOperationDelete,
    ApiOperationGet,
    ApiOperationPatch,
    ApiOperationPost,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { ResourcesService } from './resource.service';
import { Resource } from "./resource.interface"
import { tryParse } from '../declarations/functions';
import { ResourceModel } from './resource.model';

@ApiPath({
    name: 'Resources',
    path: '/resources',
    security: { apiKeyHeader: [] },
})
@controller('/resources')
export class ResourcesController implements interfaces.Controller {
    constructor(@inject(ResourcesService.name) private resourcesService: ResourcesService) { }

    @ApiOperationGet({
        description: 'Get resources objects list',
        responses: {
            200: {
                description: 'OK'
            },
        },
        security: {
            apiKeyHeader: [],
        },
        summary: 'Get resources list',
    })
    @httpGet('/')
    public async getResources(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const data = await this.resourcesService.getResources();
        response.json(data);
    }

    @ApiOperationPost({
        description: 'Insert record to Resourse',
        parameters: {
            body: {
                properties: {
                    name: {
                        required: true,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    },
                    description: {
                        required: true,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    },
                    version: {
                        required: true,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    }
                }
             }
        },
        summary: 'Insert record to Resources',
        responses: {
            200: { description: "Success" },
            400: { description: "Fail" }
        }
    })
    @httpPost('/')
    public async postResources(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const body = await tryParse(request);
        const data = await this.resourcesService.addResources(body);
        response.json(data);
    }

    @ApiOperationPatch({
        description: 'Update record to Resourse',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            body: {
                properties: {
                    name: {
                        required: false,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    },
                    description: {
                        required: false,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    },
                    version: {
                        required: false,
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    }
                }
             }
        },
        summary: 'Update record to Resources',
        responses: {
            200: { description: "Success" },
            400: { description: "Fail" }
        }
    })
    @httpPatch('/:id')
    public async updateResources(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const data = await this.resourcesService.updateResource(id, request.body);
        response.json(data);
    }

    @ApiOperationDelete({
        description: 'Delete record to Resourse',
        parameters: { 
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Fail" }
        }
    })
    @httpDelete('/:id')
    public async deleteResources(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const data = await this.resourcesService.removeResource(id);
        response.json(data);
    }

}