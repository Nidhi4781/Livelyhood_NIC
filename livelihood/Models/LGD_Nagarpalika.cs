using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class LGD_Nagarpalika
    {
        [Key]
        public string LocalBodyCode { get; set; }
        public string LocalBodyNameinEnglish { get; set; }
        public string distcode { get; set; }
    }
}
