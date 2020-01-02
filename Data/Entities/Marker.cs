using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace landmark_remark.Data.Entities
{
    public class Marker: BaseEntity
    {
        public string UserName { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        [MaxLength(50)]
        public string Description { get; set; }

        [ForeignKey("UserName")]
        public virtual User User { get; set; }
    }
}
