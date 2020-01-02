using landmark_remark.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace landmark_remark.Data
{
    public class LandmarkRemarkContext : DbContext
    {
        public LandmarkRemarkContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Marker> Markers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                FirstName = "admin",
                LastName = "admin",
                UserName = "sa",
                Password = "sa"
            });

            modelBuilder.Entity<Marker>().HasData(new Marker { 
                Id = 1,
                Longitude = 138.601519,
                Latitude = -34.890128,
                Description = "Welcome to Adelaide !!!",
                UserName = "sa"
            });
            modelBuilder.Entity<Marker>().HasData(new Marker
            {
                Id = 2,
                Longitude = 144.744625,
                Latitude = -36.146321,
                Description = "Welcome to Echucca !!!",
                UserName = "sa"
            });


            modelBuilder.Entity<Marker>()
                .HasKey(m => m.Id)
                .HasName("PK_Markers_Id");

        }
    }
}
