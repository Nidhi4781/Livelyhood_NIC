using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using livelihood.Models;
using livelihood.Models.ViewModel;

namespace livelihood.DataContext
{
    public class LCDataContext : DbContext
    {
        public LCDataContext()
        {
        }

        public LCDataContext(DbContextOptions<LCDataContext> options) : base(options)
        {

        }
        public DbSet<userLevel> userLevel { get; set; }
        public DbSet<VTP_Model> VTP_Master { get; set; }
        public DbSet<course> course { get; set; }
        public DbSet<Dist_Model> LGD_Dist { get; set; }
        public DbSet<TraineeRegistration> TraineeRegistration { get; set; }
        public DbSet<Block> LGD_Block { get; set; }
        public DbSet<LGD_Nagarpalika> LGD_Nagarpalika { get; set; }
        public DbSet<LGD_Grampanchayat_Block> LGD_Grampanchayat_Block { get; set; }
        public DbSet<ward> LGD_Ward { get; set; }
        public DbSet<LGD_VillagePanchyatDB> LGD_VillagePanchyatDB { get; set; }
        public DbSet<VidhanSabha> VidhanSabha { get; set; }
        public DbSet<Education> Education { get; set; }
        public DbSet<AllPendingApplication> AllPendingApplication { get; set; }
    }
}
