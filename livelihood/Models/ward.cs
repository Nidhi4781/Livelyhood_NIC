using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class ward
    {
        [Key]
        public string WardCode { get; set; }
        public string LocalBodyCode { get; set; }
        public string WardName { get; set; }
    }
}
