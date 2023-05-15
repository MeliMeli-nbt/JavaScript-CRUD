// function to validate input value beforr Submit
function validateForm() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('cfpassword').value;
  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!/.+@.+\..+/.test(email)) {
    alert("Invalid email address");
    return false;
  } else if (/^@/.test(email) || /@$/.test(email)) {
    alert("Invalid email address");
    return false;
  } else if (!/^([\w.-]+)@([\w-]+)\.([a-z]{2,})(\.[a-z]{2,})?$/.test(email)) {
    alert("Invalid email address");
    return false;
  }

  if (password == "") {
    alert("Password is required");
    return false;
  }

  if (confirmPassword == "") {
    alert("ConfirmPassword is required");
    return false;
  }
  return true;
}

// function to show data
function showDataAdmin() {
  var employeeList;
  if (localStorage.getItem("CRUD_listUsers") == null) {
    listUser = [];
  } else {
    listUser = JSON.parse(localStorage.getItem("CRUD_listUsers"));
    if (!Array.isArray(listUser)) {
      listUser = [];
    }
  }
  var html = "";
  listUser.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.password + "</td>";
    html += "<td>" + element.role + "</td>";
    html +=
      '<td><button onclick="updateRole(' +
      index +
      ')" class = "btn btn-warning m-2 id = "UpdateRole">UP</button></td>';
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

function run() {
  let user = JSON.parse(localStorage.getItem("CRUD_currentUser"));
  window.addEventListener('load', function() {
    if (user && user.role == "admin") {
      showDataAdmin(); 
      document.getElementById("Submit").style.display = "block";
    } else if (user && user.role == "user") {
      alert("You do not have access");
    }
  });
}

run();

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);          

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}
// function to add data
async function AddData() {
  if (validateForm() == true) {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('cfpassword').value;
    if (password == null || password !== confirmPassword) {
      alert('Password or confirm password is error');
    } else {
      // hash the password
      const hashedPassword = await sha256(password);

      var user = {
        email: email,
        password: hashedPassword,
        role: 'user'
      };
      var users = JSON.parse(localStorage.getItem('CRUD_listUsers')) || [];
      users.push(user);
      localStorage.setItem('CRUD_listUsers', JSON.stringify(users));
      window.location.href = '/board.html';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('cfpassword').value = '';
    }
  }
}



// function to update/edit employee
function updateRole(index) {
  var accountList = JSON.parse(localStorage.getItem('CRUD_listUsers')) || [];
  if (!Array.isArray(accountList)) {
    accountList = [];
  }
  if (index < 0 || index >= accountList.length) {
    console.log(index);
    alert("Invalid index specified");
    return;
  }
  if (accountList[index].role == "admin") {
    alert("The account is already admin");
  }
  else {
    accountList[index].role = "admin";
    localStorage.setItem('CRUD_listUsers', JSON.stringify(accountList));
    alert("Updated to admin");
    showDataAdmin();
  }
};





