async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);          

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}
async function Login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var result = document.getElementById('result');

  const hashedPassword = await sha256(password);

  var users =  JSON.parse(localStorage.getItem('CRUD_listUsers'));
  var user = users.find(function(u) {
    return u.email === email;
  });

  if (!user) {
    result.innerHTML = 'Wrong username';
  } else if (hashedPassword == user.password) {
    localStorage.setItem('CRUD_currentUser', JSON.stringify(user));
    result.innerHTML = 'Logged in';
    window.location.href = '/board.html';
  } else {
    result.innerHTML = 'Wrong password';
  }
}

