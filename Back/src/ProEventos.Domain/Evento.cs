// using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;
using ProEventos.Domain.Identity;

namespace ProEventos.Domain

{
    // Use this in case the Database has a diferent name of the model class.
    // [Table("TableName")] 
    public class Evento
    {
        // It culd be necessary if you dont use Id as the name of you PrimaryKey
        // [Key] 
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }
        
        // Use NotMapped in case you have a field tha will be not created in the DataBase.
        // [NotMapped]
        // public int Field_test { get; set; }
    }
}