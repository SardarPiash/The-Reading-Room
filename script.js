//default page
const currentPage = 1;
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
  }catch(error){

  }
};


//book display function
function displayBooks(books){
    bookStage.innerHTML="";
    books.forEach(book => {
         const bookCard = document.createElement('div');
        // bookCard.bookList.add("")

         const bookImg = book.formats['image/jpeg'] || 'assets/fallback.jpg';
         console.log("img",bookImg)
        bookCard.innerHTML = `
        <img src="${bookImg}" alt="Book Image" class="book-img" />

        `;
         bookStage.appendChild(bookCard);
        console.log(bookCard)
    });
    

}

// Call the function to fetch and log the data
fetchAPI();
