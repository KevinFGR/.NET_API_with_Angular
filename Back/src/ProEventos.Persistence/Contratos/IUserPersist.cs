using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence.Contratos
{
    public interface IUserPersist : IGeralPersist
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(string id);
        Task<User> GetUserByUserNameAsync(string username);
    }
}