document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 
    saveUserData(); 
  });

function saveUserData() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("alamat").value;
  var password = document.getElementById("password").value;

  var userData = {
    username: username,
    alamat: alamat,
    password: password,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  alert("Sign up successful!"); 
  redirectToLogin();

}

function redirectToLogin() {
  window.location.href = "login.html";
}
