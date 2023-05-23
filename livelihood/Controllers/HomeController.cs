using DNTCaptcha.Core;
using livelihood.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

using livelihood.DataContext;
using livelihood.AppCode;
using System.Web;
using System.Text;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using livelihood.Models.ViewModel;

namespace livelihood.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IDNTCaptchaValidatorService _validatorService;
        private readonly DNTCaptchaOptions _captchaOptions;
        private readonly IConfiguration configuration;
        private readonly LCDataContext _dbcon;

        //public HomeController(LCDataContext dbcon)
        //{
        //    _dbcon = dbcon;
        //}

        public HomeController(ILogger<HomeController> logger, IDNTCaptchaValidatorService validatorService, IOptions<DNTCaptchaOptions> captchaOptions, IConfiguration config, LCDataContext dbcon)
        {

            _logger = logger;
            _validatorService = validatorService;
            _captchaOptions = captchaOptions == null ? throw new ArgumentException(nameof(captchaOptions)) : captchaOptions.Value;
            _dbcon = dbcon;

        }
        public void loaddist()
        {
            try
            {
                List<Dist_Model> distdatas = new List<Dist_Model>();
                distdatas = _dbcon.LGD_Dist.ToList();
                distdatas.Insert(0, new Dist_Model { DistrictCode = "", DistrictNameEnglish = "-- Select --" });
                ViewBag.Distdata = distdatas;
            }
            catch (Exception ex)
            {

            }
        }
        public void loadEdu()
        {
            try
            {
                List<Education> objEducation = new List<Education>();
                objEducation = _dbcon.Education.ToList();
                objEducation.Insert(0, new Education { code = "", name = "-- Select --" });
                ViewBag.Edudata = objEducation;
            }
            catch (Exception ex)
            {

            }
        }
        public void loadCourse()
        {
            try
            {
                List<course> coursedatas = new List<course>();
                coursedatas = _dbcon.course.ToList();
                coursedatas.Insert(0, new course { coursecode = "", coursename = "-- Select --" });
                ViewBag.coursedata = coursedatas;
            }
            catch (Exception ex)
            {

            }
        }


        public void TotalLC()
        {
            var obj = (_dbcon.VTP_Master.Where(x => x.Is_VTPType == "1")).Count();
            ViewData["TotalLC"] = obj.ToString();
        }
        public void TotalCerti()
        {
            //var Track = (from o in _dbcon.VTP_Master
            //             join i in _dbcon.cartificatestest
            //             on o.main_VTPRegNo equals i.VTPRegNo
            //             where o.Is_VTPType == "1"
            //             select new
            //             {
            //                 tempsno = i.tempsno,
            //                 VTPRegNo = i.VTPRegNo,
            //                 CandidateRegNo = i.CandidateRegNo,
            //                 AssessmentBatchNo = i.AssessmentBatchNo
            //             }).Count();
            //ViewData["TotalCertified"] = Track.ToString();
        }

        public void TotalRegister()
        {
            //var Track = (from o in _dbcon.VTP_Master
            //             join i in _dbcon.batch
            //             on o.main_VTPRegNo equals i.vtpregno
            //             where o.Is_VTPType == "1"
            //             select new
            //             {
            //                 tempsno = i.tempsno,

            //             }).Count();
            //ViewData["TotalReg"] = Track.ToString();
        }
        public void Totalcourse()
        {
            //var Track = (from o in _dbcon.VTP_Master
            //             join i in _dbcon.VTP_Course
            //             on o.main_VTPRegNo equals i.vtpregno
            //             where o.Is_VTPType == "1"
            //             select new
            //             {
            //                 vtpregno = i.vtpregno,

            //             }).Count();
            //ViewData["Totalcourse"] = Track.ToString();
        }

        public void TotalPlaced()
        {
            //var Track = (from o in _dbcon.VTP_Master
            //             join i in _dbcon.EmployeeDetails
            //             on o.VTPRegNo equals i.DataInserted_by
            //             where i.IsActive == "1"
            //             select new
            //             {
            //                 CanRollNo = i.CanRollNo

            //             }).Count();
            //ViewData["Totalplaced"] = Track.ToString();
        }

        public void TotalUnderTraining()
        {

            //var Track = (from o in _dbcon.VTP_Master
            //             join i in _dbcon.batch
            //             on o.main_VTPRegNo equals i.vtpregno
            //             //where
            //             //i.tempsno== "198ea53c8022"
            //             // && DateTime.Now >= DateTime.Parse(i.dateCommencementTraining)
            //             //&& DateTime.Now <= DateTime.Parse(i.dateCompletionTraining)
            //             select new
            //             {
            //                 //sdate= i.dateCommencementTraining.ToString(),
            //                 //edate = i.dateCompletionTraining.ToString(),
            //                 vtpregno = i.vtpregno.ToString()

            //             }).Count();
            //ViewData["TotalUnder"] = Track.ToString();
        }
        public IActionResult Index()
        {
            TotalLC();
            TotalCerti();
            TotalRegister();
            Totalcourse();
            TotalPlaced();
            TotalUnderTraining();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult About()
        {
            ViewBag.Message = "About Livelihood College";
            return View();
        }

        public IActionResult Acts()
        {
            ViewBag.Message = "Your Act & Rules page.";

            return View();
        }
        public IActionResult Registration()
        {
            loaddist();
            loadCourse();
            getgender();
            loadEdu();
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SaveRegistration(TraineeRegistration m)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //if (m.ID == 0)
                    //{
                    Random r = new Random();
                    int ran = r.Next(10000);
                    string _uniquetempsno = "";
                    _uniquetempsno = DateTime.Now.ToString().GetHashCode().ToString("x") + ran.ToString();

                    TraineeRegistration trainee = new TraineeRegistration();

                    trainee.uniquetempsno= _uniquetempsno;  
                    trainee.insertDatetime = DateTime.Now; ;  
                    trainee.Dist= m.Dist;  
                    trainee.LCCode= m.LCCode;  
                    trainee.coursecode = m.coursecode;  
                    trainee.Traineename = m.Traineename;  
                    trainee.Fname = m.Fname;  
                    trainee.Contactno = m.Contactno;  
                    trainee.Email = m.Email;  
                    trainee.Gender = m.Gender;  
                    trainee.IsDivyang = m.IsDivyang;  
                    trainee.Category = m.Category;  
                    trainee.Address = m.Address;  
                    trainee.AddDist = m.AddDist;  
                    trainee.AddBlock = m.AddBlock;  
                    trainee.AddState = m.AddState;  
                    trainee.UrbanRural = m.UrbanRural;  
                    trainee.City = m.City;  
                    trainee.Ward = m.Ward;  
                    trainee.GramPanchayat = m.GramPanchayat;  
                    trainee.Gram = m.Gram;  
                    trainee.PinCode = m.PinCode;  
                    trainee.VidhanSabha = m.VidhanSabha;  
                    trainee.Education = m.Education;  
                    trainee.WorkingStatus = m.WorkingStatus;  
                    trainee.WorkType = m.WorkType;  
                    trainee.SourceOfInformation = m.SourceOfInformation;  
                    trainee.applyreason = m.applyreason;  
                    trainee.isDeclaration = m.isDeclaration;                 

                    //m.uniquetempsno = _uniquetempsno;
                    //m.insertDatetime = DateTime.Now;
                    _dbcon.TraineeRegistration.AddAsync(trainee);
                    await _dbcon.SaveChangesAsync();
                    // ViewBag.Message = String.Format("Data saved successfully please note down your temporary reference number {0}", _uniquetempsno);
                    TempData["Notification"] = JsonConvert.SerializeObject(new Notification("Success", $"Requested Successfully. Please note down your temporary reference number @{_uniquetempsno}"));
                    //}
                    //else
                    //{
                    //    _Db.Entry(m).State = EntityState.Modified;
                    //}
                    //alert(@ViewBag.Message);
                    //TempData["msg"] = "<script>alert('Data save sucessfully...', _uniquetempsno);</script>";
                    return RedirectToAction("Registration");
                }
                TempData["msg"] = "<script>alert('Data not save sucessfully,Please verify');</script>";
                return RedirectToAction("Registration");
            }
            catch (Exception ex)
            {
                TempData["msg"] = "<script>alert('Error,Please verify');</script>";
                return RedirectToAction("Registration");
            }
        }
        public void getgender()
        {
            List<SelectListItem> genders = new()
            {
                new SelectListItem { Value = "", Text = "--Select--" },
                new SelectListItem { Value = "M", Text = "Male" },
                new SelectListItem { Value = "F", Text = "Female" },
                new SelectListItem { Value = "T", Text = "Trans Gender" },
            };
            ViewData["genders"] = genders;
        }
        public IActionResult OrganisationChart()
        {
            ViewBag.Message = "Organisation Chart";

            return View();
        }

        public IActionResult Programs()
        {
            ViewBag.Message = "Program and Schemes";

            return View();
        }

        public IActionResult Courselist()
        {
            ViewBag.Message = "Course List";
            return View();
        }

        public IActionResult Galary()
        {
            ViewBag.Message = "Galary";
            return View();
        }

        public IActionResult Hod()
        {
            ViewBag.Message = "HOD";
            return View();
        }

        public IActionResult LcContact()
        {
            ViewBag.Message = "Livelihood College Contact";
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            ViewBag.Message = "User Login";


            return View();
        }
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            //HttpContext.Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            return RedirectToAction("Login", new { controller = "Home" });
        }

        [HttpPost]
        //[HttpGet]
        [ValidateAntiForgeryToken]
        public IActionResult Login1(string userID, string password)
        {
            //Code for validating the CAPTCHA

            string salt = EncryptPassword.GetSalt();

            if (ModelState.IsValid)
            {
                if (!_validatorService.HasRequestValidCaptchaEntry(Language.English, DisplayMode.SumOfTwoNumbers))
                {
                    this.ModelState.AddModelError(_captchaOptions.CaptchaComponent.CaptchaHiddenInputName, "Please Enter Security Code as Number");
                    ViewData["ErrorMessage"] = "Invalid Captcha";
                    return View("Login");

                }
                else
                {
                    LCDataContext ctx = new LCDataContext();
                    var obj = _dbcon.userLevel.Find(userID);
                    if (obj == null)
                    {
                        ViewData["ErrorMessage"] = "Invalid UserID and Password";
                        return View("Login");
                    }
                    string uid = obj.userID;
                    byte[] pwd = obj.password;
                    byte[] pwd1 = obj.password;
                    string upass = EncryptPassword.getHexString_new(password);
                    pwd1 = EncryptPassword.GetSHAHash(salt + upass);
                    string y = EncryptPassword.getHexString(pwd1);

                    string x = EncryptPassword.getHexString(pwd);
                    pwd = EncryptPassword.GetSHAHash(salt + EncryptPassword.getHexString(pwd));
                    string a = EncryptPassword.getHexString(pwd);

                    if (userID == uid && EncryptPassword.getHexString(pwd1) == EncryptPassword.getHexString(pwd))
                    {
                        TempData["userid"] = obj.userID;
                        TempData["userdetail"] = obj.userDetail;
                        return RedirectToAction("StateDashboard", "APO");
                    }
                    else
                    {
                        ViewData["ErrorMessage"] = "Invalid UserID and Password";

                        return View("Login");
                    }
                    //string pass = Convert.ToBase64String(xyz);

                    //    string connection = configuration.GetConnectionString("mycon");
                    //SqlConnection con = new SqlConnection(connection);
                    //return RedirectToAction("StateDashboard", "APO");

                }
            }

            //ViewBag.ErrMessage = "Captcha is not valid";
            return View("Login");

        }
        [HttpPost]
        public JsonResult GetBlockbyDist(string distcode)
        {
            //loadblock(distcode);
            List<Block> blocklst = new List<Block>();
            //blocklst = _dbcon.LGD_Block.Where(d => d.DistrictCode == distcode).ToList();
            blocklst = (from o in _dbcon.LGD_Block
                        where o.DistrictCode == distcode
                        select new Block
                        {
                            BlockCode = o.BlockCode,
                            BlockNameinEnglish = o.BlockNameinEnglish
                        }).ToList();
            return Json(blocklst);
        }
        [HttpPost]
        public JsonResult loadLC(string distcode)
        {

            List<VTP_Model> VTPdatas = new List<VTP_Model>();
            VTPdatas = _dbcon.VTP_Master.Where(d => d.District == distcode).ToList();
            return Json(VTPdatas);

        }

        [HttpPost]
        public JsonResult GetCitybyDist(string distcode)
        {
            List<LGD_Nagarpalika> citylst = new List<LGD_Nagarpalika>();
            citylst = _dbcon.LGD_Nagarpalika.Where(d => d.distcode == distcode).ToList();
            return Json(citylst);
        }
        [HttpPost]
        public JsonResult GetGramPanchayatbyDist_block(string distcode, string block)
        {
            List<LGD_Grampanchayat_Block> gramPanchyatlst = new List<LGD_Grampanchayat_Block>();
            gramPanchyatlst = _dbcon.LGD_Grampanchayat_Block.Where(d => d.BlockCode == block && d.DistrictCode == distcode).ToList();
            return Json(gramPanchyatlst);
        }

        [HttpPost]
        public JsonResult GetWard(string citycode)
        {
            List<ward> wardlst = new List<ward>();
            wardlst = _dbcon.LGD_Ward.Where(d => d.LocalBodyCode == citycode).ToList();
            return Json(wardlst);
        }
        [HttpPost]
        public JsonResult GetGrambyDist_Block(string distcode, string gramPanchyatcode)
        {
            List<LGD_VillagePanchyatDB> grmlst = new List<LGD_VillagePanchyatDB>();
            grmlst = _dbcon.LGD_VillagePanchyatDB.Where(d => d.DistrictCode == distcode && d.localbodycode == gramPanchyatcode).ToList();
            return Json(grmlst);
        }

        [HttpPost]
        public JsonResult GetVidhanSabha(string distcode)
        {
            List<VidhanSabha> citylst = new List<VidhanSabha>();
            citylst = _dbcon.VidhanSabha.Where(d => d.DistCode == distcode).ToList();
            return Json(citylst);
        }
    }
}
