using System.ComponentModel.DataAnnotations.Schema;

namespace landmark_remark.Data.Entities
{
    public class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }
}
