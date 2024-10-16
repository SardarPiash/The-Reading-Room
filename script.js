let currentPage = 1;
let wislistArray = JSON.parse(localStorage.getItem("wishlistID")) || [];
const authorIcon = "assets/author.png";
const wishIconBlack = "assets/black_love.png";
const wishIconRed = "assets/red_love.png";

const bookStage = document.getElementById("book-lists");
const paginationIndex = document.getElementById("paginationIndex");

async function fetchAPI(query = "", page = 1) {
  console.log("Home")
  try {
    const response = await fetch(
      `https://gutendex.com/books/?search=${query}&page=${page}`
    );
    const data = await response.json();
    displayBooks(data.results,"all");
  } catch (error) {
    console.log(error);
  }
}

//wishlist function
function handleWishList(id, iconElement) {
  wislistArray = JSON.parse(localStorage.getItem("wishlistID")) || [];
  const index = wislistArray.indexOf(id);

  if (index !== -1) {
    wislistArray.splice(index, 1);
    iconElement.src = wishIconBlack;
  } else {
    wislistArray.push(id);
    iconElement.src = wishIconRed;
  }

  localStorage.setItem("wishlistID", JSON.stringify(wislistArray));
}

function displayBooks(books,flag) {
  bookStage.innerHTML = "";
  books.forEach((book) => {
    const isInWishlist = wislistArray.includes(book.id);
    const icon = isInWishlist ? wishIconRed : wishIconBlack;
   // const heading = `<span class="body-heading-text">Find your books</span>`;
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookImg = book.formats["image/jpeg"] || "assets/fallback.png";

    bookCard.innerHTML = `
      <div class="book-div" >
        <img src="${bookImg}" alt="Book Image" class="book-img" />
      </div>
      <div class="book-details">
        <div style="font-size: 16px;">
          ${book.title.slice(0, 16) + (book.title.length > 16 ? "..." : "")}
        </div>
        <div style="font-size: 10px; margin-top:2px;">
          <img src="${authorIcon}" class="author-icon" />
          ${book.authors.length !== 0?
            book.authors[0]?.name.slice(0, 16) +
            (book.authors[0]?.name.length > 16 ? "..." : ""):"Not specified"
          }
        </div>
        <div style="font-size: 14px;">
          <span style="font-weight: 400;">Language:</span> ${book.languages}
        </div>
        <div style="font-size: 14px;">
          <span style="font-weight: 400;">Download:</span> ${
            book.download_count
          }
        </div>
        <div class="button-div" >
          <button class="view-button">View details</button>
          <button class="wishlist-btn" >
            <img src="${icon}" class="wishlist-icon"  />
          </button>
        </div>
      </div>
    `;

    const wishlistButton = bookCard.querySelector(".wishlist-btn");
    const iconElement = wishlistButton.querySelector(".wishlist-icon");

    wishlistButton.addEventListener("click", () => {
      handleWishList(book.id, iconElement);
    });
    bookStage.appendChild(bookCard);
  });
}

fetchAPI();

//pagination function
function changePage(page) {
  if (page < 1) return;
  currentPage = page;
  pageIndicator.textContent = `Page ${page}`;
  fetchAPI("", page);
}

//search function
function searchBooks(query) {
  console.log(query);
  fetchAPI(query, currentPage);
}

//filter function
function filterBooksByGenre(genre){
  fetchAPI(genre,currentPage);
}

//function to show wishlist 
const showWishlist = async()=>{
  console.log("cl")
  const wishlist = JSON.parse(localStorage.getItem("wishlistID"))
  const response = await fetch(
    `https://gutendex.com//books?ids=${wishlist}`
  );
  const data = await response.json();
  displayBooks(data.results,"wish");
  console.log(data)


}
