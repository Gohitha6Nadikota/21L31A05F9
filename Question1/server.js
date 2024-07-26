const express = require("express");
const axios = require("axios");
const app = express();
const port = 9876;

const windowSize = 10;
let currState = [];
let prevState = [];

const getNumbers = async (id) => {
  let url = "";
  if (id === "p") {
    url = "http://20.244.56.144/test/primes";
  } else if (id === "f") {
    url = "http://20.244.56.144/test/fibo";
  } else if (id === "e") {
    url = "http://20.244.56.144/test/even";
  } else if (id === "r") {
    url = "http://20.244.56.144/test/rand";
  } else {
    return [];
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTczMDI2LCJpYXQiOjE3MjE5NzI3MjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIxYzJhNjRkLTVkYjItNGE1NS1iZTBhLTFmNjU1YTA5MzMyMyIsInN1YiI6ImdvaGl0aGFwcml5YW5hZGlrb3RhQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IlJjbG9jayIsImNsaWVudElEIjoiYjFjMmE2NGQtNWRiMi00YTU1LWJlMGEtMWY2NTVhMDkzMzIzIiwiY2xpZW50U2VjcmV0IjoiZklrZnBOYktKaHVZbWhTdCIsIm93bmVyTmFtZSI6IkdvaGl0aGEgUHJpeWEgTmFkaWtvdGEiLCJvd25lckVtYWlsIjoiZ29oaXRoYXByaXlhbmFkaWtvdGFAZ21haWwuY29tIiwicm9sbE5vIjoiMjFMMzFBMDVGOSJ9.4NCxAhalmNRJ__I7WGosx2cQKABVCN-dQhfSL0-xsIs",
      },
    });
    return response?.data?.numbers || [];
  } catch (error) {
    console.error("Error fetching", error);
    return [];
  }
};
const averageofNumbers = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
};

app.get("/numbers/:id", async (req, res) => {
  const id = req.params.id;
  const newNumbers = await getNumbers(id);
  prevState = [...currState];
  currState = [...currState, ...newNumbers].slice(-windowSize);
  const avg = averageofNumbers(currState);
  res.json({
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: newNumbers,
    avg,
  });
});

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
