import { Evento } from "./Evento";

export interface Lote {
     id : Number;
     nome : Text;
     preco : Number;
     dataInicio? : Date;
     dataFim? : Date;
     quantidade : Number;
     eventoId : Number;
     evento : Evento;
}
