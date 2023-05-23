using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class LGD_Grampanchayat_Block
    {
        [Key]
        public string LocalBodyCode { get; set; }
        public string GrampanchayatName { get; set; }
        public string BlockCode { get; set; }
        public string DistrictCode { get; set; }
    }
}
