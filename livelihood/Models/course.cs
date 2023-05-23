using System.ComponentModel.DataAnnotations;

namespace livelihood.Models
{
    public class course
    {
       [Key]
        public string coursecode { get; set; }
        public string coursename { get; set; }
    }
}
