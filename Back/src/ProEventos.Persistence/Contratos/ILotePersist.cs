using ProEventos.Domain;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        ///<summary>
        /// This GET method will return a list of lots by eventId.
        ///</summary>
        ///<param name="eventoId">Primary Key of Event table</param>
        ///<returns>Lots Array</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);

        ///<summary>
        /// This GET method will return just 1 lot.
        ///</summary>
        ///<param name="eventoId">Primary Key of Event table</param>
        ///<param name="loteId">Primary Key of Lot table</param>
        ///<returns>1 lot</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}