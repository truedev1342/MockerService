using Microsoft.AspNetCore.Mvc;
using MockerService.Data;
using MockerService.Entities;
using MockerService.Services;
using Microsoft.EntityFrameworkCore;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using Newtonsoft.Json.Linq;

namespace MockerService.Controllers
{
    public class DisplayController : Controller
    {
        private readonly MockerServiceContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IFileService _uploadService;

        public DisplayController(MockerServiceContext context, IHostingEnvironment hostingEnvironment, IFileService uploadService)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            _uploadService = uploadService;
        }
        public async Task<IActionResult> Main(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var project = await _context.Project.FirstOrDefaultAsync(m => m.path == id);
            if (project == null)
            {
                return NotFound();
            }
            ViewData["designer_name"] = project.designer_name;
            ViewData["path"] = $"{project.path}";
            ViewData["baseURL"] = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string projectPath = webRootPath + @"\uploads\" + ViewData["path"];
            string path = "";
            foreach (string file in Directory.EnumerateFiles(projectPath))
            {
                if (System.IO.File.Exists(file) && file.Substring(file.Length - 6) == "dsproj")
                {
                    path = file;
                    break;
                }
            }
            if (path == null)
            {
                return NotFound();
            }
            string data = System.IO.File.ReadAllText(path);
            data = data.Substring(1, data.Length - 2);
            var details = JObject.Parse(data);
            ViewData["imgURL"] = ViewData["baseURL"] + @"/uploads/" + ViewData["path"] + @"/screenshots/" + details["MainPage"] + ".png";
            return View();
        }

        public async Task<IActionResult> Details(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var project = await _context.Project.FirstOrDefaultAsync(m => m.path == id);

            if (project == null)
            {
                return NotFound();
            }
            ViewData["baseURL"] = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            ViewData["path"] = $"{project.path}";

            string webRootPath = _hostingEnvironment.WebRootPath;
            string projectPath = webRootPath + @"\uploads\" + ViewData["path"];
            
            List<string> pages = new List<string>();
            string pageData = "[";
            foreach (string file in Directory.EnumerateFiles(projectPath))
            {
                if (!System.IO.File.Exists(file)) continue;
                if (file.Substring(file.Length - 6) == "dsproj")
                {
                    string data = System.IO.File.ReadAllText(file);
                    if (data.Substring(0, 1) == "[")
                    {
                        data = data.Substring(1, data.Length - 2);
                    }
                    var details = JObject.Parse(data);
                    ViewData["projectData"] = data;
                    foreach (string page in details["Pages"])
                    {
                        pages.Add(page);
                    }
                    ViewData["Pages"] = pages;
                    string mainpage = details["MainPage"].ToString();
                    ViewData["MainPage"] = mainpage;

                }
                if (file.Substring(file.Length - 6) == "dspage")
                {
                    string data = System.IO.File.ReadAllText(file);
                    if (data.Substring(0, 1) == "[")
                    {
                        data = data.Substring(1, data.Length - 2);
                    }
                    var details = JObject.Parse(data);
                    string filename = Path.GetFileName(file);
                    filename = filename.Substring(0, filename.Length - 7);
                    details["pageTitle"] = filename;
                    if (pageData == "[") pageData = pageData + details.ToString();
                    else pageData = pageData + "," + details.ToString();
                }
            }
            ViewData["pageData"] = pageData + "]";
            return View();
        }

        [HttpPost("PostSingleFile")]
        public async Task<ActionResult> PostSingleFile([FromForm] FileUploadModel fileDetails)
        {
            if (fileDetails == null)
            {
                return BadRequest();
            }

            try
            {
                await _uploadService.PostFileAsync(fileDetails.FileDetails, fileDetails.FileType);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
