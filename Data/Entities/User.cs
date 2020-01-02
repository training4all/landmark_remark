using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace landmark_remark.Data.Entities
{
    public class User: BaseEntity
    {
        [Key]
        [Required]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6), MaxLength(10)]
        public string Password { get; set; }

        [Required]
        [MaxLength(20)]
        public string FirstName { get; set; }

        [MaxLength(20)]
        public string LastName { get; set; }

        public virtual ICollection<Marker> Markers { get; set; }
    }
}
