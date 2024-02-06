import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//No se puede instanciar una clase abstracta
//Cualquier clase que implemente LodDataSource, tiene que tener las caracteristica de la misma.

export abstract class LogRepository {
    
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}