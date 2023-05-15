// function to validate input value beforr Submit
function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }

  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must not be zero or less than zero");
  }

  if (address == "") {
    alert("Address is required");
    return false;
  }

  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}
// function to show data
function showDataAdmin() {
  var employeeList;
  if (localStorage.getItem("CRUD_listEmployees") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("CRUD_listEmployees"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }
  var html = "";
  employeeList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.address + "</td>";
    html += "<td>" + element.email + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class = "btn btn-danger" id = "Delete" >Delete</button><button onclick="updateData(' +
      index +
      ')" class = "btn btn-warning m-2 id = "Edit">Edit</button></td>';
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

function showDataUser() {
  var employeeList;
  if (localStorage.getItem("CRUD_listEmployees") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("CRUD_listEmployees"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }
  let user = JSON.parse(localStorage.getItem("CRUD_currentUser"));
  var html = "";
  employeeList.forEach(function (element, index) {
    if (element.email == user.email) {
      html += "<tr>";
      html += "<td>" + element.name + "</td>";
      html += "<td>" + element.age + "</td>";
      html += "<td>" + element.address + "</td>";
      html += "<td>" + element.email + "</td>";
      html +=
        '<td><button onclick="updateData(' +
        index +
        ')" class = "btn btn-warning m-2 id = "Edit">Edit</button> </td>';
      html += "</tr>";
    }
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}
function run() {
  let user = JSON.parse(localStorage.getItem("CRUD_currentUser"));
  window.addEventListener('load', function() {
    if (user && user.role == "admin") {
      showDataAdmin(); 
      document.getElementById("Submit").style.display = "block";
      document.getElementById("Account").style.display = "block";
    } else if (user && user.role == "user") {
      showDataUser(); 
    }
  });
}

run();



function checkRole() {
  let user = JSON.parse(localStorage.getItem("CRUD_currentUser"));
  // Loads all data when document or page loaded
  if (user && user.role == "admin") {
    showDataAdmin();
  } else if (user && user.role == "user") {
    showDataUser();
  }
}

// function to add data
function AddData() {
  // if form in validate
  if (validateForm() == true) {
    var username = localStorage.getItem("username");
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var employeeList;
    if (localStorage.getItem("CRUD_listEmployees") == null) {
      employeeList = [];
    } else {
      employeeList = JSON.parse(localStorage.getItem("CRUD_listEmployees"));
      if (!Array.isArray(employeeList)) {
        employeeList = [];
      }
    }

    employeeList.push({
      name: name,
      age: age,
      address: address,
      email: email,
      username: username,
    });
    localStorage.setItem("CRUD_listEmployees", JSON.stringify(employeeList));
    checkRole();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

// function delete employee
function deleteData(index) {
  var employeeList;
  if (localStorage.getItem("CRUD_listEmployees") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("CRUD_listEmployees"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }
  employeeList.splice(index, 1);
  localStorage.setItem("CRUD_listEmployees", JSON.stringify(employeeList));
  checkRole();
}

// function to update/edit employee
function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var employeeList;
  if (localStorage.getItem("CRUD_listEmployees") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("CRUD_listEmployees"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }

  document.getElementById("name").value = employeeList[index].name;
  document.getElementById("age").value = employeeList[index].age;
  document.getElementById("address").value = employeeList[index].address;
  document.getElementById("email").value = employeeList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      employeeList[index].name = document.getElementById("name").value;
      employeeList[index].age = document.getElementById("age").value;
      employeeList[index].address = document.getElementById("address").value;
      employeeList[index].email = document.getElementById("email").value;

      localStorage.setItem("CRUD_listEmployees", JSON.stringify(employeeList));

      checkRole();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}

function changePassword() {
  document.getElementById('fromChangePassword').style.display = "block";
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);          

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}

async function UpdatePassword() {
  var crPassword = document.getElementById('CrPassword').value;
  var nPassword = document.getElementById('NewPassword').value;
  var cfnPassword = document.getElementById('CfNewPassword').value;
  var crUser =  JSON.parse(localStorage.getItem('CRUD_currentUser'));

  var users =  JSON.parse(localStorage.getItem('CRUD_listUsers'));
  var userIndex = users.findIndex(function(u) {
    return u.email === crUser.email;
  });
  const crHashPass = await sha256(crPassword);
  if (crHashPass !== crUser.password){
    alert('Current password is incorrect');
  }
  else if (crPassword == null || cfnPassword == null || nPassword == null) {
    alert('Password is incorrect')
  }
  else if (nPassword !== cfnPassword) {
    alert('Confirm Password is incorrect')
  }
  else if (nPassword === cfnPassword ) {
    // generate the new hashed password
    const hashedPassword = await sha256(nPassword);

    // update the user object's password property
    users[userIndex].password = hashedPassword;

    // save the updated list of users back to local storage
    localStorage.setItem('CRUD_listUsers', JSON.stringify(users));

    alert('Password updated successfully. Please log in again');

    Logout();
  }
}



function Logout() {
  localStorage.removeItem("CRUD_currentUser");
  window.location.href = "/index.html";
}
