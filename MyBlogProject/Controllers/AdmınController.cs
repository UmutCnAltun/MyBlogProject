using Microsoft.AspNetCore.Mvc;
using MyBlogProject.Data;
using MyBlogProject.Models;

public class AdminController : Controller
{
    private readonly BlogContext _context;

    public AdminController(BlogContext context) => _context = context;

    private bool IsNotAdmin() => HttpContext.Session.GetString("UserRole") != "Admin";

    public IActionResult Index()
    {
        if (IsNotAdmin()) return RedirectToAction("Login", "Account");
        return View(_context.Posts.ToList());
    }

    public IActionResult Create()
    {
        if (IsNotAdmin()) return RedirectToAction("Login", "Account");
        return View();
    }

    [HttpPost]
    public IActionResult Create(BlogPost post)
    {
        if (ModelState.IsValid)
        {
            post.CreatedDate = DateTime.Now;
            _context.Posts.Add(post);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
        return View(post);
    }

    public IActionResult Edit(int id)
    {
        if (IsNotAdmin()) return RedirectToAction("Login", "Account");

        var post = _context.Posts.Find(id);
        return post == null ? NotFound() : View(post);
    }

    [HttpPost]
    public IActionResult Edit(BlogPost updatedPost)
    {
        var original = _context.Posts.Find(updatedPost.Id);
        if (original == null) return NotFound();

        original.Title = updatedPost.Title;
        original.Content = updatedPost.Content;

        _context.SaveChanges();
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    public IActionResult DeletePost(int id)
    {
        var post = _context.Posts.Find(id);
        if (post != null)
        {
            _context.Posts.Remove(post);
            _context.SaveChanges();
        }
        return RedirectToAction(nameof(Index));
    }

    public IActionResult Messages()
    {
        if (IsNotAdmin()) return RedirectToAction("Login", "Account");

        var messages = _context.ContactMessages.OrderByDescending(m => m.SentDate).ToList();
        return View(messages);
    }

    [HttpPost]
    public IActionResult DeleteMessage(int id)
    {
        var msg = _context.ContactMessages.Find(id);
        if (msg != null)
        {
            _context.ContactMessages.Remove(msg);
            _context.SaveChanges();
        }
        return RedirectToAction(nameof(Messages));
    }
}