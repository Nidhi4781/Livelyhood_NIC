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
using livelihood.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using livelihood.Models.ViewModel;
using livelihood.Models.ViewModel.DataTable;
using DocumentFormat.OpenXml.Office2010.Excel;
using System.Reflection.Emit;
using DocumentFormat.OpenXml.InkML;
using System.Net.Mail;
using AspNetCore;
using DocumentFormat.OpenXml.Drawing.Charts;
using SkiaSharp;

namespace livelihood.Controllers
{
    public class APOController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration configuration;
        private readonly LCDataContext _dbcon;
        const string SessionName = "";
        private IWebHostEnvironment _envObj = null;

        public APOController(ILogger<HomeController> logger, IConfiguration config, LCDataContext dbcon, IWebHostEnvironment envObj)
        {
            _logger = logger;
            _dbcon = dbcon;
            this.configuration = config;
            _envObj = envObj;
        }
        public IActionResult StateDashboard()
        {
            //if (TempData["userdetail"] == null)
            //{
            //    return RedirectToAction("Index", "Home");
            //}
            //else
            //{
            getDist();
            TotaPendingAF();
            //}
            return View();
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
        public IActionResult traineedetails(TraineeRegistration m)
        {
            loaddist();
            loadCourse();
            getgender();
            loadEdu();
            TempData["Regno"] = m.uniquetempsno;
            var Track = (from o in _dbcon.TraineeRegistration
                         join i in _dbcon.LGD_Dist on o.Dist equals i.DistrictCode
                         join v in _dbcon.VTP_Master on o.LCCode equals v.main_VTPRegNo
                         where o.uniquetempsno == m.uniquetempsno
                         select new TraineeRegistration
                         {
                             uniquetempsno = o.uniquetempsno,
                             Dist = i.DistrictNameEnglish,
                             LCCode = v.VTPName,
                             coursecode = o.coursecode,
                             Traineename = o.Traineename,
                             Fname = o.Fname,
                             Contactno = o.Contactno,
                             Email = o.Email,
                             Gender = o.Gender,
                             IsDivyang = o.IsDivyang,
                             Category = o.Category,
                             Address = o.Address,
                             AddDist = o.AddDist,
                             AddBlock = o.AddBlock,
                             UrbanRural = o.UrbanRural,
                             City = o.City,
                             Ward = o.Ward,
                             GramPanchayat = o.GramPanchayat,
                             Gram = o.Gram,
                             PinCode = o.PinCode,
                             VidhanSabha = o.VidhanSabha,
                             Education = o.Education,
                             WorkingStatus = o.WorkingStatus,
                             WorkType = o.WorkType,
                             WorkTypeDetails = o.WorkTypeDetails,
                             SourceOfInformation = o.SourceOfInformation,
                             applyreason = o.applyreason
                         }).ToList();

            return View(Track);
        }

        [HttpPost]
        public async Task<IActionResult> Updatetraineedetail()
        {
            string regno = TempData["Regno"].ToString();
            try
            {
                var personsToUpdate = _dbcon.TraineeRegistration.Where
(
   p => p.uniquetempsno.Contains(regno)
);
                foreach (TraineeRegistration p in personsToUpdate)
                {
                    p.freshApplication_APOStatus = "1";
                }
                _dbcon.SaveChanges();

                // _dbcon.TraineeRegistration
                //var user = new User() { Id = userId, Password = password };
                //using (var db = new _dbcon.TraineeRegistration())
                //{
                //    db.Users.Attach(user);

                //}

                //if (ModelState.IsValid)
                //{
                //if (m.ID == 0)
                //{

                //}
                //else
                //{
                // m.freshApplication_APOStatus = "1";
                // _dbcon.Entry(m).State = EntityState.Modified;
                //}
                //alert(@ViewBag.Message);
                TempData["msg"] = "<script>alert('Data Updated sucessfully...', _uniquetempsno);</script>";
                return RedirectToAction("freshAppPending");
                // }
                TempData["msg"] = "<script>alert('Data not Updated sucessfully,Please verify');</script>";
                return RedirectToAction("freshAppPending");
            }
            catch (Exception ex)
            {
                TempData["msg"] = "<script>alert('Error,Please verify');</script>";
                return RedirectToAction("freshAppPending");
            }
        }
        public IActionResult LivelihoodColleges()
        {
            var Track = (from o in _dbcon.VTP_Master
                         join i in _dbcon.LGD_Dist
                         on o.District equals i.DistrictCode
                         where o.Is_VTPType == "1" && o.District == ViewData["distcode"]
                         select new VTP_Model
                         {
                             main_VTPRegNo = o.main_VTPRegNo,
                             VTPRegNo = o.VTPRegNo,
                             VTPName = o.VTPName,
                             address = o.address,
                             District = i.DistrictNameEnglish
                         });

            return View(Track);
        }
        public void getDist()
        {
            var obj = (_dbcon.userLevel.Where(x => x.userID == TempData["userid"])).ToList();
            TempData.Keep("userid");
            ViewData["distcode"] = obj.Select(item => item.distcode).FirstOrDefault();
            HttpContext.Session.SetString(SessionName, ViewData["distcode"].ToString());
        }
        public void TotaPendingAF()
        {
            var obj = (_dbcon.TraineeRegistration.Where(x => x.freshApplication_APOStatus == null && x.Dist == ViewData["distcode"])).Count();
            ViewData["PendingAF"] = obj.ToString();
        }

        public IActionResult CertifiedBeneficiaries()
        {
            return View();
        }
        public IActionResult RegisteredBeneficiaries()
        {
            return View();
        }
        public IActionResult RegisteredCourses()
        {
            return View();
        }
        public IActionResult PlacedBeneficiaries()
        {
            return View();
        }
        public IActionResult UndertrainingBeneficiaries()
        {
            return View();
        }
        public async Task<IActionResult> Courses()
        {

            return View();


        }
        #region Nidhi



        #region freshAppPending
        public ActionResult freshAppPending()
        {
            return View();
        }
        public async Task<ActionResult> ListFreshAppPending(DataTableRequest request, string output = "json")
        {
            var query = from o in _dbcon.TraineeRegistration
                        where o.freshApplication_APOStatus == null && o.Dist == HttpContext.Session.GetString(SessionName) && o.apoAction == null
                        select new
                        {
                            o.srno,
                            uniquetempsno = o.uniquetempsno,
                            Traineename = o.Traineename,
                            Fname = o.Fname,
                            Gender = o.Gender,
                            Contactno = o.Contactno,
                            Email = o.Email,
                            IsDivyang = o.IsDivyang,
                            insertDatetime = o.insertDatetime
                        };

            if (!string.IsNullOrEmpty(request.sSearch))
            {
                request.sSearch = request.sSearch.Trim();
                query = query.Where(u => u.uniquetempsno.Contains(request.sSearch) || u.Traineename.Contains(request.sSearch) ||
                u.Fname.Contains(request.sSearch) || u.Gender.Contains(request.sSearch) || u.Contactno.Contains(request.sSearch) || u.Email.Contains(request.sSearch)
                || u.IsDivyang.Contains(request.sSearch));
            }

            //switch (request.iSortCol_0)
            //{
            //    case 1:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whname) : query.OrderByDescending(u => u.Whname);
            //        break;
            //    case 2:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whcode) : query.OrderByDescending(u => u.Whcode);
            //        break;
            //    case 3:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.InchargeNmae) : query.OrderByDescending(u => u.InchargeNmae);
            //        break;
            //    case 4:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.ContactNumber) : query.OrderByDescending(u => u.ContactNumber);
            //        break;
            //    case 5:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Lattitude) : query.OrderByDescending(u => u.Lattitude);
            //        break;
            //    case 6:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Region) : query.OrderByDescending(u => u.Region);
            //        break;
            //    case 7:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Longitude) : query.OrderByDescending(u => u.Longitude);
            //        break;
            //    case 8:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Status) : query.OrderByDescending(u => u.Status);
            //        break;
            //    default:
            //        query = query.OrderByDescending(u => u.Id);
            //        break;
            //}

            var count = await query.CountAsync();
            if (output == "json")
            {
                query = query.Skip(request.iDisplayStart).Take(request.iDisplayLength);
            }

            var data = await query.ToListAsync();
            if (output == "excel")
            {
                data = await query.OrderByDescending(q => q.insertDatetime).ToListAsync();
            }
            List<DataTableRow> rows = new List<DataTableRow>();

            int i = request.iDisplayStart + 1;

            foreach (var rowData in data)
            {
                DataTableRow row = new DataTableRow();

                row.Add(i);
                //row.Add(rowData.uniquetempsno);

                row.Add(rowData.uniquetempsno);

                row.Add(rowData.Traineename);
                row.Add(rowData.Fname);
                row.Add(rowData.Gender);
                row.Add(rowData.Contactno);
                row.Add(rowData.Email);
                row.Add(rowData.IsDivyang);
                row.Add(rowData.insertDatetime.Value.ToString("dd/MM/yyyy"));
                if (output == "json")
                {
                    string _detail = "<a href='/apo/TraineeDetail/?uniquetempsno=" + rowData.uniquetempsno + "' title='Details' class='mr5'><i class='mdi mdi-eye'></i></a> ";
                    row.Add(@"" + _detail + "");
                }
                rows.Add(row);
                i++;
            }
            if (output == "json")
            {
                return Json(new DataTableResponse
                {
                    sEcho = request.sEcho,
                    iDisplayLength = request.iDisplayLength,
                    iTotalRecords = count,
                    iDisplayStart = request.iDisplayStart,
                    iTotalDisplayRecords = count,
                    aaData = rows
                });
            }
            else
            {
                List<string> _headings = new List<string>()
                {

             "Sl. No",  "uniquetempsno", "Traineename", "FName",    "Gender",   "Contactno",    "Email",    "IsDivyang",   "insertDatetime"
                };
                string _exportDestination = Path.Combine(_envObj.WebRootPath, "Exports", $"Application_Pending_to_Accept {DateTime.Today:dd-MM-yyyy}.xlsx");

                ExcelExportManager.Export("Application_Pending_to_Accept", _headings, rows, _exportDestination);

                Stream _fileStream = System.IO.File.Open(_exportDestination, FileMode.Open);

                return File(_fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Path.GetFileName(_exportDestination));
            }
        }
        public async Task<IActionResult> TraineeDetail(string? uniquetempsno)
        {
            loaddist();
            loadCourse();
            getgender();
            loadEdu();
            //TempData["Regno"] = m.uniquetempsno;
          
            TraineeRegistration TraineeRegistration = await _dbcon.TraineeRegistration.FirstOrDefaultAsync(m => m.uniquetempsno == uniquetempsno);
            var LGD_Dist = await _dbcon.LGD_Dist.FirstOrDefaultAsync(m => m.DistrictCode == TraineeRegistration.Dist);
            if (LGD_Dist.DistrictCode != null)
            {
               ViewBag.DistrictNameEnglish = LGD_Dist.DistrictNameEnglish;
            }
            var VTP_Master = await _dbcon.VTP_Master.FirstOrDefaultAsync(m => m.main_VTPRegNo == TraineeRegistration.LCCode);
            if (VTP_Master.main_VTPRegNo != null)
            {
               ViewBag.VTPName = VTP_Master.VTPName;
            }
            var course = await _dbcon.course.FirstOrDefaultAsync(m => m.coursecode == TraineeRegistration.coursecode);
            if (course != null)
            {
                ViewBag.coursename = course.coursename;
            }
            //var Track = (from o in _dbcon.TraineeRegistration
            //             join i in _dbcon.LGD_Dist on o.Dist equals i.DistrictCode
            //             join v in _dbcon.VTP_Master on o.LCCode equals v.main_VTPRegNo
            //             where o.uniquetempsno == m.uniquetempsno
            //             select new TraineeRegistration
            //             {
            //                 uniquetempsno = o.uniquetempsno,
            //                 Dist = i.DistrictNameEnglish,
            //                 LCCode = v.VTPName,
            //                 coursecode = o.coursecode,
            //                 Traineename = o.Traineename,
            //                 Fname = o.Fname,
            //                 Contactno = o.Contactno,
            //                 Email = o.Email,
            //                 Gender = o.Gender,
            //                 IsDivyang = o.IsDivyang,
            //                 Category = o.Category,
            //                 Address = o.Address,
            //                 AddDist = o.AddDist,
            //                 AddBlock = o.AddBlock,
            //                 UrbanRural = o.UrbanRural,
            //                 City = o.City,
            //                 Ward = o.Ward,
            //                 GramPanchayat = o.GramPanchayat,
            //                 Gram = o.Gram,
            //                 PinCode = o.PinCode,
            //                 VidhanSabha = o.VidhanSabha,
            //                 Education = o.Education,
            //                 WorkingStatus = o.WorkingStatus,
            //                 WorkType = o.WorkType,
            //                 WorkTypeDetails = o.WorkTypeDetails,
            //                 SourceOfInformation = o.SourceOfInformation,
            //                 applyreason = o.applyreason
            //             }).ToList();

            return View(TraineeRegistration);
        }
        #endregion freshAppPending

        #region ApproveAppReport
        public ActionResult ApprovedReport()
        {
            return View();
        }
        public async Task<ActionResult> ListApprovedReport(DataTableRequest request, string output = "json")
        {
            var query = from o in _dbcon.TraineeRegistration
                        where o.freshApplication_APOStatus == null && o.Dist == HttpContext.Session.GetString(SessionName) && o.apoAction == "1"
                        select new
                        {
                            uniquetempsno = o.uniquetempsno,
                            Traineename = o.Traineename,
                            Fname = o.Fname,
                            Gender = o.Gender,
                            Contactno = o.Contactno,
                            Email = o.Email,
                            IsDivyang = o.IsDivyang,
                            insertDatetime = o.insertDatetime,
                            o.apoActionDate,
                            o.remark
                        };

            if (!string.IsNullOrEmpty(request.sSearch))
            {
                request.sSearch = request.sSearch.Trim();
                query = query.Where(u => u.uniquetempsno.Contains(request.sSearch) || u.Traineename.Contains(request.sSearch) ||
                u.Fname.Contains(request.sSearch) || u.Gender.Contains(request.sSearch) || u.Contactno.Contains(request.sSearch) || u.Email.Contains(request.sSearch)
                || u.IsDivyang.Contains(request.sSearch));
            }

            //switch (request.iSortCol_0)
            //{
            //    case 1:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whname) : query.OrderByDescending(u => u.Whname);
            //        break;
            //    case 2:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whcode) : query.OrderByDescending(u => u.Whcode);
            //        break;
            //    case 3:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.InchargeNmae) : query.OrderByDescending(u => u.InchargeNmae);
            //        break;
            //    case 4:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.ContactNumber) : query.OrderByDescending(u => u.ContactNumber);
            //        break;
            //    case 5:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Lattitude) : query.OrderByDescending(u => u.Lattitude);
            //        break;
            //    case 6:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Region) : query.OrderByDescending(u => u.Region);
            //        break;
            //    case 7:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Longitude) : query.OrderByDescending(u => u.Longitude);
            //        break;
            //    case 8:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Status) : query.OrderByDescending(u => u.Status);
            //        break;
            //    default:
            //        query = query.OrderByDescending(u => u.Id);
            //        break;
            //}

            var count = await query.CountAsync();
            if (output == "json")
            {
                query = query.Skip(request.iDisplayStart).Take(request.iDisplayLength);
            }

            var data = await query.ToListAsync();
            if (output == "excel")
            {
                data = await query.OrderByDescending(q => q.apoActionDate).ToListAsync();
            }
            List<DataTableRow> rows = new List<DataTableRow>();

            int i = request.iDisplayStart + 1;

            foreach (var rowData in data)
            {
                DataTableRow row = new DataTableRow();

                row.Add(i);
                row.Add(rowData.uniquetempsno);

                row.Add(rowData.Traineename);
                row.Add(rowData.Fname);
                row.Add(rowData.Gender);
                row.Add(rowData.Contactno);
                row.Add(rowData.Email);
                row.Add(rowData.IsDivyang);
                row.Add(rowData.remark);
                if (rowData.apoActionDate!= null)
                {
                    row.Add(rowData.apoActionDate.Value.ToString("dd/MM/yyyy"));

                }
                else
                {
                    row.Add("--");

                }
                row.Add("Approved");
                if (output == "json")
                {
                    string _detail = "<a href='/apo/ApprovedTraineeDetail/" + rowData.uniquetempsno + "' title='Details' class='mr5'><i class='mdi mdi-eye'></i></a> ";
                    row.Add(@"" + _detail + "");
                }
                rows.Add(row);
                i++;
            }
            if (output == "json")
            {
                return Json(new DataTableResponse
                {
                    sEcho = request.sEcho,
                    iDisplayLength = request.iDisplayLength,
                    iTotalRecords = count,
                    iDisplayStart = request.iDisplayStart,
                    iTotalDisplayRecords = count,
                    aaData = rows
                });
            }
            else
            {
                List<string> _headings = new List<string>()
                {

             "Sl. No",  "uniquetempsno", "Traineename", "FName",    "Gender",   "Contactno",    "Email",    "IsDivyang",   "APO_Remark","ApprovedDatetime","Status"
                };
                string _exportDestination = Path.Combine(_envObj.WebRootPath, "Exports", $"Application_ApprovedReport {DateTime.Today:dd-MM-yyyy}.xlsx");

                ExcelExportManager.Export("Application_ApprovedReport", _headings, rows, _exportDestination);

                Stream _fileStream = System.IO.File.Open(_exportDestination, FileMode.Open);

                return File(_fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Path.GetFileName(_exportDestination));
            }
        }
        public async Task<IActionResult> ApprovedTraineeDetail(TraineeRegistration m)
        {
            loaddist();
            loadCourse();
            getgender();
            loadEdu();
            TempData["Regno"] = m.uniquetempsno;

            TraineeRegistration TraineeRegistration = await _dbcon.TraineeRegistration.FirstOrDefaultAsync(m => m.uniquetempsno == m.uniquetempsno);
            var LGD_Dist = await _dbcon.LGD_Dist.FirstOrDefaultAsync(m => m.DistrictCode == TraineeRegistration.Dist);
            if (LGD_Dist.DistrictCode != null)
            {
                ViewBag.DistrictNameEnglish = LGD_Dist.DistrictNameEnglish;
            }
            var VTP_Master = await _dbcon.VTP_Master.FirstOrDefaultAsync(m => m.main_VTPRegNo == TraineeRegistration.LCCode);
            if (VTP_Master.main_VTPRegNo != null)
            {
                ViewBag.VTPName = VTP_Master.VTPName;
            }
            var course = await _dbcon.course.FirstOrDefaultAsync(m => m.coursecode == TraineeRegistration.coursecode);
            if (course.coursecode != null)
            {
                ViewBag.coursename = course.coursename;
            }
            //var Track = (from o in _dbcon.TraineeRegistration
            //             join i in _dbcon.LGD_Dist on o.Dist equals i.DistrictCode
            //             join v in _dbcon.VTP_Master on o.LCCode equals v.main_VTPRegNo
            //             where o.uniquetempsno == m.uniquetempsno
            //             select new TraineeRegistration
            //             {
            //                 uniquetempsno = o.uniquetempsno,
            //                 Dist = i.DistrictNameEnglish,
            //                 LCCode = v.VTPName,
            //                 coursecode = o.coursecode,
            //                 Traineename = o.Traineename,
            //                 Fname = o.Fname,
            //                 Contactno = o.Contactno,
            //                 Email = o.Email,
            //                 Gender = o.Gender,
            //                 IsDivyang = o.IsDivyang,
            //                 Category = o.Category,
            //                 Address = o.Address,
            //                 AddDist = o.AddDist,
            //                 AddBlock = o.AddBlock,
            //                 UrbanRural = o.UrbanRural,
            //                 City = o.City,
            //                 Ward = o.Ward,
            //                 GramPanchayat = o.GramPanchayat,
            //                 Gram = o.Gram,
            //                 PinCode = o.PinCode,
            //                 VidhanSabha = o.VidhanSabha,
            //                 Education = o.Education,
            //                 WorkingStatus = o.WorkingStatus,
            //                 WorkType = o.WorkType,
            //                 WorkTypeDetails = o.WorkTypeDetails,
            //                 SourceOfInformation = o.SourceOfInformation,
            //                 applyreason = o.applyreason
            //             }).ToList();

            return View(TraineeRegistration);
        }
        #endregion ApproveAppReport

        #region RejectedAppReport
        public ActionResult RejectedReport()
        {
            return View();
        }
        public async Task<ActionResult> ListRejectedReport(DataTableRequest request, string output = "json")
        {
            var query = from o in _dbcon.TraineeRegistration
                        where o.freshApplication_APOStatus == null && o.Dist == HttpContext.Session.GetString(SessionName) && o.apoAction == "0"
                        select new
                        {
                            uniquetempsno = o.uniquetempsno,
                            Traineename = o.Traineename,
                            Fname = o.Fname,
                            Gender = o.Gender,
                            Contactno = o.Contactno,
                            Email = o.Email,
                            IsDivyang = o.IsDivyang,
                            insertDatetime = o.insertDatetime,
                            o.apoActionDate,
                            o.remark
                        };

            if (!string.IsNullOrEmpty(request.sSearch))
            {
                request.sSearch = request.sSearch.Trim();
                query = query.Where(u => u.uniquetempsno.Contains(request.sSearch) || u.Traineename.Contains(request.sSearch) ||
                u.Fname.Contains(request.sSearch) || u.Gender.Contains(request.sSearch) || u.Contactno.Contains(request.sSearch) || u.Email.Contains(request.sSearch)
                || u.IsDivyang.Contains(request.sSearch));
            }

            //switch (request.iSortCol_0)
            //{
            //    case 1:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whname) : query.OrderByDescending(u => u.Whname);
            //        break;
            //    case 2:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whcode) : query.OrderByDescending(u => u.Whcode);
            //        break;
            //    case 3:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.InchargeNmae) : query.OrderByDescending(u => u.InchargeNmae);
            //        break;
            //    case 4:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.ContactNumber) : query.OrderByDescending(u => u.ContactNumber);
            //        break;
            //    case 5:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Lattitude) : query.OrderByDescending(u => u.Lattitude);
            //        break;
            //    case 6:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Region) : query.OrderByDescending(u => u.Region);
            //        break;
            //    case 7:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Longitude) : query.OrderByDescending(u => u.Longitude);
            //        break;
            //    case 8:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Status) : query.OrderByDescending(u => u.Status);
            //        break;
            //    default:
            //        query = query.OrderByDescending(u => u.Id);
            //        break;
            //}

            var count = await query.CountAsync();
            if (output == "json")
            {
                query = query.Skip(request.iDisplayStart).Take(request.iDisplayLength);
            }

            var data = await query.ToListAsync();
            if (output == "excel")
            {
                data = await query.OrderByDescending(q => q.uniquetempsno).ToListAsync();
            }
            List<DataTableRow> rows = new List<DataTableRow>();

            int i = request.iDisplayStart + 1;

            foreach (var rowData in data)
            {
                DataTableRow row = new DataTableRow();

                row.Add(i);
                row.Add(rowData.uniquetempsno);

                row.Add(rowData.Traineename);
                row.Add(rowData.Fname);
                row.Add(rowData.Gender);
                row.Add(rowData.Contactno);
                row.Add(rowData.Email);
                row.Add(rowData.IsDivyang);
                row.Add(rowData.remark);
                row.Add(rowData.apoActionDate.Value.ToString("dd/MM/yyyy"));
                row.Add("Rejected");

                if (output == "json")
                {
                    string _detail = "<a href='/apo/TraineeDetail/" + rowData.uniquetempsno + "' title='Details' class='mr5'><i class='mdi mdi-eye'></i></a> ";
                    row.Add(@"" + _detail + "");
                }
                rows.Add(row);
                i++;
            }
            if (output == "json")
            {
                return Json(new DataTableResponse
                {
                    sEcho = request.sEcho,
                    iDisplayLength = request.iDisplayLength,
                    iTotalRecords = count,
                    iDisplayStart = request.iDisplayStart,
                    iTotalDisplayRecords = count,
                    aaData = rows
                });
            }
            else
            {
                List<string> _headings = new List<string>()
                {

             "Sl. No",  "uniquetempsno", "Traineename", "FName",    "Gender",   "Contactno",    "Email",    "IsDivyang",   "insertDatetime"
                };
                string _exportDestination = Path.Combine(_envObj.WebRootPath, "Exports", $"Application_RejectedReport {DateTime.Today:dd-MM-yyyy}.xlsx");

                ExcelExportManager.Export("Application_RejectedReport", _headings, rows, _exportDestination);

                Stream _fileStream = System.IO.File.Open(_exportDestination, FileMode.Open);

                return File(_fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Path.GetFileName(_exportDestination));
            }
        }
        public async Task<IActionResult> RejectedTraineeDetail(TraineeRegistration m)
        {
            loaddist();
            loadCourse();
            getgender();
            loadEdu();
            TempData["Regno"] = m.uniquetempsno;

            TraineeRegistration TraineeRegistration = await _dbcon.TraineeRegistration.FirstOrDefaultAsync(m => m.uniquetempsno == m.uniquetempsno);
            var LGD_Dist = await _dbcon.LGD_Dist.FirstOrDefaultAsync(m => m.DistrictCode == TraineeRegistration.Dist);
            if (LGD_Dist.DistrictCode != null)
            {
                ViewBag.DistrictNameEnglish = LGD_Dist.DistrictNameEnglish;
            }
            var VTP_Master = await _dbcon.VTP_Master.FirstOrDefaultAsync(m => m.main_VTPRegNo == TraineeRegistration.LCCode);
            if (VTP_Master.main_VTPRegNo != null)
            {
                ViewBag.VTPName = VTP_Master.VTPName;
            }
            var course = await _dbcon.course.FirstOrDefaultAsync(m => m.coursecode == TraineeRegistration.coursecode);
            if (course.coursecode != null)
            {
                ViewBag.coursename = course.coursename;
            }
            //var Track = (from o in _dbcon.TraineeRegistration
            //             join i in _dbcon.LGD_Dist on o.Dist equals i.DistrictCode
            //             join v in _dbcon.VTP_Master on o.LCCode equals v.main_VTPRegNo
            //             where o.uniquetempsno == m.uniquetempsno
            //             select new TraineeRegistration
            //             {
            //                 uniquetempsno = o.uniquetempsno,
            //                 Dist = i.DistrictNameEnglish,
            //                 LCCode = v.VTPName,
            //                 coursecode = o.coursecode,
            //                 Traineename = o.Traineename,
            //                 Fname = o.Fname,
            //                 Contactno = o.Contactno,
            //                 Email = o.Email,
            //                 Gender = o.Gender,
            //                 IsDivyang = o.IsDivyang,
            //                 Category = o.Category,
            //                 Address = o.Address,
            //                 AddDist = o.AddDist,
            //                 AddBlock = o.AddBlock,
            //                 UrbanRural = o.UrbanRural,
            //                 City = o.City,
            //                 Ward = o.Ward,
            //                 GramPanchayat = o.GramPanchayat,
            //                 Gram = o.Gram,
            //                 PinCode = o.PinCode,
            //                 VidhanSabha = o.VidhanSabha,
            //                 Education = o.Education,
            //                 WorkingStatus = o.WorkingStatus,
            //                 WorkType = o.WorkType,
            //                 WorkTypeDetails = o.WorkTypeDetails,
            //                 SourceOfInformation = o.SourceOfInformation,
            //                 applyreason = o.applyreason
            //             }).ToList();

            return View(TraineeRegistration);
        }
        #endregion RejectedAppReport

        #region APO Approve and Reject Action
        [HttpPost]
        public async Task<IActionResult> rejectFreshAppPending(string uniquetempsno, string? Remark)
        {

            TraineeRegistration TraineeRegistration = await _dbcon.TraineeRegistration.FirstOrDefaultAsync(m => m.uniquetempsno == uniquetempsno);
            if (TraineeRegistration != null)
            {
                TraineeRegistration.apoAction = "0";
                TraineeRegistration.remark = Remark;
                TraineeRegistration.apoActionDate = DateTime.Now;
                await _dbcon.SaveChangesAsync();
            }


            return Redirect($"/APO/freshAppPending");
        }
        [HttpPost]
        public async Task<IActionResult> approveFreshAppPending(string uniquetempsno, string? Remark)
        {
            TraineeRegistration TraineeRegistration = await _dbcon.TraineeRegistration.FirstOrDefaultAsync(m => m.uniquetempsno == uniquetempsno);
            if (TraineeRegistration != null)
            {
                TraineeRegistration.apoAction = "1";
                TraineeRegistration.remark = Remark;
                TraineeRegistration.apoActionDate = DateTime.Now;
                await _dbcon.SaveChangesAsync();
            }

            return Redirect($"/APO/freshAppPending");
        }
        #endregion APO Approve and Reject Action

        #region LTB Creation
        public async Task<ActionResult> PendingApplicationForms()
        {

            //var course = from c in _dbcon.course                      
            //            select new { c };


            //var data = await course.ToListAsync();
            //var Q4 = _dbcon.course.Select(x => x.coursecode, x.coursename).ToList());
            //var query = (from o in _dbcon.AllPendingApplication
            //             where o.Dist == HttpContext.Session.GetString(SessionName)
            //             select new
            //             {
            //                 o.coursename,
            //                 o.coursecode,
            //                 o.totalApplication,
            //                 o.Dist
            //             }).ToListAsync();

            //return View(query);
            string dist = HttpContext.Session.GetString(SessionName);
            return _dbcon.AllPendingApplication != null ?
                         View(await _dbcon.AllPendingApplication.Where(a => a.Dist == dist).ToListAsync()) :
                         Problem("No Data available!");
        }

        // PendingLTB
        public ActionResult PendingLTB(string? coursecode)
        {
            //string? courssecode
            HttpContext.Session.SetString("courssecode", coursecode);
            var UserID = HttpContext.Session.GetString("courssecode");
            return View();
        }
        public async Task<ActionResult> ListPendingLTB(DataTableRequest request, string output = "json")
        {
            var UserID = HttpContext.Session.GetString("courssecode");
            var query = from o in _dbcon.TraineeRegistration
                        where o.freshApplication_APOStatus == null && o.Dist == HttpContext.Session.GetString(SessionName) && o.apoAction == "1" && o.coursecode== UserID
                        select new
                        {
                            o.srno,
                            uniquetempsno = o.uniquetempsno,
                            Traineename = o.Traineename,
                            Fname = o.Fname,
                            Gender = o.Gender,
                            Contactno = o.Contactno,
                            Email = o.Email,
                            IsDivyang = o.IsDivyang,
                            insertDatetime = o.insertDatetime
                        };

            if (!string.IsNullOrEmpty(request.sSearch))
            {
                request.sSearch = request.sSearch.Trim();
                query = query.Where(u => u.uniquetempsno.Contains(request.sSearch) || u.Traineename.Contains(request.sSearch) ||
                u.Fname.Contains(request.sSearch) || u.Gender.Contains(request.sSearch) || u.Contactno.Contains(request.sSearch) || u.Email.Contains(request.sSearch)
                || u.IsDivyang.Contains(request.sSearch));
            }

            //switch (request.iSortCol_0)
            //{
            //    case 1:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whname) : query.OrderByDescending(u => u.Whname);
            //        break;
            //    case 2:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Whcode) : query.OrderByDescending(u => u.Whcode);
            //        break;
            //    case 3:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.InchargeNmae) : query.OrderByDescending(u => u.InchargeNmae);
            //        break;
            //    case 4:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.ContactNumber) : query.OrderByDescending(u => u.ContactNumber);
            //        break;
            //    case 5:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Lattitude) : query.OrderByDescending(u => u.Lattitude);
            //        break;
            //    case 6:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Region) : query.OrderByDescending(u => u.Region);
            //        break;
            //    case 7:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Longitude) : query.OrderByDescending(u => u.Longitude);
            //        break;
            //    case 8:
            //        query = request.sSortDir_0 == "asc" ? query.OrderBy(u => u.Status) : query.OrderByDescending(u => u.Status);
            //        break;
            //    default:
            //        query = query.OrderByDescending(u => u.Id);
            //        break;
            //}

            var count = await query.CountAsync();
            if (output == "json")
            {
                query = query.Skip(request.iDisplayStart).Take(request.iDisplayLength);
            }

            var data = await query.ToListAsync();
            if (output == "excel")
            {
                data = await query.OrderByDescending(q => q.insertDatetime).ToListAsync();
            }
            List<DataTableRow> rows = new List<DataTableRow>();

            int i = request.iDisplayStart + 1;

            foreach (var rowData in data)
            {
                DataTableRow row = new DataTableRow();
                //if ((rowData.IsDivyang) <= 0)
                //{

                //    _row.Add($"<input type='checkbox' name='index' class='vehicle-requisition-check' data-reID='{_rowData.ID}' value='{_rowData.ID}' disabled='true'>");

                //}
                //else
                //{
                    row.Add($"<input type='checkbox' name='PendingLTB' class='vehicle-requisition-check requisition' data-reID='{rowData.uniquetempsno}' value='{rowData.uniquetempsno}'>");

              //  }
                row.Add(i);
                //row.Add(rowData.uniquetempsno);

                row.Add(rowData.uniquetempsno);

                row.Add(rowData.Traineename);
                row.Add(rowData.Fname);
                row.Add(rowData.Gender);
                row.Add(rowData.Contactno);
                row.Add(rowData.Email);
                row.Add(rowData.IsDivyang);
                row.Add(rowData.insertDatetime.Value.ToString("dd/MM/yyyy"));
                //if (output == "json")
                //{
                //    string _detail = "<a href='/apo/TraineeDetail/?uniquetempsno=" + rowData.uniquetempsno + "' title='Details' class='mr5'><i class='mdi mdi-eye'></i></a> ";
                //    row.Add(@"" + _detail + "");
                //}
                rows.Add(row);
                i++;
            }
            if (output == "json")
            {
                return Json(new DataTableResponse
                {
                    sEcho = request.sEcho,
                    iDisplayLength = request.iDisplayLength,
                    iTotalRecords = count,
                    iDisplayStart = request.iDisplayStart,
                    iTotalDisplayRecords = count,
                    aaData = rows
                });
            }
            else
            {
                List<string> _headings = new List<string>()
                {

             "Sl. No",  "uniquetempsno", "Traineename", "FName",    "Gender",   "Contactno",    "Email",    "IsDivyang",   "insertDatetime"
                };
                string _exportDestination = Path.Combine(_envObj.WebRootPath, "Exports", $"Application_Pending_to_Accept {DateTime.Today:dd-MM-yyyy}.xlsx");

                ExcelExportManager.Export("Application_Pending_to_Accept", _headings, rows, _exportDestination);

                Stream _fileStream = System.IO.File.Open(_exportDestination, FileMode.Open);

                return File(_fileStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Path.GetFileName(_exportDestination));
            }
        }
        #endregion LTB Creation

        #endregion Nidhi
    }
}
