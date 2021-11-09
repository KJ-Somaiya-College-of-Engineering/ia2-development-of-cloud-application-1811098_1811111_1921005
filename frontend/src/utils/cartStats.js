import { plans } from "./enums";

const cartStats = (cart = []) => {
  return cart.reduce(
    (prev, curr) => {
      const currBookPrice = curr.qty * curr.price;
      const currBookRent = curr.qty * curr.rent;
      return {
        totalAmount: prev.totalAmount + currBookPrice,
        rentalAmount: prev.rentalAmount + currBookRent,
        totalMrp: prev.totalMrp + curr.qty * curr.book.mrp,
      };
    },
    { totalAmount: 0, rentalAmount: 0, totalMrp: 0 }
  );
};

export const itemPrice = (item) => {
  const total = item.plan === plans.SELL ? item.price : item.book.rent.deposit;
  return total;
};
export default cartStats;
