
// =====================================
// FINEDGE - JAVASCRIPT
// =====================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// 2. DARK AND LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        themeToggle.textContent = darkMode ? "☀️" : "🌙";

        themeToggle.setAttribute(
            "aria-label",
            darkMode ? "Switch to light mode" : "Switch to dark mode"
        );

    });

}


// 3. SIP CALCULATOR

const calculateButton = document.getElementById("calculateSIP");

if (calculateButton) {

    calculateButton.addEventListener("click", () => {

        const monthlyInvestment = Number(
            document.getElementById("monthlyInvestment").value
        );

        const annualReturn = Number(
            document.getElementById("annualReturn").value
        );

        const years = Number(
            document.getElementById("investmentYears").value
        );

        const errorMessage =
            document.getElementById("calculatorError");

        // Check inputs

        if (
            !Number.isFinite(monthlyInvestment) ||
            !Number.isFinite(annualReturn) ||
            !Number.isFinite(years) ||
            monthlyInvestment <= 0 ||
            annualReturn < 0 ||
            annualReturn > 100 ||
            !Number.isInteger(years) ||
            years < 1 ||
            years > 50
        ) {

            errorMessage.textContent =
                "Please enter valid investment details.";

            return;

        }

        errorMessage.textContent = "";

        // SIP calculation

        const months = years * 12;

        const monthlyRate = annualReturn / 12 / 100;

        let futureValue;

        if (monthlyRate === 0) {

            futureValue = monthlyInvestment * months;

        } else {

            futureValue =
                monthlyInvestment *
                ((Math.pow(1 + monthlyRate, months) - 1) /
                monthlyRate) *
                (1 + monthlyRate);

        }

        const totalInvestment =
            monthlyInvestment * months;

        const estimatedReturns =
            futureValue - totalInvestment;

        // Format Indian currency

        const formatCurrency = amount => {

            return amount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            });

        };

        // Display results

        document.getElementById("totalInvestment").textContent =
            formatCurrency(totalInvestment);

        document.getElementById("estimatedReturns").textContent =
            formatCurrency(estimatedReturns);

        document.getElementById("futureValue").textContent =
            formatCurrency(futureValue);

    });

}


// Calculate default SIP result when website opens

if (calculateButton) {
    calculateButton.click();
}


// 4. ANIMATED STATISTICS

const statNumbers = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;

        const target = Number(element.dataset.target);
        const suffix = element.dataset.suffix || "";

        const duration = 1500;
        const startTime = performance.now();

        function animate(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const currentValue = target * progress;

            element.textContent =
                Math.round(currentValue) + suffix;

            if (progress < 1) {

                requestAnimationFrame(animate);

            }

        }

        requestAnimationFrame(animate);

        observer.unobserve(element);

    });

}, { threshold: 0.5 });

statNumbers.forEach(number => {
    observer.observe(number);
});


// 5. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        if (!name || !email || !message) {

            formMessage.textContent =
                "Please complete all fields.";

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;

        }

        formMessage.textContent =
            "Thank you, " + name +
            "! Your form passed validation. No message was sent.";

        contactForm.reset();

    });

}


// 6. AUTOMATIC FOOTER YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// 7. WEBSITE STARTUP MESSAGE

console.log("FinEdge website loaded successfully!");
console.log("HTML, CSS and JavaScript are connected.");
