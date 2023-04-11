function SignUp() {
  var email = document.getElementById('email').value;
  // var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('cfpassword').value;
  var role = document.getElementById('role').value;
  if ( password == null || password !== confirmPassword ){
    alert('Password or confirm password is error');
  }
  else {
    var user = {
      email: email,
      // username: username,
      password: password,
      role: role
    };

    localStorage.setItem(email, JSON.stringify(user));
    window.location.href = "/login.html"
  }
}

function Login() {
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  var result = document.getElementById('result');

  var emailLogin = localStorage.getItem(email);
  var data = JSON.parse(emailLogin);

  if (email == null) {
    result.innerHTML = 'Wrong username';
  } else if (email == data.email &&  pass == data.password) {
    if (data.role == 'admin') {
      localStorage.setItem("email", data.email);
    }
    else if (data.role == 'user') {
      localStorage.setItem("email", data.email)
    }
    result.innerHTML = 'logged in';
    window.location.href = '/index.html';
  } else {
    result.innerHTML = 'Wrong password';
  }
}