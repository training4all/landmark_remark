using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using landmark_remark.Data.Entities;
using landmark_remark.Data.Repository;
using landmark_remark.Models;

namespace landmark_remark.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepositoryAsync _repo;

        public UsersController(IUserRepositoryAsync repo)
        {
            _repo = repo;
        }

        // GET: api/Users/user_name
        [HttpGet("{userName}")]
        public async Task<ActionResult<User>> GetUser(string userName)
        {
            var user = await _repo.GetByNameAsync(userName);
         
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Route("Authenticate")]
        [HttpPost]
        public async Task<ActionResult<User>> PostAsync(UserDto newUser)
        {
            var user = await _repo.FirstOrDefaultAsync(u => u.UserName == newUser.UserName && u.Password == newUser.Password);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/Users
        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUserAsync(User user)
        {
            try
            {
                await _repo.AddAsync(user);
            }
            catch (DbUpdateException)
            {
                if (await UserExistsAsync(user.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { userName = user.UserName }, user);
        }

        private async Task<bool> UserExistsAsync(string userName)
        {
            var user = await _repo.GetByNameAsync(userName);
            return user != null;
        }
    }
}
