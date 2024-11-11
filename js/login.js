document
	.getElementById('loginForm')
	?.addEventListener('submit', function (event) {
		event.preventDefault(); 
		login(); 
	});

function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username === 'Admin' && password === '123456') {
    localStorage.setItem("isLogedIn", "true")
		alert('Login Berhasil!');
		redirectToDashboard();
	} else {
    localStorage.setItem('isLogedIn', 'false');
		alert('Invalid Username or Password!');
	}
}

function redirectToDashboard() {
	window.location.href = 'dataset.html';
}

function checkLogin() {
	if (localStorage.getItem('loggedIn') !== 'true') {
		alert('Anda harus Login terlebih dahulu!');
		window.location.href = 'views/login.html';
		return false;
	}
	return true;
}

function checkLogin2() {
	if (localStorage.getItem('loggedIn') !== 'true') {
		alert('Anda harus Login terlebih dahulu!');
		window.location.href = '../views/login.html';
		return false;
	}
	return true;
}

function logout() {
	localStorage.removeItem('loggedIn');
	alert('Apakah Anda yakin untuk Logout?');
	window.location.href = '../index.html';
}