using Microsoft.EntityFrameworkCore;
using MyBlogProject.Models; // Modellerin burada olduğunu varsayıyorum

namespace MyBlogProject.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
        }

        public DbSet<BlogPost> Posts { get; set; }
    }
}