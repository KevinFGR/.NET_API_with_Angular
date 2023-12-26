import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
    // criando um domain(model) para o front
      id : number;
      local : String;
      dataEvento? : Date;
      tema : String;
      qtdPessoas : number;
      imagemURL : String;
      telefone : String;
      email : String;
      lotes : Lote[];
      redesSociais : RedeSocial[];
      palestrantesEventos : Palestrante[];
}
