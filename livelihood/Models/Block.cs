using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class Block
    {
        [Key]
        public string BlockCode { get; set; }
        public string BlockNameinEnglish { get; set; }
        public string DistrictCode { get; set; }
    }
}
