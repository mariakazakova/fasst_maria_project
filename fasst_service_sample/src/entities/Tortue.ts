import mongoose, { Model, Document } from 'mongoose';
const Schema = mongoose.Schema;

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


export const tortue: Model<ITortue & Document> = mongoose.model('tortues', schema);
