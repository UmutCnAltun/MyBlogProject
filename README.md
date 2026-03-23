# ✍️ MyBlogProject: Kişisel Blog & İçerik Yönetim Sistemi

Kişisel deneyimlerin paylaşıldığı, kullanıcıların etkileşime girebildiği ve dinamik içerik yönetimine imkan tanıyan modern bir web platformudur. C# ve SQL Server altyapısıyla geliştirilen bu proje, sağlam bir veri yapısı ve kullanıcı dostu bir arayüz sunar.

## 🚀 Temel Özellikler

* Dinamik Blog Sistemi: Yönetici panelinden veya belirlenen sayfadan yeni blog yazıları ekleme, düzenleme ve yayınlama.

* Kullanıcı Etkileşimi: Ziyaretçilerin sisteme giriş yaparak yazılara yorum bırakabilmesi ve toplulukla etkileşime geçebilmesi.

* Hakkımda & Portfolyo: Kişisel bilgilerin, özgeçmişin ve yeteneklerin sergilendiği özel tanıtım sayfası.

* Güvenli Giriş Paneli: Kullanıcıların kendi hesaplarını yönetebildiği ve güvenli bir şekilde oturum açabildiği Authentication yapısı.

* Veri Odaklı Mimari: Tüm içeriklerin, kategorilerin ve kullanıcı verilerinin SQL tabanlı bir veritabanında ilişkisel olarak saklanması.

## 🛠️ Teknik Altyapı

* Backend: C# ASP.NET MVC

* Veritabanı: Microsoft SQL Server (MSSQL)

* Frontend: HTML5, CSS3, JavaScript & Bootstrap

* Veri Erişimi: Entity Framework

## 📦 Kurulum ve Yapılandırma

Projeyi yerel ortamınızda çalıştırmak için:

Projeyi klonlayın:

```
git clone https://github.com/UmutCnAltun/MyBlogProject.git
```

Veritabanı Kurulumu:

**App_Data klasöründeki .sql dosyasını SQL Server'da çalıştırın veya Entity Framework kullanıyorsanız Update-Database komutunu uygulayın.**

**Web.config veya appsettings.json dosyasındaki Connection String bilgilerini kendi yerel SQL Server ayarlarınıza göre güncelleyin.**

*Çalıştırın:*

**Projeyi Visual Studio ile açın ve F5 tuşuna basarak başlatın.**

📖 Proje Amacı

Bu proje, bir web uygulamasının uçtan uca (Full-stack) geliştirilme sürecini, veritabanı ilişkilerini ve kullanıcı yönetim sistemlerini uygulamalı olarak göstermek amacıyla hazırlanmıştır. Sadece bir blog değil, aynı zamanda kişisel bir dijital kimlik platformudur.

📸 Ekran Görüntüleri

![Homepage](/images/homepage.png)

![Hakkımda](/images/about-me.png)

![Bana Ulaşın](/images/contact-me.png)

![Giriş](/images/login.png)
