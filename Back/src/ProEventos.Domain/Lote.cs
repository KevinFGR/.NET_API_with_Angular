// using System.ComponentModel.DataAnnotations.Schema;

namespace ProEventos.Domain
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int Quantidade { get; set; }

        // If the Database tables are deferent than the models classes, you already have to especificatethe ForeignKey 
        // [ForeignKey("TableName")] 
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}