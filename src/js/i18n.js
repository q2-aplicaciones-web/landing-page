const AVAILABLE_LANGUAGES = ["en", "es"];
const LANGUAGE_DICTIONARY = { en, es };
const DEFAULT_LANGUAGE = "es";

const languageButton = document.getElementById("language-button");

function changeLanguage(lang) {
    if (!AVAILABLE_LANGUAGES.includes(lang)) {
        console.error(`Language ${lang} is not supported.`);
        return;
    }

    const language = LANGUAGE_DICTIONARY[lang];
    const i18nElements = document.querySelectorAll("[i18n]");

    i18nElements.forEach((element) => {
        const key = element.getAttribute("i18n");
        const path = key.split(".");

        const value = path.reduce((acc, part) => acc?.[part], language);

        element.innerHTML = value || `[${key}]`; // fallback visible
    });

    // Update language button label
    const nextLang = getNextLanguage(lang);
    languageButton.textContent = nextLang.toUpperCase();
    languageButton.setAttribute("aria-label", `Switch to ${nextLang.toUpperCase()}`);

    console.log("Language set to:", lang);
}

function getNextLanguage(currentLang) {
    const currentIndex = AVAILABLE_LANGUAGES.indexOf(currentLang);
    return AVAILABLE_LANGUAGES[(currentIndex + 1) % AVAILABLE_LANGUAGES.length];
}

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    changeLanguage(lang);
}

function initLanguage() {
    const savedLang = localStorage.getItem("lang");
    const initialLang = AVAILABLE_LANGUAGES.includes(savedLang) ? savedLang : DEFAULT_LANGUAGE;
    changeLanguage(initialLang);
}

languageButton.addEventListener("click", () => {
    const currentLang = localStorage.getItem("lang") || DEFAULT_LANGUAGE;
    const nextLang = getNextLanguage(currentLang);
    setLanguage(nextLang);
});

// Initialize on load
initLanguage();