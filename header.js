document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (
            href &&
            !href.startsWith("#") &&
            !link.hasAttribute("target")
        ) {

            link.addEventListener("click", function (e) {

                e.preventDefault();

                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = href;
                }, 400);

            });

        }

    });

});

// Hamburger nav toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            const expanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !expanded);
            toggle.classList.toggle("open");
            nav.classList.toggle("open");
        });
    }
});