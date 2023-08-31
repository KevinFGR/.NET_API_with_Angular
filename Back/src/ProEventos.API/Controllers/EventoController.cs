using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{
    public IEnumerable<Evento> _evento = new Evento[]{
        new Evento(){
            EventoId = 1,
            Tema = "Angular e .NET Core",
            Lote = "1º Lote",
            Local = "Belo Horizonte - MG",
            QtdPessoas = 250,
            DataEvento = DateTime.Now.AddDays(2).ToString("DD/MM/YYYY"),
            ImagemURL = "imagem.jpg"
        },
        new Evento(){
            EventoId = 2,
            Tema = "Angular e suas novidades",
            Local = "São Paulo",
            Lote = "2º Lote",
            QtdPessoas = 1000,
            DataEvento = DateTime.Now.AddDays(5).ToString("DD/MM/YYY"),
            ImagemURL = "foto.png"
        }
    };

    public EventoController()
    {
        
    }

    [HttpGet]
    public IEnumerable<Evento> Get(){
        return _evento;
    }
    [HttpGet("{id}")]
    public IEnumerable<Evento> Get(int id){
        return _evento.Where(evento => evento.EventoId == id);
    }

    [HttpPost]
    public string post()
    {
        return "valor de retorno metodo post";
    }

    [HttpPut("{id}")]
    public string put(int id){
        return $"valor de retorno do método put com id => {id}";
    }

    [HttpDelete("{id}")]
    public string delete(int id){
            return $"Deletar valor {id}";
    }
}

