import { tipo_empleo } from "./tipo_empleo";
export class Experiencia {
    id!:        number;
    empresa!:    string;
    actual!:    Boolean
    fechaInicio!:  Date;
    FechaFin!:    Date ;
    descripcion!: String;
    imagen!:  string;
    empleo_tipo!:tipo_empleo[];
    
}