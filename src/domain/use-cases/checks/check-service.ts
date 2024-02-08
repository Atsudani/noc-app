import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute( url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined; //para que sea opcional
type ErrorCallback = (( error: string ) => void) | undefined; //para que sea opcional


export class CheckService implements CheckServiceUseCase{

    //inyeccion de dependencias siempre va en el construnctor en ts, en js seria en un factory function
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    public async execute( url: string ):Promise<boolean>{

        try {
            const req = await fetch( url );

            if (!req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            const log  = new LogEntity({
                message:`Service ${ url } working`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts',
            });

            this.logRepository.saveLog( log );
            
            //ejecuto lo que le paso como funcion.. si el parametro existe, ejecuto
            this.successCallback && this.successCallback(); 

            return true;
        } catch (error) {
            const errorString = `${ url } is not ok. ${ error }`;
            const log = new LogEntity({
                message: errorString, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            });
            this.logRepository.saveLog( log );

            //ejecuto lo que le paso como funcion.. si el parametro existe, ejecuto
            this.errorCallback && this.errorCallback( `${ errorString }` );

            return false;
        }

    }
}