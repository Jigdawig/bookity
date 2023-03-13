const searchBookUrl = 'http://openlibrary.org/search.json?title=';
const searchAuthorUrl = 'http://openlibrary.org/search/authors.json?q=';

export const searchBooks = async(searchParam) => {
    const response = await fetch(`${searchBookUrl}${searchParam}`);
    const rawData = await response.json();

    if (rawData.numFound === 0) {
        return [];
    }

    const { docs } = rawData;

    // Keeping it simple and only grabbing the first 5 results
    const bookDetails = docs.slice(0, 5).map((book) => {
        const { key, author_name, cover_i, first_publish_year, title } = book;

        return {
            id: key,
            author: author_name,
            coverId: cover_i,
            publishYear: first_publish_year,
            title
        }
    });

    return bookDetails;
};

export const getAuthors = async() => {


}
