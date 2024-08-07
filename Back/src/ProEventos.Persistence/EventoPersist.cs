using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;
        public EventoPersist(ProEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes =false)
        {
            IQueryable<Evento> query = _context.Eventos
                                        .Include(e => e.Lotes) 
                                        .Include(e => e.RedesSociais);
            
            if(includePalestrantes){
                query = query.Include(e => e.PalestrantesEventos)
                                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id).Where(e=>e.Tema.ToLower().Contains(tema.ToLower())
                                                    && e.UserId == userId);
            return await query.ToArrayAsync();
        }
        public async Task<Evento[]> GetAllEventosAsync(int userId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                                        .Include(e => e.Lotes) 
                                        .Include(e => e.RedesSociais);
            
            if(includePalestrantes)
            {
                query = query
                            .Include(e => e.PalestrantesEventos)
                            .ThenInclude(pe => pe.Palestrante);
            }

            query = query.Where(e => e.UserId == userId).OrderBy(e => e.Id);
            return await query.ToArrayAsync();

        }
        public async Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes =false)
        {
            IQueryable<Evento> query = _context.Eventos
                                        .Include(e => e.Lotes) 
                                        .Include(e => e.RedesSociais);
            
            if(includePalestrantes){
                query = query.Include(e => e.PalestrantesEventos)
                                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Id == eventoId && e.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }
    }
}