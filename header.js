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