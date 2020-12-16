import { ITortue, tortue } from '@entities/Tortue';



export interface ITortueDao {
    getOne: (id: string) => Promise<ITortue | null>;
    getAll: () => Promise<ITortue[]>;
    add: (Tortue: ITortue) => Promise<ITortue>;
    update: (Tortue: ITortue, id: string) => Promise<ITortue | null>;
    delete: (id: string) => Promise<string>;
}

class TortueDao implements ITortueDao {

    public async getOne(id: string): Promise<ITortue | null> {
        return tortue.findOne({ _id: id });
    }

    public async getAll(): Promise<ITortue[]> {
        return tortue.find({});
    }

    public async add(newTortue: ITortue): Promise<ITortue> {
        return tortue.create(newTortue);
    }

    public async update(newTortue: ITortue, id: string): Promise<ITortue | null> {
        await tortue.findByIdAndUpdate({ _id: id }, newTortue);
        return tortue.findOne({ _id: id });
    }

    public async delete(id: string): Promise<string> {
        await tortue.deleteOne({ _id: id });
    return id;
}

}

export const turtleDao: ITortueDao = new TortueDao();