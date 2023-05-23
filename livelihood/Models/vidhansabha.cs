using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class VidhanSabha
    {
        [Key]
        public string ConstituenyNumber { get; set; }
        public string ConstituenyName { get; set; }
        public string DistCode { get; set; }
    }
}
