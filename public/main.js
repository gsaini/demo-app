function onSubmit() {
  var form = this.event.target;
  this.event.preventDefault(); // to stop the default behavior... why?? as we want to do the processing manually.

  // Request body
  var formData = {};

  // preparing the data to send on server.
  for (var i = 0; i < form.elements.length; i++) {
    var input = form.elements[i];
    if (input.name) {
      formData[input.name] = input.value;
    }
  }

  // xhr to send the data on server.
  var request = new XMLHttpRequest();
  request.open("POST", "/submit");
  request.setRequestHeader("Content-type", "application/json"); // to define the content type as JSON.
  request.send(JSON.stringify(formData));

  request.onload = function (e) {
    if (request.status == 200) {
      form.reset();
      getUsers();
      alert("Form has been submitted successfully!!");
    } else {
      alert("Oops! Something went wrong.");
    }
  };
}

function getUsers() {
  // xhr to send the data on server.
  var request = new XMLHttpRequest();
  request.open("GET", "/users");
  request.setRequestHeader("Content-type", "application/json"); // to define the content type as JSON.

  // iterate on user data & put on html...
  request.onreadystatechange = function () {
    if (this.readyState == 4  && this.status == 200) {
      var responseData = JSON.parse(this.responseText);
      var users = responseData.data;

      var listElement = document.getElementById('users');
      listElement.innerHTML = ''; // empty the list before..
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var liElement = document.createElement('li');
        liElement.innerText = user.firstName + ' ' + user.lastName;

        listElement.appendChild(liElement);
      }
    }
  };

  request.send();
}

// called this function to get user information on page load.
getUsers();
