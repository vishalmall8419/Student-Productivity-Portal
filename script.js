let loginUser = JSON.parse(sessionStorage.getItem("loguser"));
// alert box


// timer for break, session and timer 
function createTimer(outputElement, storageKey) {


    let savedTime = JSON.parse(sessionStorage.getItem(storageKey)) || {
        hour: 0,
        minute: 0,
        second: 0
    };

    let hour = savedTime.hour;
    let minute = savedTime.minute;
    let second = savedTime.second;

    let interval = null;

    function saveTime() {

        sessionStorage.setItem(storageKey, JSON.stringify({
            hour,
            minute,
            second
        }));

    }

    function updateDisplay() {

        outputElement.innerText =
            `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

    }

    updateDisplay();

    return {

        start() {

            if (interval) return;

            interval = setInterval(() => {

                second++;

                if (second === 60) {
                    second = 0;
                    minute++;
                }

                if (minute === 60) {
                    minute = 0;
                    hour++;
                }

                updateDisplay();

                saveTime();

            }, 1000);

        },

        pause() {

            clearInterval(interval);
            interval = null;

        },

        resume() {

            if (interval) return;

            this.start();

        },

        reset() {

            clearInterval(interval);
            interval = null;

            hour = 0;
            minute = 0;
            second = 0;

            sessionStorage.removeItem(storageKey);

            updateDisplay();

        },

        stop() {

            clearInterval(interval);
            interval = null;

        }

    };

}

// ==========================================
// GLASS ALERT
// ==========================================

const glassAlert = document.getElementById("glassAlert");

const alertTitle = document.getElementById("alertTitle");

const alertMessage = document.getElementById("alertMessage");

const alertIcon = glassAlert.querySelector(".alert-icon i");

const closeAlert = document.getElementById("closeAlert");

let alertTimer = null;


// ==========================================
// SHOW ALERT
// ==========================================

function showAlert(title, message, type = "success") {

    // Stop previous timer
    clearTimeout(alertTimer);

    // Stop previous animation
    gsap.killTweensOf(glassAlert);

    // Reset icon
    alertIcon.className = "";

    // Reset left border
    glassAlert.style.borderColor = "rgba(255,255,255,.18)";



    // =====================================
    // ALERT TYPE
    // =====================================

    switch (type) {

        case "success":

            alertIcon.className = "bi bi-check-circle-fill";

            alertIcon.style.color = "#22c55e";

            glassAlert.style.borderLeft = "5px solid #22c55e";

            break;


        case "error":

            alertIcon.className = "bi bi-x-circle-fill";

            alertIcon.style.color = "#ef4444";

            glassAlert.style.borderLeft = "5px solid #ef4444";

            break;


        case "warning":

            alertIcon.className = "bi bi-exclamation-triangle-fill";

            alertIcon.style.color = "#FACC15";

            glassAlert.style.borderLeft = "5px solid #FACC15";

            break;


        case "info":

            alertIcon.className = "bi bi-info-circle-fill";

            alertIcon.style.color = "#38bdf8";

            glassAlert.style.borderLeft = "5px solid #38bdf8";

            break;

    }



    // =====================================
    // CONTENT
    // =====================================

    alertTitle.innerText = title;

    alertMessage.innerText = message;



    // =====================================
    // SHOW ANIMATION
    // =====================================

    gsap.set(glassAlert, {

        display: "flex"

    });

    gsap.fromTo(

        glassAlert,

        {

            x: 450,

            opacity: 0,

            scale: .9

        },

        {

            x: 0,

            opacity: 1,

            scale: 1,

            duration: .6,

            ease: "back.out(1.7)"

        }

    );



    // =====================================
    // AUTO HIDE
    // =====================================

    alertTimer = setTimeout(hideAlert, 5000);

}



// ==========================================
// HIDE ALERT
// ==========================================

function hideAlert() {

    clearTimeout(alertTimer);

    gsap.to(glassAlert, {

        x: 450,

        opacity: 0,

        scale: .9,

        duration: .45,

        ease: "power2.in",

        onComplete: () => {

            glassAlert.style.display = "none";

        }

    });

}



// ==========================================
// CLOSE BUTTON
// ==========================================

closeAlert.addEventListener("click", hideAlert);




// ===============================
// MAIN ELEMENTS
// ===============================

const progressBar1 = document.getElementById("progressBar");
const cursorGlow1 = document.getElementById("cursorGlow");
const menu1 = document.getElementById("menu");
const themeBtn1 = document.getElementById("themeBtn");






// ===============================
// FORM
// ===============================






// ===============================
// ERROR MESSAGES
// ===============================

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");
const ageError = document.getElementById("ageError");
const genderError = document.getElementById("genderError");
const courseError = document.getElementById("courseError");
const aboutError = document.getElementById("aboutError");
const termsError = document.getElementById("termsError");

const charCounter = document.getElementById("charCounter");

// ===============================
// FORM BUTTONS
// ===============================
const registersection = document.getElementById("register");
const registerBtn = document.getElementById("registerBtn");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {

    // Error messages clear
    nameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";
    phoneError.innerText = "";
    ageError.innerText = "";
    genderError.innerText = "";
    courseError.innerText = "";
    aboutError.innerText = "";
    termsError.innerText = "";

    // Character Counter
    charCounter.innerText = "0 / 200";
});


let students = JSON.parse(localStorage.getItem("students")) || [];


const studentForm = document.getElementById("studentForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const age = document.getElementById("age");

const course = document.getElementById("course");
const about = document.getElementById("about");
const terms = document.getElementById("terms");

about.addEventListener("input", () => {
    charCounter.innerText = `${about.value.length} / 200`;
});

let registrationcheck = localStorage.getItem("registration");

if (registrationcheck === "done") {
    document.getElementById("login").style.display = "flex";
    registersection.style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    registersection.style.display = "flex";
}

studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let formvalidator = true;
    // fullname 

    const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;

    if (fullName.value.trim() === "") {
        formvalidator = false;
        nameError.innerText = "Please enter the Name";

    } else if (fullName.value.trim().length > 2 && fullNameRegex.test(fullName.value.trim())) {

        nameError.innerText = "";
    } else {
        formvalidator = false;
        nameError.innerText = "Please enter your correct Full Name";
    }

    // email

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email.value.trim() === "") {
        formvalidator = false;
        emailError.innerText = "Please enter the email";

    } else if (emailRegex.test(email.value.trim())) {

        const existingStudent = students.find((oldStudent) => {
            return oldStudent.email.trim().toLowerCase() === email.value.trim().toLowerCase();
        });

        if (existingStudent) {
            formvalidator = false;
            emailError.innerText = "This email is already registered.";
            showAlert(
                "Registration Failed",
                "Email already exists.",
                "error"
            );
        } else {
            emailError.innerText = "";
        }


    } else {
        formvalidator = false;
        emailError.innerText = "Please enter your email properly";
    }

    // password


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (password.value.trim() === "") {

        passwordError.innerText = "Please enter the Password";

    } else if (passwordRegex.test(password.value.trim())) {
        passwordError.innerText = "";
    } else {
        passwordError.innerText =
            "Password must contain 8-20 characters, uppercase, lowercase, number and special character.";
    }

    // confirm password


    if (confirmPassword.value.trim() === "") {
        formvalidator = false;
        confirmPasswordError.innerText = "Please enter confirm password";

    } else if (passwordRegex.test(confirmPassword.value.trim())) {
        if (password.value === confirmPassword.value) {

            confirmPasswordError.innerText = "";
        } else {
            formvalidator = false;
            confirmPasswordError.innerText = "Password and Confirm Password should match";
        }
    } else {
        formvalidator = false;
        confirmPasswordError.innerText =
            "Password must contain 8-20 characters, uppercase, lowercase, number and special character.";
    }


    // phone

    const phoneRegex = /^[6-9]\d{9}$/;

    if (phone.value === "") {
        formvalidator = false;
        phoneError.innerText = "Please enter mobile number";

    } else if (phone.value.trim().length < 10) {
        formvalidator = false;
        phoneError.innerText = "Mobile no can't be less than 10 digit";
    } else if (phone.value.trim().length > 10) {
        formvalidator = false;

        phoneError.innerText = "Mobile no can't be greater than 10 digit";

    } else {
        if (phoneRegex.test(phone.value.trim())) {
            phoneError.innerText = "";
        } else {
            formvalidator = false;
            phoneError.innerText = "Please enter a valid 10-digit mobile number";
        }
    }

    // age

    const ageRegex = /^(1\d|[2-9]\d|100)$/;

    if (age.value.trim() === "") {
        formvalidator = false;
        ageError.innerText = "Plase enter your Age";
    } else if (ageRegex.test(age.value.trim())) {

        ageError.innerText = "";
    } else {
        formvalidator = false;
        ageError.innerText = "Please enter a valid age (10–100)";
    }

    // gender

    const selectedGender = document.querySelector('input[name="gender"]:checked');

    if (selectedGender) {

        genderError.innerText = "";
    } else {
        formvalidator = false;
        genderError.innerText = "Please select your gender"
    }


    // course

    if (course.value.trim() === "") {
        formvalidator = false;
        courseError.innerText = "Plese select the course type";
    } else {

        courseError.innerText = "";
    }

    // about

    const aboutRegex = /^[A-Za-z0-9\s.,'"()!?-]{10,200}$/;
    if (about.value.trim() === "") {
        formvalidator = false;
        aboutError.innerText = "Please write about yourself"

    } else if (aboutRegex.test(about.value.trim())) {
        aboutError.innerText = "";

    } else {
        formvalidator = false;
        aboutError.innerText = "Please enter 10-200 valid characters.";
    }

    // terms and condition 

    if (terms.checked) {

        termsError.innerText = ""
    } else {
        formvalidator = false;
        termsError.innerText = "Please read the term and condition and check it"
    }

    if (formvalidator === true) {
        let student = {};
        student.fullName = fullName.value.trim();
        student.email = email.value.trim();
        student.password = confirmPassword.value;
        student.phone = phone.value.trim();
        student.age = age.value.trim();
        student.gender = selectedGender.value;
        student.course = course.value;
        student.about = about.value.trim();
        student.terms = terms.checked;

        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
        showAlert(
            "Registration Successful",
            "Welcome to Student Productivity Portal.",
            "success"
        );

        setTimeout(() => {
            studentForm.style.display = "none";
            document.getElementById("fillform").style.display = "none";
            const mes = document.createElement("div");
            mes.classList.add("messid");
            mes.innerText = "Registration sucessfully compleated";
            document.getElementById("messdetail").append(mes);
            setTimeout(() => {
                registersection.style.display = "none";
                localStorage.setItem("registration", "done")
                document.getElementById("login").style.display = "flex";
            }, 2000);
        }, 2000);

    }

});

// =====================================
// Login section
// =====================================


const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const rememberMe = document.querySelector("#rememberMe");
const loginBtn = document.querySelector("#loginBtn");
const clearBtn = document.querySelector("#clearBtn");
const loginEmailError = document.querySelector("#loginEmailError");
const registernowbtn = document.querySelector("#registernowbtn");


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(students);
    const emailExists = students.some((student) =>
        student.email.trim().toLowerCase() === loginEmail.value.trim().toLowerCase()
    );

    if (emailExists) {
        loginEmailError.innerText = "";
    } else {
        loginEmailError.innerText = "This email does not exist";
    }

    const currentStudent = students.find((allstudents) => {

        if (allstudents.email.toLowerCase().trim() === loginEmail.value.trim().toLowerCase() && allstudents.password === loginPassword.value) {
            // Login successful
            if (rememberMe.checked) {
                localStorage.setItem("rememberUser", loginEmail.value);
            } else {
                localStorage.removeItem("rememberUser");
            }
            return allstudents;
        }

    });
    if (currentStudent) {

        sessionStorage.setItem(
            "loguser", JSON.stringify(currentStudent)
        );

        location.href = "index.html";


    } else {
        showAlert(
            "Login Failed",
            "Invalid email or password. Please try again.",
            "error"
        );
    }
});




if (loginUser) {
    document.getElementById("dashboard").style.display = "flex";
    document.getElementById("login").style.display = "none";
    document.getElementById("studySection").style.display = "flex";
    document.getElementById("breaktimersection").style.display = "flex";
    document.getElementById("storage").style.display = "flex";
    document.getElementById("profileandactivitilog").style.display = "flex";
    document.getElementById("logoutBtn").style.display = "block";
    document.getElementById("heroregisterbtn").style.display = "none";


} else {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "flex";
    document.getElementById("studySection").style.display = "none";
    document.getElementById("breaktimersection").style.display = "none";
    document.getElementById("storage").style.display = "none";
    document.getElementById("profileandactivitilog").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("logoutBtn").classList.remove("d-flex");
}

registernowbtn.addEventListener("click", () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "flex";

});

// ===============================
// DASHBOARD
// ===============================



const welcomeName = document.getElementById("welcomeName");
const welcomeMessage = document.getElementById("welcomeMessage");
const editProfileBtn0 = document.getElementById("editProfileBtn");


const editName = document.querySelector("#editName");
const editEmail = document.querySelector("#editEmail");
const editPhone = document.querySelector("#editPhone");
const editAge = document.querySelector("#editAge");
const editCourse = document.querySelector("#editCourse");
const editGender = document.querySelector("#editGender");

editProfileBtn0.addEventListener("click", () => {
    const loginUser = JSON.parse(
        sessionStorage.getItem("loguser")
    );

    editName.value = loginUser.fullName;
    editEmail.value = loginUser.email;
    editPhone.value = loginUser.phone;
    editAge.value = loginUser.age;
    editCourse.value = loginUser.course;
    editGender.value = loginUser.gender;

    editModal.show();


});




if (loginUser) {
    welcomeName.innerText = loginUser.fullName;
    welcomeMessage.innerText = "Keep learning, stay consistent, and make today another successful day.";
}

const liveClock = document.getElementById("liveClock");
const todayDate = document.getElementById("todayDate");


setInterval(() => {
    let d = new Date();
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");

    liveClock.innerText = `${h}:${m}:${s}`;

    todayDate.innerText = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}, 1);

const dashboardThemeBtn = document.getElementById("dashboardThemeBtn");

const sessionTimer = document.getElementById("sessionTimer");



let getsessiontimer = createTimer(sessionTimer, "sessionTimestore");
if (loginUser) {
    getsessiontimer.start();
}


// ===============================
// STUDY TIMER
// ===============================

const studySection = document.getElementById("studySection");
const timerStatus = document.getElementById("timerStatus");
const studyTimer = document.getElementById("studyTimer");

const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resumeTimerBtn = document.getElementById("resumeTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");


let getstudytime = createTimer(studyTimer, "studytimestore");
if (loginUser) {
    let st = JSON.parse(sessionStorage.getItem("studytimestore"));
    let sts = sessionStorage.getItem("studytimestorestate");
    if (st) {
        if (sts !== "pause") {
            getstudytime.start();
        }
    }
    startTimerBtn.addEventListener("click", () => {
        sessionStorage.setItem("studytimestorestate", "start");
        getstudytime.start();
    });
    pauseTimerBtn.addEventListener("click", () => {
        getstudytime.stop();
        sessionStorage.setItem("studytimestorestate", "pause");

    });
    resumeTimerBtn.addEventListener("click", () => {
        getstudytime.resume();
        sessionStorage.setItem("studytimestorestate", "start");
    });
    resetTimerBtn.addEventListener("click", () => {
        getstudytime.reset();
    });
}

// ===============================
// NOTIFICATION
// ===============================

const notificationBox = document.getElementById("notificationBox");
const showNotificationBtn = document.getElementById("showNotificationBtn");
const hideNotificationBtn = document.getElementById("hideNotificationBtn");

// ===============================
// QUOTES
// ===============================

const quoteNumber = document.getElementById("quoteNumber");
const quoteText = document.getElementById("quoteText");

const nextQuoteBtn = document.getElementById("nextQuoteBtn");
const autoQuoteBtn = document.getElementById("autoQuoteBtn");
const stopQuoteBtn = document.getElementById("stopQuoteBtn");




fetch("quotes (1).json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const randomNumber = Math.floor(Math.random() * data.length);
        quoteText.innerText = data[randomNumber].quote;
    });

// ===============================
// BREAK TIMER
// ===============================

const breakTimer = document.getElementById("breakTimer");
const startBreakBtn = document.getElementById("startBreakBtn");

let getbreaktime = createTimer(breakTimer, "breaktimestore");
if (loginUser) {
    startBreakBtn.addEventListener("click", () => {
        getbreaktime.start();
    });
    setTimeout(() => {
        getbreaktime.stop();
        getbreaktime.reset();

        // for beep

        setTimeout(() => {

            const audioContext = new AudioContext();

            const oscillator = audioContext.createOscillator();

            oscillator.type = "sine";      // sine, square, triangle, sawtooth
            oscillator.frequency.value = 700;

            oscillator.connect(audioContext.destination);

            oscillator.start();

            setTimeout(() => {
                oscillator.stop();
            }, 4000);

        }, 100);

    }, 1000 * 60 * 5);
}

// ===============================
// STUDY PROGRESS
// ===============================

// ===============================
// LOCAL STORAGE
// ===============================

const localName = document.getElementById("localName");
const localTheme = document.getElementById("localTheme");

const saveLocalBtn = document.getElementById("saveLocalBtn");
const getLocalBtn = document.getElementById("getLocalBtn");
const removeLocalBtn = document.getElementById("removeLocalBtn");
const clearLocalBtn = document.getElementById("clearLocalBtn");

// ===============================
// SESSION STORAGE
// ===============================

const sessionUser = document.getElementById("sessionUser");
const sessionTime = document.getElementById("sessionTime");

const saveSessionBtn = document.getElementById("saveSessionBtn");
const getSessionBtn = document.getElementById("getSessionBtn");
const removeSessionBtn = document.getElementById("removeSessionBtn");

// ===============================
// COOKIES
// ===============================

const cookieValue = document.getElementById("cookieValue");

const createCookieBtn = document.getElementById("createCookieBtn");
const readCookieBtn = document.getElementById("readCookieBtn");
const deleteCookieBtn = document.getElementById("deleteCookieBtn");

// ===============================
// profile
// ===============================

const profileEdit = document.querySelector("#profileedit");
const outputData = document.querySelector("#outputData");
const profileName = document.querySelector("#profilename");
const profileEmail = document.querySelector("#profileemail");
const profileCourse = document.querySelector("#profilecourse");
const profilePhone = document.querySelector("#profilephone");
const profileAge = document.querySelector("#profileage");
const profileGender = document.querySelector("#profilegender");

if (loginUser) {
    profileName.innerText = loginUser.fullName;
    profileEmail.innerText = loginUser.email;
    profilePhone.innerText = loginUser.phone;
    profileAge.innerText = loginUser.age;
    profileCourse.innerText = loginUser.course;
    profileGender.innerText = loginUser.gender;
}



// edit profile

const saveProfileBtn = document.querySelector("#saveProfileBtn");




const editModal = new bootstrap.Modal(
    document.getElementById("editProfileModal")
);

profileEdit.addEventListener("click", () => {

    const loginUser = JSON.parse(
        sessionStorage.getItem("loguser")
    );

    editName.value = loginUser.fullName;
    editEmail.value = loginUser.email;
    editPhone.value = loginUser.phone;
    editAge.value = loginUser.age;
    editCourse.value = loginUser.course;
    editGender.value = loginUser.gender;

    editModal.show();

});

saveProfileBtn.addEventListener("click", () => {

    let loginUser = JSON.parse(
        sessionStorage.getItem("loguser")
    );

    loginUser.fullName = editName.value.trim();
    loginUser.email = editEmail.value.trim();
    loginUser.phone = editPhone.value.trim();
    loginUser.age = editAge.value;
    loginUser.course = editCourse.value;
    loginUser.gender = editGender.value;

    sessionStorage.setItem(
        "loguser",
        JSON.stringify(loginUser)
    );

    editModal.hide();

    showAlert(
        "Success",
        "Profile updated successfully.",
        "success"
    );
    setTimeout(() => {
        location.href = "index.html";

    }, 2000);
});

// ===============================
// ACTIVITY LOG
// ===============================

const clearLogsBtn = document.getElementById("clearLogsBtn");
const activityLog = document.getElementById("activityLog");

// ===============================
// STATISTICS
// ===============================

const totalRegistrations1 = document.getElementById("totalRegistrations");




totalRegistrations1.innerText = students.length;

(function f() {
    let theme = localStorage.getItem("theme") || "light-theme";
    document.body.classList.add(theme);

})();


themeBtn1.addEventListener("click", () => {

    let theme = localStorage.getItem("theme") || "light-theme";


    if (theme === "dark-mode") {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    }
});
dashboardThemeBtn.addEventListener("click", () => {
    let theme = localStorage.getItem("theme") || "light-theme";


    if (theme === "dark-mode") {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    }
});







// =========================================
// logout 

// =========================================

const logoutBtn = document.getElementById("logoutBtn");

let moved = false;

Draggable.create(logoutBtn, {

    type: "x,y",

    bounds: window,

    inertia: true,

    onPress() {

        moved = false;

    },

    onDrag() {

        moved = true;

    },

    onRelease() {

        if (!moved) {

            logout();

        }

    }

});

function logout() {

    if (confirm("Do you really want to logout?")) {
        sessionStorage.clear();
        location.href = "index.html"
        loginForm.style.display = "block";
        getsessiontimer.reset();
        getstudytime.reset()
        getbreaktime.reset();

    }

}









// =====================================
// COOKIE FUNCTIONS for remember me
// =====================================

function setCookie(name, value, days = 30) {

    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie =
        `${name}=${encodeURIComponent(value)};
        expires=${date.toUTCString()};
        path=/`;

}

function getCookie(name) {

    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {

        let [key, value] = cookie.trim().split("=");

        if (key === name) {

            return decodeURIComponent(value);

        }

    }

    return null;

}

function deleteCookie(name) {

    document.cookie =
        `${name}=;
        expires=Thu, 01 Jan 1970 00:00:00 UTC;
        path=/`;

}

if (rememberMe.checked) {

    setCookie("rememberMe", "true");

    setCookie("rememberUser", currentStudent.email);

} else {

    deleteCookie("rememberMe");

    deleteCookie("rememberUser");

}
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        setCookie("theme", "dark");

    } else {

        setCookie("theme", "light");

    }

});
window.addEventListener("DOMContentLoaded", () => {

    // Theme

    const theme = getCookie("theme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

    }

    // Remember User

    const remember = getCookie("rememberMe");

    const email = getCookie("rememberUser");

    if (remember === "true" && email) {

        loginEmail.value = email;

        rememberMe.checked = true;

    }

});
logoutBtn.addEventListener("click", () => {

    sessionStorage.removeItem("loguser");

    deleteCookie("rememberMe");

    deleteCookie("rememberUser");

    location.reload();

});



// ===============================================
// STUDENT STATISTICS
// ===============================================

let statistics = JSON.parse(localStorage.getItem("statistics"));

if (!statistics) {

    statistics = {

        todayStudyMinute: 0,
        totalStudyMinute: 0,

        dailyGoalMinute: 240,      // 4 Hours

        completedSession: 0,
        breakTaken: 0,

        loginCount: 0,
        quotesViewed: 0,

        lastStudyDate: new Date().toLocaleDateString()

    };

    localStorage.setItem(
        "statistics",
        JSON.stringify(statistics)
    );

}



// ===============================================
// RESET TODAY STUDY EVERY NEW DAY
// ===============================================

const today = new Date().toLocaleDateString();

if (statistics.lastStudyDate !== today) {

    statistics.todayStudyMinute = 0;

    statistics.lastStudyDate = today;

    localStorage.setItem(
        "statistics",
        JSON.stringify(statistics)
    );

}



// ===============================================
// DASHBOARD ELEMENTS
// ===============================================

const dailyGoal = document.getElementById("dailyGoal");

const goalProgress = document.getElementById("goalProgress");

const studyCompleted =
    document.getElementById("studyCompleted");

const studyHours =
    document.getElementById("studyHours");



// ===============================================
// UPDATE DASHBOARD
// ===============================================

function updateDashboardStatistics() {

    // Today's Study

    let todayHour =
        Math.floor(statistics.todayStudyMinute / 60);

    let todayMinute =
        statistics.todayStudyMinute % 60;

    studyCompleted.innerText =
        `${todayHour}h ${todayMinute}m`;



    // Lifetime Study

    let totalHour =
        Math.floor(statistics.totalStudyMinute / 60);

    let totalMinute =
        statistics.totalStudyMinute % 60;

    studyHours.innerText =
        `${totalHour}h ${totalMinute}m`;



    // Goal Percentage

    let percent = Math.floor(

        (statistics.todayStudyMinute /

            statistics.dailyGoalMinute) * 100

    );



    if (percent > 100) {

        percent = 100;

    }



    dailyGoal.innerText = percent + "%";

    goalProgress.style.width =
        percent + "%";

}



// ===============================================
// SAVE STATISTICS
// ===============================================

function saveStatistics() {

    localStorage.setItem(

        "statistics",

        JSON.stringify(statistics)

    );

}



// ===============================================
// CALL FIRST TIME
// ===============================================

updateDashboardStatistics();

// ===============================================
// LOGIN COUNT
// ===============================================

if (loginUser && !sessionStorage.getItem("loginCountDone")) {

    statistics.loginCount++;

    sessionStorage.setItem("loginCountDone", "yes");

    saveStatistics();

}



// ===============================================
// STATISTICS CARDS
// ===============================================

const loginCount =
    document.getElementById("loginCount");

const quoteViewed =
    document.getElementById("quoteViewed");

const totalRegistrations =
    document.getElementById("totalRegistrations");



function updateCards() {

    totalRegistrations.innerText =
        students.length;

    loginCount.innerText =
        statistics.loginCount;

    quoteViewed.innerText =
        statistics.quotesViewed;

}

updateCards();



// ===============================================
// QUOTES
// ===============================================

let quotes = [];

let quoteInterval = null;



fetch("quotes (1).json")

    .then(res => res.json())

    .then(data => {

        quotes = data;

        showRandomQuote();

    });



function showRandomQuote() {

    if (quotes.length === 0) return;

    const random =
        Math.floor(Math.random() * quotes.length);

    quoteNumber.innerText =
        `Quote #${quotes[random].id}`;

    quoteText.innerText =
        quotes[random].quote;

    statistics.quotesViewed++;

    saveStatistics();

    updateCards();

}



// ===============================================
// NEXT
// ===============================================

nextQuoteBtn.addEventListener("click", () => {

    showRandomQuote();

});



// ===============================================
// AUTO REFRESH
// ===============================================

autoQuoteBtn.addEventListener("click", () => {

    clearInterval(quoteInterval);

    autoQuoteBtn.innerText =
        "Auto Refresh ON";

    quoteInterval = setInterval(() => {

        showRandomQuote();

    }, 5000);

});



// ===============================================
// STOP AUTO
// ===============================================

stopQuoteBtn.addEventListener("click", () => {

    clearInterval(quoteInterval);

    autoQuoteBtn.innerText =
        "Auto Refresh OFF";

});



// ===============================================
// STUDY TIMER
// ===============================================

let studyMinuteInterval = null;



startTimerBtn.addEventListener("click", () => {

    clearInterval(studyMinuteInterval);

    studyMinuteInterval = setInterval(() => {

        statistics.todayStudyMinute++;

        statistics.totalStudyMinute++;

        saveStatistics();

        updateDashboardStatistics();

    }, 60000);

});



// ===============================================
// PAUSE
// ===============================================

pauseTimerBtn.addEventListener("click", () => {

    clearInterval(studyMinuteInterval);

});



// ===============================================
// RESUME
// ===============================================

resumeTimerBtn.addEventListener("click", () => {

    clearInterval(studyMinuteInterval);

    studyMinuteInterval = setInterval(() => {

        statistics.todayStudyMinute++;

        statistics.totalStudyMinute++;

        saveStatistics();

        updateDashboardStatistics();

    }, 60000);

});



// ===============================================
// RESET
// ===============================================

resetTimerBtn.addEventListener("click", () => {

    clearInterval(studyMinuteInterval);

    statistics.completedSession++;

    saveStatistics();

});



// ===============================================
// BREAK
// ===============================================

startBreakBtn.addEventListener("click", () => {

    statistics.breakTaken++;

    saveStatistics();

});



// ===============================================
// FINAL UPDATE
// ===============================================

updateDashboardStatistics();

updateCards();



// =====================================================
// TODAY GOAL BUTTON + MODAL (JS ONLY)
// =====================================================

// ---------------------------
// Create Button
// ---------------------------

const goalCard = document.querySelector("#dailyGoal").closest(".dashboard-card");

const setGoalBtn = document.createElement("button");

setGoalBtn.id = "setGoalBtn";

setGoalBtn.className =
"btn btn-warning rounded-pill mt-3 w-100";

setGoalBtn.innerHTML = `
<i class="bi bi-bullseye"></i>
Set Today's Goal
`;

goalCard.appendChild(setGoalBtn);


// ---------------------------
// Create Modal
// ---------------------------

const goalModalHTML = `

<div class="modal fade" id="goalModal" tabindex="-1">

<div class="modal-dialog modal-dialog-centered">

<div class="modal-content bg-dark text-light border-warning">

<div class="modal-header">

<h5 class="modal-title">

<i class="bi bi-bullseye text-warning"></i>

Today's Study Goal

</h5>

<button
class="btn-close btn-close-white"
data-bs-dismiss="modal">
</button>

</div>

<div class="modal-body">

<div class="mb-3">

<label class="form-label">

Hours

</label>

<input
type="number"
id="goalHour"
class="form-control"
min="0"
max="24"
value="4">

</div>


<div class="mb-3">

<label class="form-label">

Minutes

</label>

<input
type="number"
id="goalMinute"
class="form-control"
min="0"
max="59"
value="0">

</div>

</div>

<div class="modal-footer">

<button
class="btn btn-secondary"
data-bs-dismiss="modal">

Cancel

</button>

<button
id="saveGoalBtn"
class="btn btn-warning">

Save Goal

</button>

</div>

</div>

</div>

</div>

`;

document.body.insertAdjacentHTML(
"beforeend",
goalModalHTML
);


// ---------------------------
// Bootstrap Modal
// ---------------------------

const goalModal =
new bootstrap.Modal(
document.getElementById("goalModal")
);


// ---------------------------
// Open Modal
// ---------------------------

setGoalBtn.addEventListener("click",()=>{

const savedGoal=
JSON.parse(localStorage.getItem("todayGoal"));

if(savedGoal){

goalHour.value=savedGoal.hour;

goalMinute.value=savedGoal.minute;

}

goalModal.show();

});
// =====================================================
// SAVE TODAY GOAL
// =====================================================

const saveGoalBtn = document.getElementById("saveGoalBtn");

const goalHour = document.getElementById("goalHour");

const goalMinute = document.getElementById("goalMinute");



saveGoalBtn.addEventListener("click", () => {

    let hour = Number(goalHour.value);

    let minute = Number(goalMinute.value);



    if (hour < 0 || minute < 0 || minute > 59) {

        showAlert(
            "Invalid Goal",
            "Please enter a valid study goal.",
            "error"
        );

        return;

    }



    const totalMinute = (hour * 60) + minute;



    const goalObject = {

        hour,
        minute,
        totalMinute

    };



    localStorage.setItem(

        "todayGoal",

        JSON.stringify(goalObject)

    );



    updateTodayGoal();



    goalModal.hide();



    showAlert(

        "Goal Saved",

        `Today's Goal is ${hour} Hour ${minute} Minute.`,

        "success"

    );



});



// =====================================================
// LOAD TODAY GOAL
// =====================================================

function loadTodayGoal() {

    const goal = JSON.parse(

        localStorage.getItem("todayGoal")

    );



    if (!goal) {

        return;

    }



    goalHour.value = goal.hour;

    goalMinute.value = goal.minute;

}



loadTodayGoal();



// =====================================================
// UPDATE GOAL
// =====================================================

function updateTodayGoal() {

    const goal = JSON.parse(

        localStorage.getItem("todayGoal")

    );



    if (!goal) {

        dailyGoal.innerText = "0%";

        goalProgress.style.width = "0%";

        return;

    }



    const studyData = JSON.parse(

        sessionStorage.getItem("studytimestore")

    );



    if (!studyData) {

        dailyGoal.innerText = "0%";

        goalProgress.style.width = "0%";

        return;

    }



    const studyMinute =

        (studyData.hour * 60)

        + studyData.minute;



    let percent = Math.floor(

        (studyMinute / goal.totalMinute) * 100

    );



    if (percent > 100) {

        percent = 100;

    }



    dailyGoal.innerText = percent + "%";



    gsap.to(goalProgress, {

        width: percent + "%",

        duration: .8,

        ease: "power2.out"

    });

}



updateTodayGoal();



// =====================================================
// AUTO UPDATE
// =====================================================

setInterval(() => {

    updateTodayGoal();

},1000);

// =====================================================
// BREAK BUTTON + MODAL
// =====================================================

// ----------------------------
// Create Button
// ----------------------------

const breakCard = document
    .querySelector("#breakTimer")
    .closest(".dashboard-card");

const setBreakBtn = document.createElement("button");

setBreakBtn.id = "setBreakBtn";

setBreakBtn.className =
    "btn btn-warning rounded-pill mt-3 w-100";

setBreakBtn.innerHTML = `
<i class="bi bi-cup-hot-fill"></i>
Set Break Time
`;

breakCard.appendChild(setBreakBtn);


// ----------------------------
// Create Modal
// ----------------------------

const breakModalHTML = `

<div class="modal fade"
id="breakModal"
tabindex="-1">

<div class="modal-dialog modal-dialog-centered">

<div class="modal-content bg-dark text-light border-warning">

<div class="modal-header">

<h5 class="modal-title">

<i class="bi bi-cup-hot-fill text-warning"></i>

Break Timer

</h5>

<button
class="btn-close btn-close-white"
data-bs-dismiss="modal">
</button>

</div>

<div class="modal-body">

<div class="mb-3">

<label class="form-label">

Hours

</label>

<input
type="number"
id="breakHour"
class="form-control"
min="0"
max="10"
value="0">

</div>

<div class="mb-3">

<label class="form-label">

Minutes

</label>

<input
type="number"
id="breakMinute"
class="form-control"
min="1"
max="59"
value="5">

</div>

</div>

<div class="modal-footer">

<button
class="btn btn-secondary"
data-bs-dismiss="modal">

Cancel

</button>

<button
id="saveBreakBtn"
class="btn btn-warning">

Save Break

</button>

</div>

</div>

</div>

</div>

`;

document.body.insertAdjacentHTML(
    "beforeend",
    breakModalHTML
);


// ----------------------------
// Bootstrap Modal
// ----------------------------

const breakModal =
new bootstrap.Modal(
document.getElementById("breakModal")
);


// ----------------------------
// Open Modal
// ----------------------------

setBreakBtn.addEventListener("click",()=>{

const savedBreak=
JSON.parse(
localStorage.getItem("breakGoal")
);

if(savedBreak){

breakHour.value=savedBreak.hour;

breakMinute.value=savedBreak.minute;

}

breakModal.show();

});


// =====================================================
// SAVE BREAK TIME
// =====================================================

const breakHour =
document.getElementById("breakHour");

const breakMinute =
document.getElementById("breakMinute");

const saveBreakBtn =
document.getElementById("saveBreakBtn");



saveBreakBtn.addEventListener("click",()=>{

const hour=Number(breakHour.value);

const minute=Number(breakMinute.value);

if(hour<0 || minute<0 || minute>59){

showAlert(
"Invalid Time",
"Please enter valid break time.",
"error"
);

return;

}

const totalMinute=(hour*60)+minute;

localStorage.setItem(

"breakGoal",

JSON.stringify({

hour,
minute,
totalMinute

})

);

updateBreakDisplay();

breakModal.hide();

showAlert(

"Break Updated",

`Break Time set to ${hour} Hour ${minute} Minute`,

"success"

);

});



// =====================================================
// LOAD BREAK
// =====================================================

function loadBreakGoal(){

const breakData=

JSON.parse(

localStorage.getItem("breakGoal")

);

if(!breakData)return;

breakHour.value=breakData.hour;

breakMinute.value=breakData.minute;

}

loadBreakGoal();



// =====================================================
// UPDATE BREAK DISPLAY
// =====================================================

function updateBreakDisplay(){

const breakData=

JSON.parse(

localStorage.getItem("breakGoal")

);

if(!breakData){

breakTimer.innerText="00:05:00";

return;

}

breakTimer.innerText=

`${String(breakData.hour).padStart(2,"0")}:${String(breakData.minute).padStart(2,"0")}:00`;

}

updateBreakDisplay();

