const express = require("express");
const router = express.Router();

// let ejs = require("ejs");
// let people = ["geddy", "neil", "alex"];
// let html = ejs.render('<%= people.join(", "); %>', { people: people });

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// // define the home page route
// router.get("/api/countries", (req, res) => {
//   res.send("Countries home page");
// });

const countries = [
  {
    id: 1,
    name: "Greece",
    alpha2Code: "GR",
    alpha3Code: "GRC",
  },
  {
    id: 2,
    name: "Thailand",
    alpha2Code: "TH",
    alpha3Code: "THA",
  },
  {
    id: 3,
    name: "Peru",
    alpha2Code: "PE",
    alpha3Code: "PER",
  },
  {
    id: 4,
    name: "SouthAfrica",
    alpha2Code: "ZA",
    alpha3Code: "ZAF",
  },
  {
    id: 5,
    name: "New Zealand",
    alpha2Code: "NZ",
    alpha3Code: "NZL",
  },
];

// Part 1 - GET /api/countries OK and sorted
router.get("/", (req, res) => {
  const list = countries.map((country) => country.name);
  const sorted_list = list.sort();
  res.json(sorted_list);
});

// Part 2 - POST /api/countries OK
router.post("/", (req, res) => {
  const newcountry = {
    id: 6,
    name: "Egypt",
    alpha2Code: "EG",
    alpha3Code: "EGY",
  };

  countries.push(newcountry);
  const jsonData = JSON.stringify(countries);

  res.json(jsonData);
});

// Part 3 - GET /api/countries/:code OK
router.get("/:code", (req, res) => {
  const code = req.params.code;
  const country = countries.find(
    (country) => country.alpha2Code === code || country.alpha3Code === code
  );
  if (!country) {
    return res.status(404).send("Country not found");
  }
  res.json(country.name);
});

// Part 4 - PUT /api/countries/:code
router.put("/", (req, res) => {
  const updatedCountry = {
    id: 4,
    name: "South Africa",
    alpha2Code: "ZA",
    alpha3Code: "ZAF",
  };

  //   const country = countries.find((country) => country.id === updatedCountry.id);
  const updated_countries = countries.forEach((country) => country.name);

  //   {
  //     if (country.id === updatedCountry.id) {
  //       return (country.name = updatedCountry.name);
  //     }
  //   });

  res.json(updated_countries);
});

// Part 5 - DELETE /api/countries/:code - OK
router.delete("/", (req, res) => {
  const delCountry = {
    id: 2,
    name: "Thailand",
    alpha2Code: "TH",
    alpha3Code: "THA",
  };

  const newCountries = countries.filter(
    (country) => country.id !== delCountry.id
  );
  res.json(newCountries);
});

// Part 6 - Add routing
router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

module.exports = router;
