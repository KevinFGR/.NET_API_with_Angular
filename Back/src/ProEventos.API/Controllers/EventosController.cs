using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;
using ProEventos.API.Data;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
    private readonly DataContext _context;
    public EventosController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Evento> Get(){
        return _context.Eventos;
    }
    [HttpGet("{id}")]
    public Evento Get(int id){
        return _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);
    }

    [HttpPost]
    public string Post()
    {
        return "valor de retorno metodo post";
    }

    [HttpPut("{id}")]
    public string Put(int id){
        return $"valor de retorno do método put com id => {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id){
            return $"Deletar valor {id}";
    }
}

