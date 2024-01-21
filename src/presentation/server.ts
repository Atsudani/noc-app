import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";





export class Server{

    public static start(){
        console.log('Server started...');

        //paquete "cron" adaptado y expuesto con un metodo static
        //puedo crear varios jobs jiji
        CronService.createJob(
            '*/1 * * * * *', 
            () => {
                // const date = new Date();
                // console.log('Cada 30 segundos',date);
                const url:string = 'https://www.google.com';
                new CheckService(
                    () => console.log(`${ url } esta funcionando`),
                    ( error ) => console.log( error ) //el parametro de la funcion puedo nombrarlo como quiero.
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000/' );
            }
        );
        
        

        

    }
}