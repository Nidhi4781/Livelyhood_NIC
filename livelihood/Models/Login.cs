using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace livelihood.Models
{
    public class Login
    {
        [Display(Name = "User ID")]
        [Required(ErrorMessage = "Username Required")]
        public string userid { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Password Required")]
        public string password { get; set; }
    }
}
