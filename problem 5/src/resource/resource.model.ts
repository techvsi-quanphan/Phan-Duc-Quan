import mongoose, { Document } from 'mongoose';

interface ResourceDoc extends Document {
    id: string;
    name: string;
    description: string;
    version: string
}
export const resourceSchema = new mongoose.Schema<ResourceDoc>({
    id: String,
    name: { type: String, required: true, unique: true },
    description: String,
    version: String
});

const ResourceModel = mongoose.model('Resource', resourceSchema);
export { ResourceDoc, ResourceModel };