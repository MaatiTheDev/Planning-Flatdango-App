document.addEventListener("DOMContentLoaded", () => {
    const filmList = document.getElementById("films");
    const filmDetails = document.getElementById("film-details");
  
    // Fetch and display the list of films
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((films) => {
        films.forEach((film) => {
          const li = document.createElement("li");
          li.className = "film item";
          li.innerText = film.title;
          li.addEventListener("click", () => displayFilmDetails(film));
          filmList.appendChild(li);
        });
  
        // Display the first film's details by default
        if (films.length > 0) {
          displayFilmDetails(films[0]);
        }
      });
  
    // Display film details
    function displayFilmDetails(film) {
      filmDetails.innerHTML = `
        <img src="${film.poster}" alt="${film.title}">
        <h2>${film.title}</h2>
        <p><strong>Runtime:</strong> ${film.runtime} minutes</p>
        <p><strong>Showtime:</strong> ${film.showtime}</p>
        <p><strong>Available Tickets:</strong> ${film.capacity - film.tickets_sold}</p>
        <p>${film.description}</p>
        <button id="buy-ticket">Buy Ticket</button>
      `;
  
      const buyTicketButton = document.getElementById("buy-ticket");
      buyTicketButton.addEventListener("click", () => buyTicket(film));
    }
  
    // Buy a ticket
    function buyTicket(film) {
      if (film.tickets_sold < film.capacity) {
        film.tickets_sold++;
        displayFilmDetails(film); // Update the displayed details
      } else {
        alert("Sold Out!");
      }
    }
  });
  