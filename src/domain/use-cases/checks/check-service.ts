interface CheckServiceUseCase{
    execute( url: string):Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;


export class CheckService implements CheckServiceUseCase{

    //inyeccion de dependencias siempre va en el construnctor en ts, en js seria en un factory function
    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    public async execute( url: string ):Promise<boolean>{

        try {
            const req = await fetch( url );

            if (!req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            this.successCallback(); //ejecuto lo que le paso como funcion..
            return true;
        } catch (error) {
            //console.log( `${ error }, heeee` );

            this.errorCallback( `${ error }` );
            return false;
        }

    }
}