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
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
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
      ')" class = "btn btn-warning m-2 id = "Edit">Edit</button> </td>';
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

function showDataUser() {
  var employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }
  var email = localStorage.getItem("email");
  var html = "";
  employeeList.forEach(function (element, index) {
    if (element.email == email) {
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
  var email = localStorage.getItem("email");
  var data = JSON.parse(localStorage.getItem(email));
  // Loads all data when document or page loaded
  if (data.role == "admin") {
    document.onload = showDataAdmin();
    document.getElementById("Submit").style.display = "block";
  } else if (data.role == "user") {
    document.onload = showDataUser();
  }
}
run();

function checkRole() {
  var email = localStorage.getItem("email");
  var data = JSON.parse(localStorage.getItem(email));
  // Loads all data when document or page loaded
  if (data.role == "admin") {
    showDataAdmin();
  } else if (data.role == "user") {
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
    if (localStorage.getItem("employeeList") == null) {
      employeeList = [];
    } else {
      employeeList = JSON.parse(localStorage.getItem("employeeList"));
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
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
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
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
    if (!Array.isArray(employeeList)) {
      employeeList = [];
    }
  }
  employeeList.splice(index, 1);
  localStorage.setItem("employeeList", JSON.stringify(employeeList));
  checkRole();
}

// function to update/edit employee
function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
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

      localStorage.setItem("employeeList", JSON.stringify(employeeList));

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

function Logout() {
  localStorage.removeItem("email");
  window.location.href = "/login.html";
}
