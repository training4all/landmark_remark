using System.Threading.Tasks;
using landmark_remark.Data.Entities;

namespace landmark_remark.Data.Repository
{
    public interface IUserRepositoryAsync: IRepositoryAsync<User>
    {
        Task<User> GetByNameAsync(string userName);
    }
}
