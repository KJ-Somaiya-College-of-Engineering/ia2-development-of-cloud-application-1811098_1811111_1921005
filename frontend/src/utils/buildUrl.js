export const buildSubCatUrl = (catId, subCatId) => {
  return `/cat/${catId}/subCat/${subCatId}`;
};
export const buildCatUrl = (catId) => {
  return `/cat/${catId}/`;
};

export const buildBookDetailsUrl = (bookId) => `/books/${bookId}`;
