using Microsoft.EntityFrameworkCore;
using MyBlogProject.Models; 

namespace MyBlogProject.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
        }

        public DbSet<BlogPost> Posts { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<ContactMessage> ContactMessages { get; set; }
    }
}