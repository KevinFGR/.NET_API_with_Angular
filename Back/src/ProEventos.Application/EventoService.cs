﻿using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;
public class EventoService : IEventoService
{
    private readonly IGeralPersist _geralPersist;
    private readonly IEventoPersist _eventoPersist;
    private readonly IMapper _mapper;
    public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist, IMapper mapper)
    {
        _eventoPersist = eventoPersist;
        _geralPersist = geralPersist;
        _mapper = mapper;
    }

    public async Task<EventoDto> AddEvento(int userId, EventoDto model)
    {
        try
        {
            var eventoMapeado = _mapper.Map<Evento>(model);
            eventoMapeado.UserId = userId;
            _geralPersist.Add<Evento>(eventoMapeado);
            if (await _geralPersist.SaveChangesAsync())
            {
                var eventoReturn = await _eventoPersist.GetEventoByIdAsync(userId, eventoMapeado.Id, false);
                return  _mapper.Map<EventoDto>(eventoReturn);
            }
            return null;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> UpdateEvento(int userId, int eventoId, EventoDto model)
    {
        try
        {
            var evento = await _eventoPersist.GetEventoByIdAsync(userId, eventoId, false);
            if (evento == null) { return null; }

            model.Id = evento.Id;
            model.UserId = userId;

            _mapper.Map(model, evento);

            _geralPersist.Update<Evento>(evento);
            if (await _geralPersist.SaveChangesAsync())
            {
                var eventoReturn = await _eventoPersist.GetEventoByIdAsync(userId, evento.Id, false);
                return _mapper.Map<EventoDto>(eventoReturn);
            }
            return null;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }
    public async Task<bool> DeleteEvento(int userId, int eventoId)
    {
        try
        {
            var evento = await _eventoPersist.GetEventoByIdAsync(userId, eventoId, false);
            if (evento == null) { throw new Exception("Evento para Delete não encontrado."); }

            _geralPersist.Delete(evento);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto[]> GetAllEventosAsync(int userId, bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosAsync(userId, includePalestrantes);
            if (eventos == null) { return null; }

            var eventosReturn = _mapper.Map<EventoDto[]>(eventos);
            
            return eventosReturn;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosByTemaAsync(userId, tema, includePalestrantes);
            if (eventos == null) { return null; }

            var eventosReturn = _mapper.Map<EventoDto[]>(eventos);
            
            return eventosReturn;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false)
    {
        try
        {
            var evento = await _eventoPersist.GetEventoByIdAsync(userId, eventoId, includePalestrantes);
            if (evento == null) { return null; }

            var eventoReturn = _mapper.Map<EventoDto>(evento);

            return eventoReturn;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }

    }

}
