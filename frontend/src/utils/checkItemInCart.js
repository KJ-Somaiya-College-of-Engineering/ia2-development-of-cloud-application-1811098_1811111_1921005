export default (cart, bookId) => {
  return !!cart.find((item) => {
    return item.BookId === bookId;
  });
};
