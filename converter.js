// const API_KEY = "cur_live_V5PGI8hqIuL8RyI4SIe8hA6JOaCXEAA62zHMBKWV";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.8.20/v1/currencies/eur.json";
const btn = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// for (code in countryList ) {
//   console.log(code,countryList[code]);
// }

for(let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "EUR") {
      newOption.selected = true;      
    }
    else if(select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
})
}

const updateFlag = (element) => {
 let currCode = element.value;
 let countryCode = countryList[currCode];

if (countryCode) {
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}
};

btn.addEventListener(("click"), async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal <= 0 || amtVal === "") {
        amtVal = 1;
        amount.value = 1;
  }

  data = await fetch(BASE_URL);
  data = await data.json();
  console.log(data);
  // console.log(data.rates.INR);

  console.log(fromCurr.value, toCurr.value, amtVal);

  // const URL = '${URL}&base_currency=${fromCurr.value.toLowerCase()}&target_currency=${toCurr.value.toLowerCase()}&amount=${amtVal}';
  // let response = await fetch(URL);
  // let data = await response.json();
  // console.log(data);


const new_URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

// const BASE_URL = `${URL}/${fromCurr.value}/${toCurr.value}.json`;
//     console.log("Fetching data from: ", BASE_URL);



try {
  var response = await fetch(new_URL);
  console.log("Response Status:", response.status);
  let data = await response.json();
  console.log("Response Data:", data);


  if (response.ok && data) {
      const exchangeRate = data.rates[toCurr.value];
      console.log(`Exchange Rate (${fromCurr.value} to ${toCurr.value}): ${exchangeRate}`);
      // Update your UI with the exchange rate
  } else {
      console.error("Failed to fetch the exchange rate. Please check the API response.");
  }
} catch (error) {
  console.error("Error fetching data:", error);
}

});





const text1 = document.querySelectorAll("p");
text1.forEach((text) => {
  text.textContent = text.textContent.toUpperCase();
});

const heading = document.querySelector("h1");
heading.style.fontSize = "25px";
heading.textContent = heading.textContent.toUpperCase();