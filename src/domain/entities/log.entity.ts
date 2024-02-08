
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel,
    message: string,
    origin: string,
    createdAt?: Date,
}

export class LogEntity {
    
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ){
        //createdAt es opcional.. lo defini en la interface con el simbolo ?.. si no lo recibo como parametro entonces
        //se creara por defecto con el new Date()
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse( json );

        const log = new LogEntity( {
            message,
            level,
            createdAt,
            origin,
        } );

        //log.createdAt = new Date( createdAt ); ya no lo necesito porque lo recibo como parametro.
        
        
        return log;
    }
}