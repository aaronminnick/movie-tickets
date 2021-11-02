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
  this.discounts = "";
  
  if (ourMarquee.movies[this.nameOfMovie].daysOld <= 60) {
    this.price = 20;
  } else {
    this.price = 15;
  }
  if (this.time < 1700) {
    this.price = this.price - 3;
    this.discounts += "Matinee Discount! "
  } 
  if (this.age >= 60) {
    this.price = this.price - 5;
    this.discounts += "Senior Discount!"
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
  let htmlString = "<option value=''>---Please choose an option---</option>";
  movie.movieTimes.forEach(function(time) {
    htmlString += "<option value= '" + time + "'>" + timeConverter(time) + "</option>"; 
  });
  selectTime.html(htmlString);
}

function attachTimeListener() {
  $("#select-name").on("click", "option", function() {
    if (this.value !== "") {
      fillSelectTime(ourMarquee.movies[this.value]);
    }
  });
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

    $("#ticket-time").html(timeConverter(ticket.time));

    let discount = $("#ticket-discount");
    if (ticket.discounts !== "") {
      discount.html(ticket.discounts);
    } else {
      discount.html("No discount.");
    }

    $("#ticket-price").html("$" + ticket.price + ".00");

    $("#ticket").show();
  });
});