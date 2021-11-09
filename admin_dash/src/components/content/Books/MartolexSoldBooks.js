import React, { useEffect, useState } from "react";
import { booksApi } from "../../../utils/EndPoints";
import { get } from "../../../utils/requests";
import BooksTable from "./BooksTable";

const MartolexSoldBooks = (props) => {
  const [books, setBooks] = useState([]);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData(booksApi.martolexBooks);
  }, []);
  return (
    <div>
      <BooksTable books={books} />
    </div>
  );
};

export default MartolexSoldBooks;
