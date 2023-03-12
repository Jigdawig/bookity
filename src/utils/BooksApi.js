export const getBooks = () => {
    fetch("https://openlibrary.org/search/authors.json?q=j%20k%20rowling")
    // fetch("https://openlibrary.org/authors/OL23919A.json")
    .then((response) => {
        console.log('response:', response)
        return ["1 book", "2 book"];
    })
    //   .then((data) => {
        
    //   });
};
