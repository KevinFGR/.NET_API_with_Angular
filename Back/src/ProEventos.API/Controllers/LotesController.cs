using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LotesController : ControllerBase
{
    private readonly ILoteService _loteService;

    public LotesController(ILoteService loteService, IEventoService eventoService)
    {
        _loteService = loteService;
    }

    [HttpGet("{eventoId}")]
    public async Task<IActionResult> Get(int eventoId)
    {
        try
        {
            var lotes = await _loteService.GetLotesByEventoIdAsync(eventoId);
            if (lotes ==null)
            {
                return NoContent();
            }

            return Ok(lotes);

        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Error trying to get lots. Error{ex.Message}");
        }

    }

    [HttpPut("{eventoId}")]
    public async Task<IActionResult> SaveLotes(int eventoId, LoteDto[] models)
    {
        try
        {
            var lotes = await _loteService.SaveLotes(eventoId, models);
            if (lotes ==null)
            {
                return NoContent();
            }
            return Ok(lotes);

        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Something went wrong while saving lots. Error{ex.Message}");
        }    
    }

    [HttpDelete("{eventoId}/{loteId}")]
    public async Task<IActionResult> Delete(int eventoId,int loteId)
    {
        try
        {
            var lote = await _loteService.GetLoteByIdsAsync(eventoId, loteId);
            if(lote == null){
                return NoContent();
            }
            return await _loteService.DeleteLote(eventoId, loteId) ? Ok(new{message = "Lot Deleted"}) :
                BadRequest("It wasn't possible to delete this Lot.");
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            $"Something went wrong trying to delete this Lot. Error{ex.Message}");
        }
    }
}

