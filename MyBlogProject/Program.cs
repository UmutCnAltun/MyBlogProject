using Microsoft.EntityFrameworkCore;
using MyBlogProject.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Veritabanı Bağlantısı
builder.Services.AddDbContext<BlogContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. KİMLİK DOĞRULAMA ŞEMASI (Hatanın çözümü burası!)
// Sisteme "Cookie" kullanacağımızı öğretiyoruz.
builder.Services.AddAuthentication("CookieAuth")
    .AddCookie("CookieAuth", options =>
    {
        options.Cookie.Name = "UserSession";
        options.LoginPath = "/Account/Login"; // Giriş yapmayan buraya gider
    });

builder.Services.AddControllersWithViews();
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Oturum süresi
});

var app = builder.Build();

// 3. MIDDLEWARE SIRALAMASI (Bu sıra çok kritiktir!)
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// Statik dosyalar (resimler vb.) her şeyden önce gelmeli
app.UseStaticFiles();

app.UseRouting();

// Session, Authentication'dan ÖNCE gelmeli
app.UseSession();

app.UseAuthentication(); // Artık hata vermeyecek çünkü yukarıda şemayı tanımladık
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();