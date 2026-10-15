"use strict";

const passwordText = document.getElementById("password_text");
const strengthBar = document.getElementById("password_checker");
const lengthText = document.getElementById("password_length_text");
const lengthSlider = document.getElementById("password_length");
const copyButton = document.getElementById("button_copy");
const copyText = document.getElementById("copy_text");
const generateButton = document.getElementById("button_generate");
const generateIcon = document.getElementById("icon_generate");
const options = [
    { element: document.getElementById("lowercase_check"), chars: "abcdefghijklmnopqrstuvwxyz" },
    { element: document.getElementById("uppercase_check"), chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { element: document.getElementById("numbers_check"), chars: "0123456789" },
    { element: document.getElementById("symbols_check"), chars: "!@#$%^&*" },
];

// Rejection sampling avoids modulo bias. Never use Math.random() for secrets.
function secureIndex(max) {
    if (!Number.isSafeInteger(max) || max < 1 || max > 0x100000000) {
        throw new RangeError("Invalid random range");
    }
    const range = 0x100000000;
    const limit = range - (range % max);
    const buffer = new Uint32Array(1);
    let value;
    do {
        crypto.getRandomValues(buffer);
        value = buffer[0];
    } while (value >= limit);
    return value % max;
}

function securePassword(length, groups) {
    if (!Number.isSafeInteger(length) || length < 12 || length > 128 ||
        !Array.isArray(groups) || groups.length === 0 ||
        groups.some(group => typeof group !== "string" || group.length === 0) ||
        length < groups.length) {
        throw new RangeError("Invalid password configuration");
    }

    const pool = groups.join("");
    const chars = groups.map(group => group[secureIndex(group.length)]);
    while (chars.length < length) {
        chars.push(pool[secureIndex(pool.length)]);
    }
    // Fisher-Yates shuffle removes predictable placement of required groups.
    for (let i = chars.length - 1; i > 0; i--) {
        const j = secureIndex(i + 1);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
}

function updateStrength(groups, length) {
    // Lower-bound estimate: mandatory characters are constrained by group selection.
    // This is guidance, not a guarantee against password cracking.
    const poolSize = groups.join("").length;
    const estimatedBits = length * Math.log2(poolSize);
    const percent = estimatedBits < 60 ? 25 : estimatedBits < 80 ? 55 : estimatedBits < 100 ? 80 : 100;
    strengthBar.classList.remove("bg-danger", "bg-warning", "bg-success");
    strengthBar.classList.add(percent < 50 ? "bg-danger" : percent < 80 ? "bg-warning" : "bg-success");
    strengthBar.style.width = percent + "%";
    strengthBar.setAttribute("aria-valuenow", String(percent));
    strengthBar.setAttribute("aria-label", "Estimated password strength");
}

function generatePassword() {
    const length = Number(lengthSlider.value);
    const groups = options.filter(option => option.element.checked).map(option => option.chars);
    lengthText.textContent = String(length);
    try {
        if (!globalThis.crypto || typeof crypto.getRandomValues !== "function") {
            throw new Error("Secure randomness is unavailable in this browser");
        }
        passwordText.value = securePassword(length, groups);
        updateStrength(groups, length);
        copyButton.disabled = false;
        copyText.textContent = "Copy Password";
    } catch (error) {
        passwordText.value = "";
        copyButton.disabled = true;
        strengthBar.style.width = "0%";
        strengthBar.setAttribute("aria-valuenow", "0");
        copyText.textContent = "Unavailable";
        console.error("Password generation failed:", error.message);
    }
}

function updateCheckboxes() {
    const checked = options.filter(option => option.element.checked);
    options.forEach(option => {
        option.element.disabled = checked.length === 1 && option.element.checked;
    });
}

async function copyPassword() {
    if (!passwordText.value) return;
    try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            throw new Error("Clipboard API unavailable");
        }
        await navigator.clipboard.writeText(passwordText.value);
        copyText.textContent = "Copied!";
    } catch (_) {
        // Never log or transmit generated passwords.
        copyText.textContent = "Copy failed (use HTTPS or localhost)";
    }
    setTimeout(() => { copyText.textContent = "Copy Password"; }, 2000);
}

lengthSlider.addEventListener("input", generatePassword);
options.forEach(option => option.element.addEventListener("change", () => {
    updateCheckboxes();
    generatePassword();
}));
copyButton.addEventListener("click", copyPassword);
generateButton.addEventListener("click", () => {
    generateIcon.classList.add("fa-spin");
    generatePassword();
    setTimeout(() => generateIcon.classList.remove("fa-spin"), 500);
});
updateCheckboxes();
generatePassword();
