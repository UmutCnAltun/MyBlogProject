using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBlogProject.Data;
using MyBlogProject.Models;
using System.Diagnostics;

namespace MyBlogProject.Controllers
{
    public class HomeController : Controller
    {
        private readonly BlogContext _context;

        public HomeController(BlogContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var posts = await _context.Posts.OrderByDescending(p => p.CreatedDate).ToListAsync();
            return View(posts);
        }

        public async Task<IActionResult> Details(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
            if (post == null) return NotFound();

            return View(post);
        }

        public IActionResult Aboutme() => View();
        public IActionResult WebApps() => View();
        public IActionResult Automation() => View();
        public IActionResult Architectural() => View();
        public IActionResult CV() => View();
        public IActionResult Privacy() => View();

        [HttpPost]
        public IActionResult SendMessage(ContactMessage model)
        {
            if (ModelState.IsValid)
            {
                _context.ContactMessages.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View("Aboutme", model); 
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}