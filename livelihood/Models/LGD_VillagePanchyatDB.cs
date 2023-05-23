using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class LGD_VillagePanchyatDB
    {
        [Key]
        public string villagecode { get; set; }
        public string DistrictCode { get; set; }
        public string localbodycode { get; set; }
        public string villagename { get; set; }
    }
}
