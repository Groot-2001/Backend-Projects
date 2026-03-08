const API = "/api/auth";

// DOM elements
const authSection = document.getElementById("auth-section");
const profileSection = document.getElementById("profile-section");
const profileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const headerSubtitle = document.getElementById("header-subtitle");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const clearBtn = document.getElementById("clearResponse");
const responseEl = document.getElementById("response");

// Check if user is already logged in (token exists)
function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    fetchProfile(token);
  } else {
    showAuthSection();
  }
}

// Show auth forms, hide profile
function showAuthSection() {
  authSection.style.display = "grid";
  profileSection.style.display = "none";
  headerSubtitle.textContent = "Step 1: Register or Login";
}

// Show profile section with user data
function showProfileSection(user) {
  authSection.style.display = "none";
  profileSection.style.display = "block";
  profileUsername.textContent = user.username;
  profileEmail.textContent = user.email;
  headerSubtitle.textContent = `Step 2: Logged in as ${user.username}`;
}

// Fetch protected profile using token
async function fetchProfile(token) {
  try {
    const res = await fetch(`${API}/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      showProfileSection(data.user);
      showResponse({ message: "Profile loaded", user: data.user });
    } else {
      // Token invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      showAuthSection();
      showResponse({ error: "Session expired. Please log in again." });
    }
  } catch (err) {
    showResponse({ error: "Network error", details: err.message });
    showAuthSection();
  }
}

// Helper to display response
function showResponse(data) {
  responseEl.textContent = JSON.stringify(data, null, 2);
}

// Register function
async function register() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !email || !password) {
    showResponse({ error: "All fields are required for registration." });
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    showResponse({ error: "Please enter a valid email address." });
    return;
  }

  const payload = { username, email, password };

  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    showResponse(data);
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      fetchProfile(data.token);
    }
  } catch (err) {
    showResponse({ error: "Network or server error", details: err.message });
  }
}

// Login function
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showResponse({ error: "Email and password are required." });
    return;
  }

  const payload = { email, password };

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    showResponse(data);
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      fetchProfile(data.token);
    }
  } catch (err) {
    showResponse({ error: "Network or server error", details: err.message });
  }
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showAuthSection();
  showResponse({ message: "Logged out successfully" });
  // Clear form fields
  document.getElementById("regUsername").value = "";
  document.getElementById("regEmail").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}

// Event listeners
registerBtn.addEventListener("click", register);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
clearBtn.addEventListener("click", () => {
  responseEl.textContent = "Ready to authenticate.";
});

// Initialize on page load
checkAuth();