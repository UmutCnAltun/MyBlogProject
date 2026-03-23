using Microsoft.AspNetCore.Mvc;
using MyBlogProject.Data;
using MyBlogProject.Models;
using System.Linq;

public class AccountController : Controller
{
    private readonly BlogContext _context;

    public AccountController(BlogContext context) => _context = context;

    public IActionResult Login() => View();

    [HttpPost]
    public IActionResult Login(string username, string password)
    {

        if ((username == "umutcan" && password == "1234") || (username == "hoca" && password == "puan100"))
        {
            SetUserSession(username, "Admin");
            return RedirectToAction("Index", "Admin");
        }

        var user = _context.Users.FirstOrDefault(u => (u.Username == username || u.Email == username) && u.Password == password);

        if (user != null)
        {
            SetUserSession(user.Username, "User", user.Id.ToString());
            return RedirectToAction("Index", "Home");
        }

        ViewBag.Error = "Kullanıcı adı veya şifre yanlış!";
        return View();
    }

    public IActionResult Register() => View();

    [HttpPost]
    public IActionResult Register(User model, string confirmPassword)
    {

        if (model.Password != confirmPassword) { ViewBag.Error = "Şifreler eşleşmiyor!"; return View(); }

        if (_context.Users.Any(u => u.Username == model.Username || u.Email == model.Email))
        {
            ViewBag.Error = "Kullanıcı adı veya E-posta zaten kullanımda!";
            return View();
        }

        if (ModelState.IsValid)
        {
            model.CreatedDate = DateTime.Now;
            _context.Users.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Login");
        }

        ViewBag.Error = "Lütfen tüm alanları doğru doldurduğunuzdan emin olun.";
        return View();
    }

    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return RedirectToAction("Index", "Home");
    }

    private void SetUserSession(string username, string role, string userId = null!)
    {
        HttpContext.Session.SetString("Username", username);
        HttpContext.Session.SetString("UserRole", role);
        if (userId != null) HttpContext.Session.SetString("UserId", userId);
    }
}