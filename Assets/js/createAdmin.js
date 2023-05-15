async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);          

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}
async function createAdmin() {
      const hashedPassword = await sha256('123456');
      var user = {
        email: 'admin',
        password: hashedPassword,
        role: 'admin'
      };
      var users = JSON.parse(localStorage.getItem('CRUD_listUsers')) || [];
      users.push(user);
      localStorage.setItem('CRUD_listUsers', JSON.stringify(users));
      window.location.href = '/index.html';
}