import { ITortue } from '@entities/Tortue';



export interface ITortueDao {
    findOne: (id: number) => Promise<ITortue | null>;
    find: () => Promise<ITortue[]>;
    create: (Tortue: ITortue) => Promise<void>;
    put: (Tortue: ITortue) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class TortueDao implements ITortueDao {
    findOne: ((id: number) => Promise<ITortue | null>) | undefined;
    find: () => Promise<ITortue[]>;
    create: (Tortue: ITortue) => Promise<void>;
    put: (Tortue: ITortue) => Promise<void>;
    delete: (id: number) => Promise<void>;
    
}

export default TortueDao;