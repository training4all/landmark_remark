using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using landmark_remark.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace landmark_remark.Data.Repository
{
    public class RepositoryAsync<T> : IRepositoryAsync<T> where T: BaseEntity
    {
        private readonly LandmarkRemarkContext _context;

        public RepositoryAsync(LandmarkRemarkContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(string id)
        {
            int.TryParse(id, out int localId);
            return await _context.Set<T>().FindAsync(localId);
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<BaseEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }
    }
}
