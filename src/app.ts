import { envs } from './config/plugins/envs.plugin';
import { /*LogModel,*/ MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';


(async () => {
    main();
})();



async function main()  {
    
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    //Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin: 'app.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // const logs = await LogModel.find();
    // console.log(logs[0].message);

    Server.start();
}