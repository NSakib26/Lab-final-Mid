const form = document.getElementById("regForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {

event.preventDefault();

clearErrors();

if (isLocked) {
document.getElementById("passwordError").innerHTML =
"Password locked for 1 minute.";
return;
}

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let department = document.getElementById("department");
let about = document.getElementById("about");

let gender =
document.querySelector('input[name="gender"]:checked');

let interests =
document.querySelectorAll('input[name="interest"]:checked');

let valid = true;

if (fname.value.trim() == "") {
showError(fname, "fnameError",
"First name is required.");
valid = false;
}
else if (!/^[A-Za-z]+$/.test(fname.value.trim())) {
showError(fname, "fnameError",
"Only alphabets are allowed.");
valid = false;
}
else {
showSuccess(fname);
}

if (lname.value.trim() == "") {
showError(lname, "lnameError",
"Last name is required.");
valid = false;
}
else if (!/^[A-Za-z]+$/.test(lname.value.trim())) {
showError(lname, "lnameError",
"Only alphabets are allowed.");
valid = false;
}
else {
showSuccess(lname);
}

if (email.value.trim() == "") {
showError(email, "emailError",
"Email is required.");
valid = false;
}
else if (
!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email.value.trim())
) {
showError(email, "emailError",
"Invalid email.");
valid = false;
}
else {
showSuccess(email);
}

if (password.value == "") {

showError(
password,"passwordError","Password is requried!!"
);
 valid=false;

}

else if(password.value !="Sakib"){
wrongAttempts++;
showError(
password,
"passwordError",
"Attempt " + wrongAttempts + " of 3."
);

valid = false;

if (wrongAttempts >= 3) {

isLocked = true;

password.disabled = true;

document.getElementById("passwordError").innerHTML =
"Too many attempts. Locked for 1 minute.";

setTimeout(function () {

isLocked = false;
wrongAttempts = 0;
password.disabled = false;

document.getElementById("passwordError").innerHTML =
"Password unlocked.";

}, 60000);
}
}
else {
showSuccess(password);
}

if (gender == null) {
document.getElementById("genderError").innerHTML =
"Please select your gender.";
valid = false;
}

if (interests.length == 0) {
document.getElementById("interestError").innerHTML =
"Select at least one interest.";
valid = false;
}

if (department.value == "") {
showError(
department,
"deptError",
"Please select a department."
);
valid = false;
}
else {
showSuccess(department);
}

if (about.value.trim() == "") {
showError(
about,
"aboutError",
"About Yourself is required."
);
valid = false;
}
else if (about.value.trim().length < 20) {
showError(
about,
"aboutError",
"Minimum 20 characters required."
);
valid = false;
}
else {
showSuccess(about);
}

if (valid) {

document.getElementById("success").innerHTML =
"Registration Successful! Thank you for registering.";

form.reset();
}
});

function showError(input, errorId, message) {

input.classList.add("errorBorder");
input.classList.remove("successBorder");

document.getElementById(errorId).innerHTML = message;
}

function showSuccess(input) {

input.classList.remove("errorBorder");
input.classList.add("successBorder");
}

function clearErrors() {

let errors = document.querySelectorAll(".error");

errors.forEach(function (item) {
item.innerHTML = "";
});

let fields =
document.querySelectorAll("input, select, textarea");

fields.forEach(function (field) {
field.classList.remove("errorBorder");
field.classList.remove("successBorder");
});

document.getElementById("success").innerHTML = "";
}