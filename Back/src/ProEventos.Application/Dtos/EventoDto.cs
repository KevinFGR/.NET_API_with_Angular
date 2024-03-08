using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id {get; set;}

        [Required]
        public string Local{get;set;}

        public DateTime? DataEvento{get;set;}

        [Required(ErrorMessage ="You have to set a {0} to your event"),
        StringLength(50, MinimumLength = 4, ErrorMessage = "{0} need at least 4 character and less than 50")
        // MaxLength(50),
        // MinLength(4),
        ]
        public string Tema{get;set;}

        [Display(Name ="People  quantity"),
        Required,
        Range(1,120000, ErrorMessage ="{0} has to be between 1 and 120.000")]
        public int QtdPessoas{get;set;}

        // In case of having problens on this validation check "spaces" ' ' between the "or" expression '|'
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
            ErrorMessage ="this URL is invalid for an image URL. it must be finished by .jpg, .jpeg, .png, .gif or .bmp")]
        public string ImagemURL{get;set;}

        [Phone]
        public string Telefone{get;set;}

        [EmailAddress]
        public string Email{get;set;}
        public IEnumerable<LoteDto> Lotes{get;set;}
        public IEnumerable<RedeSocialDto>RedesSociais{get;set;}
        public IEnumerable<PalestranteDto>Palestrantes{get;set;}   
    }
}