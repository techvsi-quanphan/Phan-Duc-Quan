import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import * as _ from 'lodash';
import { ResourceModel } from "./resource.model";
import logger from 'jet-logger';
import uuid4 from "uuid4";
import { Resource } from './resource.interface';

@injectable()
export class ResourcesService {
    constructor(@inject("ResourceModel") private resourceModel: typeof ResourceModel) { }

    /**
     * Get all resources
     * @returns 
     */
    async getResources(): Promise<Resource[]> {
        try {
            logger.imp("Getting the list of resource");
            const data = await this.resourceModel.find();
            return data.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    version: item.version
                }
            });
        } catch (error) {
            logger.err(`Error getResource: ${error}`);
            throw error;
        }
    }

    /**
     * Add new record to Resource
     * @param body 
     * @returns 
     */
    async addResources(body: any): Promise<boolean> {
        try {
            logger.imp("Inserting record to resource");
            await this.resourceModel.insertMany([
                {
                    id: uuid4(),
                    name: body.name,
                    description: body.description,
                    version: body.version
                }
            ])
            return true
        } catch (error) {
            logger.err(`Error addResource: ${error}`);
            return false;
        }
    }

    /**
     * Update record
     * @param id 
     * @param body 
     * @returns 
     */
    async updateResource(id: string, body: any): Promise<boolean> {
        try {
            logger.imp("Updating record to resource");
            const data = await this.resourceModel.updateOne({
                id: id
            },
                {
                    name: body?.name,
                    version: body?.version,
                    description: body?.description
                })
            logger.info("data: " + JSON.stringify(data));
            return true;
        } catch (error) {
            logger.err(`Error updateResource: ${error}`);
            return false;
        }
    }

    /**
     * Remove the record
     * @param id 
     * @returns 
     */
    async removeResource(id: string): Promise<boolean> {
        try {
            logger.imp("Removing record to resource");
            await this.resourceModel.deleteOne({ id: id });
            return true;
        } catch (error) {
            logger.err(`Error removeResource: ${error}`);
            return false;
        }
    }
}