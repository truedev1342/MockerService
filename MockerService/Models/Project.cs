using System.ComponentModel.DataAnnotations;
namespace MockerService.Models
{
    public class Project
    {
        public int Id { get; set; }
        public int designer_id { get; set; }
        public string designer_name { get; set; }
        public DateTime created_at { get; set; }
        public string path { get; set; }
        public string details { get; set; }
        public int type { get; set; }
        public string pwd { get; set; }
    }
}
