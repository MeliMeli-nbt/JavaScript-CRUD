function SignUp() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('cfpassword').value;
  var role = document.getElementById('role').value;
  if ( password == null || password !== confirmPassword ){
    alert('Password or confirm password is error');
  }
  else {
    var user = {
      username: username,
      password: password,
      role: role
    };

    localStorage.setItem(username, JSON.stringify(user));
    console.log('user saved')
    window.location.href = "/login.html"
  }
}

function Login() {
  var username = document.getElementById('username').value;
  var pass = document.getElementById('password').value;
  var result = document.getElementById('result');

  var user = localStorage.getItem(username);
  var data = JSON.parse(user);

  if (user == null) {
    result.innerHTML = 'Wrong username';
  } else if (username == data.username &&  pass == data.password) {
    if (data.role == 'admin') {
      localStorage.setItem("username", data.username)
    }
    else if (data.role == 'user') {
      localStorage.setItem("username", data.username)
    }
    result.innerHTML = 'logged in';
    window.location.href = '/index.html';
  } else {
    result.innerHTML = 'Wrong password';
  }
}