//default page
const currentPage = 1;
const authorIcon = 'assets/author.png';

const bookStage = document.getElementById("book-lists");
const paginationIndex = document.getElementById("paginationIndex")

///api fetch function with search query and page
async function fetchAPI(query='',page=1) {
  try{
     const response = await fetch(`https://gutendex.com/books/?search=${query}&page=${page}`);
     const data = await response.json();
     console.log(data.results)
    //  load data to display function
     displayBooks(data.results)
     //console.log(authorIcon)
  }catch(error){
    console.log(error)
  }
};


function displayBooks(books) {
  bookStage.innerHTML = ""; 

  books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add("book-card");

      const bookImg = book.formats['image/jpeg'] || 'assets/fallback.jpg';
      console.log("img", bookImg);

      bookCard.innerHTML = `
          <div class="book-div">
              <img src="${bookImg}" alt="Book Image" class="book-img" />
          </div>
          <div class="book-details">
              <div style="font-size: 14px;">${book.title.slice(0,16)+(book.title.length>16 ? "...":null)}</div>
              <div style="font-size: 10px; margin-top:2px;"><img src="${authorIcon}" class="author-icon"/>${book.authors[0].name.slice(0,16)+(book.authors[0]?.name.length>16 ? "...":null)}</div>
              <div style="font-size: 14px;"><span style="font-weight: 400;">Language:</span>${book.languages}</div>
              <div style="font-size: 14px;"><span style="font-weight: 400;">Download:</span>${book.download_count}</div>
              <div style=" margin-top:10px;">
              <button>View details</button>
              <div>
          </div>
      `;

      bookStage.appendChild(bookCard); 
      console.log(bookCard);
  });

    

}

// Call the function to fetch and log the data
fetchAPI();
