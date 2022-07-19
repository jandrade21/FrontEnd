import { tipo_edu } from "./tipo_edu";
export class Educacion {
    id!:        number;
    escuela!:    string;
    titulo!:  string;
    inicio!:  Date;
    fin!:    Date ;
    imagen!:  string;
    educacion_tipo!:tipo_edu[];
}
