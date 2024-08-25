// @ts-nocheck


// const API_KEY = "cur_live_V5PGI8hqIuL8RyI4SIe8hA6JOaCXEAA62zHMBKWV";
function getUrl(date, from) {
  return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${from}.json`;
}


function getDate(timestamp = Date.now()) {
  const [mo, da, yr] = Intl.DateTimeFormat("default", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
    .format(new Date(timestamp))
    .split("/");

  return `${yr}.${Number(mo)}.${Number(da)}`;
}

function getConversion(from, to, amount, date = getDate()) {
  return fetch(getUrl(date, from.toLowerCase()))
    .then((response) => {
      if (response.ok) return response.json();
      return null;
    })
    .then((data) => {
      if (data) {
        const rate = data[from.toLowerCase()][to.toLowerCase()];

        return (rate * Number(amount)).toFixed(2);
      }

      return null;
    });
}

document.getElementById("form")?.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const amount = document.getElementById("amount")?.value;
  const fromSelect = document.getElementById("fromSelect")?.value;
  const toSelect = document.getElementById("toSelect")?.value;
  
  console.log("Form submitted,", amount, fromSelect, toSelect);

  if (fromSelect && toSelect && amount) {
    getConversion(fromSelect, toSelect, amount).then((result) => {
      const resultElement = document.getElementById("result");
      if (resultElement) {
        if (result) {
          resultElement.innerText = `${amount} ${fromSelect} = ${result.toString()} ${toSelect}`;
        } else {
          resultElement.innerText = "Error";
        }
      }
    });
  }
});

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  if (countryCode) {
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  }
}

function populateDropdown(selectId, selectedCode) {
  const fromSelect = document.getElementById(selectId);

  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (currCode === selectedCode) {
      newOption.selected = true;
    }

    fromSelect?.append(newOption);
  }

  fromSelect?.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

populateDropdown("fromSelect", "EUR");
populateDropdown("toSelect", "INR");
const text1 = document.querySelectorAll("p");
text1.forEach((text) => {
  // @ts-ignore
  text.textContent = text.textContent.toUpperCase();
});

const heading = document.querySelector("h1");
// @ts-ignore
heading.style.fontSize = "25px";
// @ts-ignore
heading.textContent = heading.textContent.toUpperCase();
// btn.addEventListener(("click"), async (evt) => {
//   evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   // @ts-ignore
//   let amtVal = amount.value;
//   if(amtVal <= 0 || amtVal === "") {
//         amtVal = 1;
//         // @ts-ignore
//         amount.value = 1;
//   }
// });

