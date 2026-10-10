// Shared script for the solution pages: login-aware menu and buttons.
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const authArea = document.getElementById("authArea");
const guestLinks = document.getElementById("guestLinks");
const userMenu = document.getElementById("userMenu");
const avatarBtn = document.getElementById("avatarBtn");
const avatarInitial = document.getElementById("avatarInitial");
const dropdown = document.getElementById("profileDropdown");
const pdName = document.getElementById("pdName");
const pdEmail = document.getElementById("pdEmail");
const logoutBtn = document.getElementById("logoutBtn");
const navDashboard = document.getElementById("navDashboard");

function openMenu() { dropdown.classList.add("open"); avatarBtn.setAttribute("aria-expanded", "true"); }
function closeMenu() { dropdown.classList.remove("open"); avatarBtn.setAttribute("aria-expanded", "false"); }

avatarBtn.addEventListener("click", () => {
    dropdown.classList.contains("open") ? closeMenu() : openMenu();
});
document.addEventListener("click", (e) => { if (!userMenu.contains(e.target)) closeMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

// Buttons marked data-guest are shown only to visitors; data-user only to logged-in customers
function setMode(loggedIn) {
    document.querySelectorAll("[data-guest]").forEach((el) => { el.hidden = loggedIn; });
    document.querySelectorAll("[data-user]").forEach((el) => { el.hidden = !loggedIn; });
}

function showGuest() {
    guestLinks.hidden = false;
    navDashboard.hidden = true;
    userMenu.hidden = true;
    closeMenu();
    setMode(false);
    authArea.classList.remove("auth-pending");
}

function showUser(name, email) {
    guestLinks.hidden = true;
    navDashboard.hidden = false;
    userMenu.hidden = false;
    avatarInitial.textContent = (name.trim()[0] || "U").toUpperCase();
    pdName.textContent = name;
    pdEmail.textContent = email;
    setMode(true);
    authArea.classList.remove("auth-pending");
}

onAuthStateChanged(auth, async (user) => {
    if (!user) { showGuest(); return; }
    let name = user.displayName || (user.email ? user.email.split("@")[0] : "Customer");
    try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists() && snap.data().name) name = snap.data().name;
    } catch (err) { console.error("Could not load profile:", err); }
    showUser(name, user.email || "");
});

setTimeout(() => { authArea.classList.remove("auth-pending"); }, 3000);

logoutBtn.addEventListener("click", async () => {
    try { await signOut(auth); } catch (err) { console.error("Logout failed:", err); }
    closeMenu();
});
