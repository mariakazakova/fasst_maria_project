import { ITortue, tortue } from '@entities/Tortue';



export interface ITortueDao {
    getOne: (id: number) => Promise<ITortue | null>;
    getAll: () => Promise<ITortue[]>;
    add: (Tortue: ITortue) => Promise<ITortue>;
    update: (Tortue: ITortue) => Promise<ITortue | null>;
    delete: (id: number) => Promise<void>;
}

class TortueDao implements ITortueDao {

    public async getOne(id: number): Promise<ITortue | null> {
        return tortue.findOne({ _id: id });
    }

    public async getAll(): Promise<ITortue[]> {
        return tortue.find({});
    }

    public async add(newTortue: ITortue): Promise<ITortue> {
        return tortue.create(newTortue);
    }

    public async update(newTortue: ITortue): Promise<ITortue | null> {
        return tortue.findByIdAndUpdate({ _id: newTortue.id }, newTortue);
    }

    public async delete(id: number): Promise<void> {
        return tortue.deleteOne({ id });
    }

}

export const turtleDao: ITortueDao = new TortueDao();