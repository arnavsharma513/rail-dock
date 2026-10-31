const rootElement = document.documentElement;
const toggleButton = document.querySelector("#theme_btn");

function update_theme_btn() {
    const currentTheme = rootElement.getAttribute("data-theme");
    toggleButton.textContent = currentTheme === "dark" ? "Light Mode ☀️" : "🌛 Dark Mode";
}
update_theme_btn();
toggleButton.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    rootElement.setAttribute("data-theme", nextTheme);
    update_theme_btn();
});