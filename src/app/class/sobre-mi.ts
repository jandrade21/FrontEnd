export interface Welcome {
    id:          number;
    empresa:     string;
    actual:      boolean;
    inicio:      Date;
    fin:         Date;
    descripcion: string;
    persona:     Persona;
    usuario:     Usuario;
}

export interface Persona {
    id:        number;
    nombre:    string;
    apellido:  string;
    fecha_nac: Date;
    telefono:  string;
    correo:    string;
    sobre_mi:  string;
    url_img:   string;
    usuario:   Usuario;
    domicilio: Domicilio;
}

export interface Domicilio {
    id:     number;
    calle:  string;
    numero: number;
}

export interface Usuario {
    id:       number;
    username: string;
    email:    string;
    password: string;
}
