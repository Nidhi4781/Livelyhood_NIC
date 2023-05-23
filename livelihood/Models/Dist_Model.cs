using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class Dist_Model
    {
        [Key]
        public string DistrictCode { get; set; }
        public string DistrictNameEnglish { get; set; }
    }
}
