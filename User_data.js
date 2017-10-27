var userName;
var userGender;
var userLocation;
var InitialUser = 0;
var userCounter = InitialUser;

var config = {
    apiKey: "AIzaSyBv5tEwvh-mdlB3ClXlOyet7EP5tKLJELI",
    authDomain: "project1-a2b3e.firebaseapp.com",
    databaseURL: "https://project1-a2b3e.firebaseio.com",
    projectId: "project1-a2b3e",
    storageBucket: "",
    messagingSenderId: "165313356772"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref("/userNumber").on("value", function(snapshot) {
  	
  	if (snapshot.child("users").exists()) {
  		
  		userCounter = snapshot.val().users;
  	}

});

database.ref("/userData" + userCounter).on("value", function(snapshot) {

  if (snapshot.child("id").exists() && localStorage.getItem("user-ID") == snapshot.val().id) {

    userName = snapshot.val().name;
    userGender = snapshot.val().gender;
    userLocation = snapshot.val().location;

    //Write name into html and set selected avatar and city.
  }

  else{}
    //redirect to sign in page


$("#submit").on("click", function(event) {
    event.preventDefault();
    
    userCounter++;
    
    var newName = $("#name").val().trim();
    var newGender = $("#gender-input").val().trim();
    var newLocation = $("#cityState").val().trim();

    localStorage.setItem("User-ID", userCounter);
    
    var newUser = {
      name: newName,
      gender: newGender,
      location: newLocation,
      id: userCounter
    };
    
    database.ref("/userData" + userCounter).set(newUser);
    database.ref("/userNumber").set({
    	users: userCounter
    });
  });
