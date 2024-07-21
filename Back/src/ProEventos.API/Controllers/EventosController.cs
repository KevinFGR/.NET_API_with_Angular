using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Extensions.Localization;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
    private readonly IEventoService _eventoService;
    private readonly IWebHostEnvironment _hostEnvironment;
    private readonly IAccountService _accountService;

    public EventosController(IEventoService eventoService,
                            IWebHostEnvironment hostEnvironment,
                            IAccountService accountService)
    {
        _hostEnvironment = hostEnvironment;
        _eventoService = eventoService;
        _accountService = accountService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await _eventoService.GetAllEventosAsync(User.GetUserId(), true);
            if (eventos == null) { return NoContent(); }

            return Ok(eventos);

        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error trying to get events. Error{ex.Message}");
        }

    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), id, true);
            if (evento == null) { return NoContent(); }
            return Ok(evento);
        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error trying to get this event.  Error{ex.Message}");
        }
    }

    [HttpGet("{tema}/tema")]
    public async Task<IActionResult> GetByTema(string tema)
    {
        try
        {
            var evento = await _eventoService.GetAllEventosByTemaAsync(User.GetUserId(),tema, true);
            if (evento == null) { return NoContent(); }
            return Ok(evento);
        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error trying to get events. Error{ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model)
    {
        try
        {
            var evento = await _eventoService.AddEvento(User.GetUserId(), model);
            if (evento == null) { return NoContent(); }
            return Ok(evento);
        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Something went wrong whent trying to add this event. Error{ex.Message}");
        }
    }

    [HttpPost("upload-image/{eventoId}")]
    public async Task<IActionResult> PostImage(int eventoId)
    {
        var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), eventoId, true);
        if (evento == null) { return NoContent(); }

        var file = Request.Form.Files[0];
        if (file.Length > 0)
        {
            DeleteImage(evento.ImagemURL);
            evento.ImagemURL = await SaveImage(file);
        }
        var EventoRetorno = await _eventoService.UpdateEvento(User.GetUserId(),eventoId, evento);
        return Ok(EventoRetorno);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        try
        {
            var evento = await _eventoService.UpdateEvento(User.GetUserId(),id, model);
            if (evento == null) { return NoContent(); }
            return Ok(evento);
        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Something went wront while updating this event. Error{ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), id);
            if (evento == null) { return NoContent(); }

            if(await _eventoService.DeleteEvento(User.GetUserId(), id)) {
                DeleteImage(evento.ImagemURL);
                return Ok(new { message = "Deleted" });
            }
            else{ return BadRequest("It wasn't possible to delete this event."); }
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Something went wrong trying to delete this event. Error{ex.Message}");
        }
    }
    
    [NonAction]
    private async Task<string> SaveImage(IFormFile imageFile){
        string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                                            .Take(10).ToArray()).Replace(' ','-');
                                        
        imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

        var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);

        using(var fileStream = new FileStream(imagePath, FileMode.Create)){
            await imageFile.CopyToAsync(fileStream);
        }

        return imageName;
    }
    
    [NonAction]
    private void DeleteImage(string imageName)
    {
        var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);
        if(System.IO.File.Exists(imagePath)){
            System.IO.File.Delete(imagePath);
        }
    }
}

