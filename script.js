function showBox(boxId) {
    gsap.to(`#${boxId}`, { y: "65vh", opacity: 1, duration: 1, ease: "bounce.out", onComplete: () => {
        gsap.to(`#${boxId} h2`, { opacity: 1, y: 0, duration: 0.5 });
        gsap.to(`#${boxId} .input-box`, { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" });
        gsap.to(`#${boxId} .btn`, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.6 });
        gsap.to(`#${boxId} .bottom-links`, { opacity: 1, duration: 0.5, delay: 0.8 });
    }});
}

function openSignup() {
    gsap.to("#login-box", { opacity: 0, y: "-100vh", duration: 0.6, onComplete: () => {
        document.getElementById("login-box").style.display = "none";
        document.getElementById("signup-box").style.display = "block";
        showBox("signup-box");
    }});
}

function openLogin() {
    gsap.to("#signup-box", { opacity: 0, y: "-100vh", duration: 0.6, onComplete: () => {
        document.getElementById("signup-box").style.display = "none";
        document.getElementById("login-box").style.display = "block";
        showBox("login-box");
    }});
}

function createLeaf() {
    let leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.animationDuration = (5 + Math.random() * 5) + "s";
    document.getElementById("leaves-container").appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}

setInterval(createLeaf, 300);

showBox("login-box");

document.querySelector(".register").addEventListener("click",(event)=>{
    let name = document.getElementById("name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        window.location.href = "/contact/animation/animation.html"; // Redirect to animation page
    }
    // window.location.href = "animation.html";
})

document.querySelector(".sign-In").addEventListener("click",(event)=>{
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        window.location.href = "/contact/animation/animation.html"; // Redirect to animation page
    }
    // window.location.href = "animation.html";
})
