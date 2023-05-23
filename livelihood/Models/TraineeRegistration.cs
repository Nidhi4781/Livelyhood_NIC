using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace livelihood.Models
{
    public class TraineeRegistration
    {
        [Key]
        public int? srno { get; set; }
        public string? uniquetempsno { get; set; }
        [DisplayName("District")]
        [Required(ErrorMessage = "Please select District")]
        public string? Dist { get; set; }
        [DisplayName("Livelihood College")]
        [Required(ErrorMessage = "Please select Livelihood College Name")]
        public string? LCCode { get; set; }
        [DisplayName("Course (Which are Approved by State for Concerned")]
        [Required(ErrorMessage = "Please select Course")]
        public string? coursecode { get; set; }
        [DisplayName("Trainee Name")]
        [StringLength(40, MinimumLength = 3)]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-_]*$", ErrorMessage = "Use Characters only")]
        [Required(ErrorMessage = "Trainee Name is Required")]
        public string? Traineename { get; set; }
        [DisplayName("Father Name")]
        [StringLength(40, MinimumLength = 3)]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-_]*$", ErrorMessage = "Use Characters only")]
        [Required(ErrorMessage = "Father Name is Required")]
        public string? Fname { get; set; }
        [DisplayName("Contact Number")]
        [Required(ErrorMessage = "Contact Number is Required")]
        [MaxLength(10)]
        [MinLength(10)]
        [RegularExpression("([0-9]+)", ErrorMessage = "Contact Number must be numeric")]
        public string? Contactno { get; set; }
        [Required(ErrorMessage = "Email is Required")]
        public string? Email { get; set; }
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "Gender is Required")]
        public string? Gender { get; set; }
        [DisplayName("Whether Divyang")]
        [Required(ErrorMessage = "Please select Whether Divyang")]
        public string? IsDivyang { get; set; }
        [Required(ErrorMessage = "Please select Category")]
        public string? Category { get; set; }
        [Required(ErrorMessage = "Address is Required")]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-_]*$", ErrorMessage = "Use Characters only")]
        [StringLength(100, MinimumLength = 7)]
        public string? Address { get; set; }
        [DisplayName("District")]
        [Required(ErrorMessage = "Address District is Required")]
        public string? AddDist { get; set; }
        [DisplayName("Block")]
        [Required(ErrorMessage = "Block is Required")]
        public string? AddBlock { get; set; }
        [DisplayName("State")]
        public string? AddState { get; set; }
        [DisplayName("Urban/Rural")]
        [Required(ErrorMessage = "Urban/Rural is Required")]
        public string? UrbanRural { get; set; }
        public string? City { get; set; }
        public string? Ward { get; set; }
        [DisplayName("Gram Panchayat")]
        public string? GramPanchayat { get; set; }
        public string? Gram { get; set; }
        [DisplayName("Vidhan Sabha")]
        [Required(ErrorMessage = "Vidhan Sabha is Required")]
        public string? VidhanSabha { get; set; }
        [Required(ErrorMessage = "Education is Required")]
        public string? Education { get; set; }
        [Required(ErrorMessage = "Pincode is Required")]
        [MaxLength(6)]
        [MinLength(6)]
        [RegularExpression("([0-9]+)", ErrorMessage = "Pincode must be numeric")]
        public string? PinCode { get; set; }
        [DisplayName("Working Status")]
        [Required(ErrorMessage = "Working Status is Required")]
        public string? WorkingStatus { get; set; }
        [DisplayName("Work Type")]
        public string? WorkType { get; set; }
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-_]*$", ErrorMessage = "Use Characters only")]
        [StringLength(70, MinimumLength = 4)]
        public string? WorkTypeDetails { get; set; }
        [DisplayName("Source of Information about the programme")]
        [Required(ErrorMessage = "Source of Information is Required")]
        public string? SourceOfInformation { get; set; }
        [DisplayName("Reason for applying the Livelihood Development Program")]
        [Required(ErrorMessage = "Reason for applying is Required")]
        [RegularExpression(@"^[a-zA-Z]+[ a-zA-Z-_]*$", ErrorMessage = "Use Characters only")]
        [StringLength(100, MinimumLength = 7)]
        public string? applyreason { get; set; }
        [DisplayName("Declaration")]
        [Required(ErrorMessage = "Declaration is Required")]
        public string? isDeclaration { get; set; }
        public DateTime? insertDatetime { get; set; }
        public string? freshApplication_APOStatus { get; set; }
        public string? apoAction { get; set; }
        public string? remark { get; set; }
        public DateTime? apoActionDate { get; set; }
    }

}
