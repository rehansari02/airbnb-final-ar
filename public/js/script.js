// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



// reviews Show more

  const showMoreBtn = document.getElementById("showMoreBtn");
  if(showMoreBtn){
    showMoreBtn.addEventListener("click", () => {
      const hiddenReviews = document.querySelectorAll(".review-card.d-none");
      hiddenReviews.forEach(card => card.classList.remove("d-none"));
      showMoreBtn.style.display = "none";
    });
  }







// search

  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");
  let currentResults = [];

  // 🔍 On typing in input
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    if (query === "") {
      resultsDiv.style.display = "none";
      resultsDiv.innerHTML = "";
      currentResults = [];
      return;
    }

    const res = await fetch(`/search?term=${encodeURIComponent(query)}`);
    const listings = await res.json();
    currentResults = listings;

    if (listings.length > 0) {
      resultsDiv.innerHTML = listings
        .map(
          (item) => `
        <a href="/listings/${item._id}" class="list-group-item list-group-item-action">
          ${item.title}
        </a>`
        )
        .join("");
    } else {
      resultsDiv.innerHTML = `<div class="list-group-item text-muted">No results found</div>`;
    }

    resultsDiv.style.display = "block";
  });

  // 🔑 Enter key press
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchInput.value.trim();

      if (query === "") {
        alert("Please type something before searching.");
        return;
      }

      if (currentResults.length > 0) {
        window.location.href = `/listings/${currentResults[0]._id}`;
      } else {
        resultsDiv.innerHTML = `<div class="list-group-item text-muted">No results found</div>`;
        resultsDiv.style.display = "block";
      }
    }
  });

  // 🖱️ Mouse click on dropdown result
  resultsDiv.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor) {
      window.location.href = anchor.getAttribute("href");
    }
  });

  // 🛑 Stop default form submit
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (query === "") {
      alert("Please type something before searching.");
      return;
    }

    if (currentResults.length > 0) {
      window.location.href = `/listings/${currentResults[0]._id}`;
    } else {
      resultsDiv.innerHTML = `<div class="list-group-item text-muted">No results found</div>`;
      resultsDiv.style.display = "block";
    }
  });




  

  