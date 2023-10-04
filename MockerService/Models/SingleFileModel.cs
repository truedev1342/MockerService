using System.ComponentModel.DataAnnotations;

namespace MockerService.Models
{
    public class SingleFileModel : ResponseModel
    {
        [Required(ErrorMessage = "Please select file")]
        public IFormFile File { get; set; }
    }
}
