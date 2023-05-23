using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class Education
    {
        [Key]
        public string code { get; set; }
        public string name { get; set; }
    }
}
