using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace livelihood.Models
{    
    public class userLevel
    {
        
        [Key]
        [Display(Name = "User ID")]
        [Required(ErrorMessage = "Username Required")]
        public string userID { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Password Required")]
        public byte[] password { get; set; }

        public string userDetail { get; set; }
        public string distcode { get; set; }
    }
}
