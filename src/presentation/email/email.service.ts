import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

//todo: attachement

export class EmailService{

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
        //private readonly logRepository: LogRepository, //
    ){}

    async sendEmail( options: SendMailOptions ):Promise<boolean> {
        //si no recibo attachement, por defecto sera un arreglo vacio
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            console.log( sentInformation );

            // const log = new LogEntity({
            //     level:LogSeverityLevel.low,
            //     message: 'Email sent',
            //     origin: 'email.service.ts',
            // }); ya no lo ocupo

            // this.logRepository.saveLog(log); comente la inyeccion

            return true;
        } catch (error) {

            // const log = new LogEntity({
            //     level:LogSeverityLevel.high,
            //     message: 'Email not sent',
            //     origin: 'email.service.ts',
            // }); ya no lo ocupo.

            //this.logRepository.saveLog(log); comente la inyeccion
            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
                <h3>Logs de sistema - NOC</h3>
                <p>Ad do commodo incididunt ea ad ex dolore mollit cillum Lorem ex duis exercitation ad. Exercitation ipsum exercitation et excepteur aliquip labore quis aliqua sunt elit. Eiusmod cupidatat irure id consectetur veniam dolor sint aute laborum minim duis. Laborum adipisicing et exercitation est aliqua nostrud ex est proident duis laborum aute. Exercitation nulla occaecat velit veniam consequat laboris.</p>
                <p>Ver logs adjuntos</p>
            `;

        const attachments:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            attachments,to,subject,htmlBody
        });
    }

}