// DECLARE
const password_text = document.getElementById("password_text"),
    password_checker = document.getElementById("password_checker"),
    password_length_text = document.getElementById("password_length_text"),
    password_length = document.getElementById("password_length"),
    lowercase_check = document.getElementById("lowercase_check"),
    uppercase_check = document.getElementById("uppercase_check"),
    numbers_check = document.getElementById("numbers_check"),
    symbols_check = document.getElementById("symbols_check"),
    button_copy = document.getElementById("button_copy"),
    copy_text = document.getElementById("copy_text"),
    button_generate = document.getElementById("button_generate"),
    icon_generate = document.getElementById("icon_generate"),
    password_lowercase = "abcdefghijklmnopqrstuvwxyz",
    password_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    password_numbers = "0123456789",
    password_symbols = "!@#$%^&*";
// PASSWORD GENERATOR
function PasswordGenerator() {
    let e = "",
        s = "";
    lowercase_check.checked && (e += "1"),
        uppercase_check.checked && (e += "2"),
        numbers_check.checked && (e += "3"),
        symbols_check.checked && (e += "4");
    for (let t = 0; t < password_length.value; t++) {
        let t = e.charAt(Math.floor(Math.random() * e.length));
        "1" === t &&
            (s += password_lowercase.charAt(
                Math.floor(Math.random() * password_lowercase.length)
            )),
            "2" === t &&
                (s += password_uppercase.charAt(
                    Math.floor(Math.random() * password_uppercase.length)
                )),
            "3" === t &&
                (s += "0123456789".charAt(
                    Math.floor(Math.random() * "0123456789".length)
                )),
            "4" === t &&
                (s += "!@#$%^&*".charAt(
                    Math.floor(Math.random() * "!@#$%^&*".length)
                ));
    }
    (password_text.value = s), PasswordChecker();
}
// CHECK PASSWORD STRENGTH
function PasswordChecker() {
    let e = password_text.value;
    e.length <= 4
        ? (password_checker.classList.remove("bg-warning", "bg-success"),
          password_checker.classList.add("bg-danger"),
          (password_checker.style.width = "10%"),
          password_checker.setAttribute("aria-valuenow", "10%"))
        : e.length <= 6
        ? (password_checker.classList.remove("bg-warning", "bg-success"),
          password_checker.classList.add("bg-danger"),
          (password_checker.style.width = "25%"),
          password_checker.setAttribute("aria-valuenow", "25%"))
        : e.length <= 8
        ? (password_checker.classList.remove("bg-danger", "bg-success"),
          password_checker.classList.add("bg-warning"),
          (password_checker.style.width = "40%"),
          password_checker.setAttribute("aria-valuenow", "40%"))
        : e.length <= 10
        ? (password_checker.classList.remove("bg-danger", "bg-success"),
          password_checker.classList.add("bg-warning"),
          (password_checker.style.width = "55%"),
          password_checker.setAttribute("aria-valuenow", "55%"))
        : e.length <= 12
        ? (password_checker.classList.remove("bg-danger", "bg-success"),
          password_checker.classList.add("bg-warning"),
          (password_checker.style.width = "70%"),
          password_checker.setAttribute("aria-valuenow", "70%"))
        : e.length <= 14
        ? (password_checker.classList.remove("bg-danger", "bg-warning"),
          password_checker.classList.add("bg-success"),
          (password_checker.style.width = "85%"),
          password_checker.setAttribute("aria-valuenow", "85%"))
        : (password_checker.classList.remove("bg-danger", "bg-warning"),
          password_checker.classList.add("bg-success"),
          (password_checker.style.width = "100%"),
          password_checker.setAttribute("aria-valuenow", "100%"));
}
// CHECKBOX VALIDATION = "at least one checkbox selected"
function CheckboxValidation() {
    let e = [
        lowercase_check,
        uppercase_check,
        numbers_check,
        symbols_check,
    ].filter((e) => e.checked);
    e.forEach((s) => {
        1 == e.length ? (s.disabled = !0) : (s.disabled = !1);
    });
}
// call the function while the document is loading
document.addEventListener("DOMContentLoaded", () => {
    (password_length_text.innerHTML = password_length.value),
        CheckboxValidation(),
        PasswordGenerator();
}),
    // call function when password length is changed
    password_length.addEventListener("change", () => {
        (password_length_text.innerHTML = password_length.value),
            PasswordGenerator();
    }),
    // call function when checkbox is checked
    [lowercase_check, uppercase_check, numbers_check, symbols_check].forEach(
        (e) => {
            e.addEventListener("click", () => {
                CheckboxValidation(), PasswordGenerator();
            });
        }
    ),
    // call function when button copy on click
    button_copy.addEventListener("click", () => {
        var e = document.createElement("textarea");
        document.body.appendChild(e),
            (e.value = password_text.value),
            e.select();
        try {
            document.execCommand("copy") && (copy_text.innerHTML = "Copied!");
        } catch (e) {
            console.log(e);
        }
        document.execCommand("copy"),
            document.body.removeChild(e),
            setTimeout(() => {
                copy_text.innerHTML = "Copy Password";
            }, 1500);
    }),
    // call function when generate password on click
    button_generate.addEventListener("click", () => {
        icon_generate.classList.add("fa-spin"),
            PasswordGenerator(),
            setTimeout(() => {
                icon_generate.classList.remove("fa-spin");
            }, 500);
    });
