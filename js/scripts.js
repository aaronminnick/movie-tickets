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
}

function Movie (nameOfMovie, daysOld) {
  this.nameOfMovie = nameOfMovie;
  this.daysOld = daysOld;
}

ourMarquee = new Marquee();
carebears = new Movie("Care Bears", 1000);
ourMarquee.addMovie(carebears);


let ticket = new Ticket();

$(document).ready(function() {
  
})




//new movie = $20
//older movie = $15
//Senior discount = over 60 - $5
//Time = before 5:00 pm - $3
