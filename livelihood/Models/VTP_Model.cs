using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace livelihood.Models
{
    public class VTP_Model
    {

        [Key]
        public string main_VTPRegNo { get; set; }
        public string Is_VTPType { get; set; }
        public string VTPRegNo { get; set; }
        public string VTPName { get; set; }
        public string address { get; set; }
        public string District { get; set; }
    }
}
