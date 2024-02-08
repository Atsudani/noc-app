import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const emailService = new EmailService();


export class Server{

    public static start(){
        console.log('Server started...');

        //Mandar email
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['informatica@copirapo.com.py', 'michu.geminis@gmail.com']
        );
        
        // emailService.sendEmailWithFileSystemLogs(
        //     ['informatica@copirapo.com.py', 'michu.geminis@gmail.com']
        // );

        // const emailService = new EmailService(
        //     fileSystemLogRepository
        // );
        // emailService.sendEmailWithFileSystemLogs(
        //     ['informatica@copirapo.com.py', 'michu.geminis@gmail.com']
        // );


        // emailService.sendEmail({
        //     to: 'informatica@copirapo.com.py',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>Ad do commodo incididunt ea ad ex dolore mollit cillum Lorem ex duis exercitation ad. Exercitation ipsum exercitation et excepteur aliquip labore quis aliqua sunt elit. Eiusmod cupidatat irure id consectetur veniam dolor sint aute laborum minim duis. Laborum adipisicing et exercitation est aliqua nostrud ex est proident duis laborum aute. Exercitation nulla occaecat velit veniam consequat laboris.</p>
        //         <p>Ver logs adjuntos</p>
        //     `
        // });

        //paquete "cron" adaptado y expuesto con un metodo static
        //puedo crear varios jobs jiji

        // CronService.createJob(
        //     '*/1 * * * * *', 
        //     () => {
        //         // const date = new Date();
        //         // console.log('Cada 30 segundos',date);

        //         // const url:string = 'https://www.google.com';
        //         const url:string = 'http://localhost:3000';

        //         //el CheckService recibe 3 parametros, el 2do y 3ro son opcionales.. o sea que
        //         //puedo pasarle undefined... Asi lo defini en la clase.

        //         new CheckService( 
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } esta funcionando`),

        //             //el parametro de la funcion puedo nombrarlo como quiero.
        //             // ( error ) => console.log( error )
        //             console.log //cuando recibo un parametro y lo paso como parametro, puedo resumir de esta manera 
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000/' );
        //     }
        // );
        
        

        

    }
}