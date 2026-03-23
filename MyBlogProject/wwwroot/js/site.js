document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            navbarToggler.setAttribute('aria-expanded', 
                navbarCollapse.classList.contains('show') ? 'true' : 'false');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (!this.classList.contains('dropdown-toggle')) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });

            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideDropdown = event.target.closest('.dropdown');
        if (!isClickInsideDropdown) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});

const createCardHTML = (p, isWeb = false) => `
    <div class="col-md-6 col-lg-4 mb-4">
        <div class="card bg-secondary border-0 h-100 shadow-lg rounded-4 overflow-hidden text-white">
            <div class="p-4 text-center bg-${isWeb ? 'primary' : p.color} bg-opacity-10">
                <i class='bx ${p.icon} fs-1 text-${isWeb ? 'primary' : p.color}'></i>
            </div>
            <div class="card-body p-4 d-flex flex-column">
                <h5 class="fw-bold">${p.title}</h5>
                <p class="text-muted small">${isWeb ? p.desc : p.description}</p>
                <div class="mt-auto">
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        ${p.tech.map(t => `<span class="badge bg-dark text-${isWeb ? 'primary' : p.color} border border-${isWeb ? 'primary' : p.color} border-opacity-25">${t}</span>`).join('')}
                    </div>
                    <a href="${p.link}" target="_blank" class="btn btn-outline-${isWeb ? 'primary' : p.color} btn-sm rounded-pill w-100">İncele</a>
                </div>
            </div>
        </div>
    </div>`

async function fetchNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.webtekno.com/rss.xml');
        const data = await response.json();

        container.innerHTML = data.items.slice(0, 3).map(item => `
            <div class="col-md-4">
                <div class="card bg-secondary border-0 h-100 shadow rounded-4 text-white overflow-hidden">
                    <a href="${item.link}" target="_blank" class="text-decoration-none">
                        <img src="${item.enclosure?.link || item.thumbnail || 'https://via.placeholder.com/400x250?text=Haber'}" 
                             class="card-img-top" style="height: 200px; object-fit: cover;">
                        <div class="card-body"><h6 class="text-white mb-0">${item.title}</h6></div>
                    </a>
                </div>
            </div>`).join('');
    } catch (e) { container.innerHTML = '<p class="text-muted">Haberler yüklenemedi.</p>'; }
}

async function loadAutomationProjects() {
    const container = document.getElementById('automation-container');
    if (!container) return;
    try {
        const res = await fetch('/data/projects.json');
        const projects = await res.json();
        container.innerHTML = projects.map(p => createCardHTML(p)).join('');
    } catch (e) { console.error("JSON Hatası:", e); }
}

function loadWebApps() {
    const container = document.getElementById('web-apps-container');
    if (!container) return;

    const webProjects = [
        { title: "E-Ticaret Paneli", desc: ".NET 8 ve EF Core ile stok yönetimi.", tech: [".NET 8", "MSSQL"], icon: "bx-shopping-bag", link: "#" },
        { title: "Restoran Rezervasyon", desc: "SignalR ile anlık masa takibi.", tech: ["SignalR", "Bootstrap"], icon: "bx-restaurant", link: "#" },
        { title: "Mimari Portfolyo CMS", desc: "Dinamik içerik yönetim sistemi.", tech: ["Razor Pages", "PostgreSQL"], icon: "bx-layout", link: "#" }
    ];
    container.innerHTML = webProjects.map(p => createCardHTML(p, true)).join('');
}

function initFormControls() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.onclick = function () {
            const input = document.getElementById(this.dataset.target || 'password');
            const icon = this.querySelector('i');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('bx-hide');
            icon.classList.toggle('bx-show');
        };
    });

    const passInput = document.getElementById('password');
    if (passInput) {
        passInput.oninput = function () {
            const val = this.value;
            document.getElementById('check-length').className = val.length >= 6 ? 'valid' : 'invalid';
            document.getElementById('check-uppercase').className = /[A-Z]/.test(val) ? 'valid' : 'invalid';
            document.getElementById('check-number').className = /[0-9]/.test(val) ? 'valid' : 'invalid';
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    loadAutomationProjects();
    loadWebApps();
    initFormControls();
});

document.addEventListener('DOMContentLoaded', function () {

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerForm = document.getElementById('registerForm');

    if (!registerForm) return;

    document.querySelectorAll('.toggle-password').forEach(function (button) {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bx-hide', 'bx-show');
            } else {
                input.type = 'password';
                icon.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    const checkLength = document.getElementById('check-length');
    const checkUppercase = document.getElementById('check-uppercase');
    const checkNumber = document.getElementById('check-number');
    const passwordMatchInfo = document.getElementById('passwordMatch');

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length >= 6) checkLength.classList.add('text-success');
        else checkLength.classList.remove('text-success');

        if (/[A-Z]/.test(password)) checkUppercase.classList.add('text-success');
        else checkUppercase.classList.remove('text-success');

        if (/[0-9]/.test(password)) checkNumber.classList.add('text-success');
        else checkNumber.classList.remove('text-success');

        if (confirmPassword) {
            if (password === confirmPassword) {
                passwordMatchInfo.innerHTML = '<i class="bx bx-check-circle text-success"></i> Şifreler eşleşiyor';
            } else {
                passwordMatchInfo.innerHTML = '<i class="bx bx-x-circle text-danger"></i> Şifreler eşleşmiyor';
            }
        }
    }

    passwordInput?.addEventListener('input', validatePasswords);
    confirmPasswordInput?.addEventListener('input', validatePasswords);

});

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordMatchInfo = document.getElementById("passwordMatch");

    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const input = document.getElementById(targetId);
            const icon = this.querySelector("i");

            if (input.type === "password") {
                input.type = "text";
                icon.classList.replace("bx-hide", "bx-show");
            } else {
                input.type = "password";
                icon.classList.replace("bx-show", "bx-hide");
            }
        });
    });

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword) {
            if (password === confirmPassword) {
                passwordMatchInfo.innerHTML =
                    '<i class="bx bx-check-circle text-success"></i> Şifreler eşleşiyor';
            } else {
                passwordMatchInfo.innerHTML =
                    '<i class="bx bx-x-circle text-danger"></i> Şifreler eşleşmiyor';
            }
        }
    }

    passwordInput?.addEventListener("input", validatePasswords);
    confirmPasswordInput?.addEventListener("input", validatePasswords);

    registerForm.addEventListener("submit", function (e) {

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (fullName.length < 3) {
            e.preventDefault();
            alert("Ad Soyad en az 3 karakter olmalıdır!");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            e.preventDefault();
            alert("Geçerli bir e-posta adresi girin!");
            return;
        }

        if (username.length < 3) {
            e.preventDefault();
            alert("Kullanıcı adı en az 3 karakter olmalıdır!");
            return;
        }

        if (password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password)) {
            e.preventDefault();
            alert("Şifre en az 6 karakter, 1 büyük harf ve 1 sayı içermelidir!");
            return;
        }

        if (password !== confirmPassword) {
            e.preventDefault();
            alert("Şifreler eşleşmiyor!");
        }
    });
});