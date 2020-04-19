import { Geoposition } from '@ionic-native/geolocation/ngx';

export class FlareUp{
    nomeLider: string;
    telefone: number;
    email: string;
    nomeIgreja: string;
    nomeEscola: string;
    endereco: string;
    flareUpId: string;
    status:string = 'pendente';
    geolocation: Geoposition
}