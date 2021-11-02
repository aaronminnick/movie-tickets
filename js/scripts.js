//Utility Functions

function timeConverter(time) {
  if (time.length !== 4 || isNaN(parseInt(time))) {
    return false;
  }
  hours = parseInt(time.slice(0, 2));
  minutes = time.slice(2);
  ampm = "";
  if (hours === 0 || hours === 24) {
    hours = 12;
    ampm = " AM";
  } else if (hours > 12) { //PM
    hours -= 12;
    ampm = " PM";
  } else {//AM
    ampm = " AM";
  }
  return hours.toString() + ":" + minutes + ampm;
}

//Business Logic
function Ticket (nameOfMovie, time, age) {
  this.nameOfMovie = nameOfMovie;
  this.time = time;
  this.age = age;
}

Ticket.prototype.calculatePrice = function() {
  if (ourMarquee.movies[this.nameOfMovie].daysOld <= 60) {
    this.price = 20;
  } else {
    this.price = 15;
  }
  if (this.time < 1700) {
    this.price = this.price - 3;
  } 
  if (this.age >= 60) {
    this.price = this.price - 5;
  }
};

function Marquee () {
  this.movies = {};
}

Marquee.prototype.addMovie = function(movie) {
  this.movies[movie.nameOfMovie] = movie;
};

function Movie (nameOfMovie, daysOld, movieTimes) {
  this.nameOfMovie = nameOfMovie;
  this.daysOld = daysOld;
  this.movieTimes = movieTimes;
}

let ourMarquee = new Marquee();
let carebears = new Movie("Care Bears", 1000, ["0800", "1000", "1400"]);
ourMarquee.addMovie(carebears);
let dune = new Movie("Dune", 7, ["1400", "1800", "2400"]);
ourMarquee.addMovie(dune);
let french = new Movie("The French Dispatch", 14, ["1300", "1800", "2400"]);
ourMarquee.addMovie(french);
let goonies = new Movie("Goonies", 5000, ["1000", "1800", "2400"]);
ourMarquee.addMovie(goonies);


//UI logic
function fillSelectName() {
  let selectToFill = $("select#select-name");
  Object.keys(ourMarquee.movies).forEach(function(key) {
    selectToFill.append("<option value='" + key + "'>" + key + "</option>");
  });
}

function fillSelectTime(movie) {
  let selectTime = $("#select-time");
  movieTimes.forEach(function(time) {
    selectTime.append(<"option value= '" + time + "'>" + timeConverter(time) + "</option>"); 
  })
}

function attachTimeListener() {
  $("#select-name").on("click", "option", fillSelectTime(ourMarquee.movies[this.value]));
}

$(document).ready(function() {
  fillSelectName();
  attachTimeListener();
  $("#formOne").submit(function(event) {
    event.preventDefault();
    let ticketName = $("#select-name").val();
    let ticketTime = $("#select-time").val();
    let ticketAge = parseInt($("#input-age").val());

    let ticket = new Ticket(ticketName, ticketTime, ticketAge);
    ticket.calculatePrice();

    $("#ticket-movie-name").html(ticket.nameOfMovie);

    $("#ticket-time").html(ticket.time);

    $("#ticket-price").html(ticket.price);


    $("#ticket").show();
  });

});

//1 write the time converter
//2 store the array of times in either the marquee or the movie
//3 attach a click listener to the time dropdown
//4 make a function that populates the time dropdown, referencing #2- it will use the converter in #1 and will be used in #3