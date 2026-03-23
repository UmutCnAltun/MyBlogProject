namespace MyBlogProject.Models
{
    public class BlogPost
    {
        public int Id { get; set; } 
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? ImagePath { get; set; }
    }
}