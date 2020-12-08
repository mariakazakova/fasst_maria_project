import { Model, Document, model, Schema } from 'mongoose';

export interface ITortue {
    id: number;
    name: string;
    age: number;
    taille: number;
    terrestre: boolean;
    species: string;
}

const schema = new Schema({
    id: Number,
    name: String,
    age: Number,
    taille: Number,
    terrestre: Boolean,
    species: String
});


// @ts-ignore
export const tortue: Model<ITortue & Document> = model('tortues', schema);
