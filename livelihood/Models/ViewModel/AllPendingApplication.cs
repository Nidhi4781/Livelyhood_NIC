
using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class AllPendingApplication
    {
        [Key]
        public string coursecode { get; set; }
        public string coursename { get; set; }
        public int totalApplication { get; set; }
        public string? Dist { get; set; }


    }
}
