using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using landmark_remark.Data.Entities;
using System.Linq.Expressions;

namespace landmark_remark.Data.Repository
{
    public interface IRepositoryAsync<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAsync();

        Task<T> GetByIdAsync(string id);

        Task AddAsync(T entity);

        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    }
}
