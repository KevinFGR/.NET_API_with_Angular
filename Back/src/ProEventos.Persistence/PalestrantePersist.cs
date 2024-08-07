using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext _context;
        public PalestrantePersist(ProEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                               
                                                .Include(p => p.RedesSociais);
            if(includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id ).Where(p => p.User.PrimeiroNome.ToLower().Contains(nome.ToLower()));
            return await query.ToArrayAsync();
        }
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                            
                                            .Include(p => p.RedesSociais);
            if(includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }
            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos =false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                                                    
                                                    .Include(p=>p.RedesSociais);
            if (includeEventos){
                query = query.Include(e => e.PalestrantesEventos).ThenInclude(pe =>pe.Evento);
            }
            query = query.OrderBy(p =>p.Id).Where(p =>p.Id ==palestranteId);
           
            return await query.FirstOrDefaultAsync();
        }


    }
}