const searchBookUrl = "http://openlibrary.org/search.json?title=";

export const searchBooks = async (searchParam) => {
  const response = await fetch(`${searchBookUrl}${searchParam}`);
  const rawData = await response.json();

  if (rawData.numFound === 0) {
    return [];
  }

  const { docs } = rawData;

  // Keeping it simple and only grabbing the first 20 results
  const bookDetails = docs.slice(0, 20).map((book) => {
    const { key, author_name, cover_i, first_publish_year, title } = book;

    return {
      id: key,
      author: author_name,
      coverId: cover_i,
      publishYear: first_publish_year,
      title,
    };
  });

  return bookDetails;
};
