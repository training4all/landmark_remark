using System.Threading.Tasks;
using landmark_remark.Data.Entities;

namespace landmark_remark.Data.Repository
{
    public class UserRepositoryAsync : RepositoryAsync<User>, IUserRepositoryAsync  {

        private readonly LandmarkRemarkContext _context;

        public UserRepositoryAsync(LandmarkRemarkContext context): base(context)
        {
            _context = context;
        }

        public async Task<User> GetByNameAsync(string userName)
        {
            return await FirstOrDefaultAsync(w => w.UserName == userName);
        }
    }
}
