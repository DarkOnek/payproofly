/* =========================================================
   PAYPROOFLY
   Main JavaScript
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const searchInput = document.getElementById("search");
const searchStatus = document.getElementById("searchStatus");

const cards = Array.from(
    document.querySelectorAll(".card")
);

const categorySections = Array.from(
    document.querySelectorAll(".category-section")
);


/* =========================================================
   SEARCH
   ========================================================= */

function filterApps() {

    const query = searchInput.value
        .trim()
        .toLowerCase();

    let visibleCards = 0;

    cards.forEach((card) => {

        const name = (
            card.dataset.name || ""
        ).toLowerCase();

        const category = (
            card.dataset.category || ""
        ).toLowerCase();

        const text = (
            card.textContent || ""
        ).toLowerCase();

        const matches =
            query === "" ||
            name.includes(query) ||
            category.includes(query) ||
            text.includes(query);

        if (matches) {
            card.classList.remove("is-hidden");
            visibleCards++;
        } else {
            card.classList.add("is-hidden");
        }

    });


    /*
     * Hide entire categories when
     * none of their cards are visible.
     */

    categorySections.forEach((section) => {

        const sectionCards = Array.from(
            section.querySelectorAll(".card")
        );

        const hasVisibleCard = sectionCards.some(
            (card) => !card.classList.contains("is-hidden")
        );

        if (hasVisibleCard) {
            section.classList.remove("is-hidden");
        } else {
            section.classList.add("is-hidden");
        }

    });


    /*
     * Search status
     */

    if (query === "") {

        searchStatus.textContent = "";

        return;
    }


    if (visibleCards === 0) {

        searchStatus.textContent =
            `No apps found for "${searchInput.value.trim()}".`;

        return;
    }


    if (visibleCards === 1) {

        searchStatus.textContent =
            "1 app found.";

        return;
    }


    searchStatus.textContent =
        `${visibleCards} apps found.`;
}


/* =========================================================
   SEARCH EVENT
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterApps
    );

}


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

/*
 * Press "/" anywhere on the page to focus
 * the search box.
 */

document.addEventListener(
    "keydown",
    (event) => {

        const activeElement =
            document.activeElement;

        const isTyping =
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.isContentEditable
            );


        if (
            event.key === "/" &&
            !isTyping &&
            searchInput
        ) {

            event.preventDefault();

            searchInput.focus();
        }

    }
);


/* =========================================================
   CLEAR SEARCH WITH ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            searchInput &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            filterApps();

            searchInput.blur();
        }

    }
);


/* =========================================================
   CARD CLICK ANALYTICS HOOK
   ========================================================= */

/*
 * This does not send data anywhere.
 *
 * It simply gives us a clean place to add analytics
 * later if PayProofly needs them.
 */

cards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const appName =
                card.dataset.name || "Unknown";

            /*
             * Available for future analytics.
             * No external request is made here.
             */

            console.debug(
                `PayProofly: opening ${appName}`
            );

        }
    );

});


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializePayProofly() {

    /*
     * Make sure all cards are visible when
     * the page initially loads.
     */

    cards.forEach((card) => {
        card.classList.remove("is-hidden");
    });


    categorySections.forEach((section) => {
        section.classList.remove("is-hidden");
    });


    /*
     * Make sure the search status starts empty.
     */

    if (searchStatus) {
        searchStatus.textContent = "";
    }

}


/* =========================================================
   START
   ========================================================= */

initializePayProofly();