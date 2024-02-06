import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);



export class Server{

    public static start(){
        console.log('Server started...');

        //paquete "cron" adaptado y expuesto con un metodo static
        //puedo crear varios jobs jiji
        CronService.createJob(
            '*/10 * * * * *', 
            () => {
                // const date = new Date();
                // console.log('Cada 30 segundos',date);

                const url:string = 'https://www.google.com';
                //const url:string = 'http://localhost:3000';

                //el CheckService recibe 3 parametros, el 2do y 3ro son opcionales.. o sea que
                //puedo pasarle undefined... Asi lo defini en la clase.

                new CheckService( 
                    fileSystemLogRepository,
                    () => console.log(`${ url } esta funcionando`),

                    //el parametro de la funcion puedo nombrarlo como quiero.
                    ( error ) => console.log( error ) 
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000/' );
            }
        );
        
        

        

    }
}