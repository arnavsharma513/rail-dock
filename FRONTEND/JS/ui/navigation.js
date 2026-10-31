export function Navigation(){
const btns = document.querySelectorAll(".b-btn");
const boxes = document.querySelectorAll(".box");

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        btns.forEach(b => b.classList.remove("active"));
        boxes.forEach(cap => cap.classList.remove("active"));
        btn.classList.add("active");
        const targetBox = document.getElementById(targetId);
        if (targetBox) {
            targetBox.classList.add("active");
        }
    });
});
}