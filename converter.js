// @ts-nocheck

// const countryList = {
//   AED: "AE",
//   AFN: "AF",
//   XCD: "AG",
//   ALL: "AL",
//   AMD: "AM",
//   ANG: "AN",
//   AOA: "AO",
//   AQD: "AQ",
//   ARS: "AR",
//   AUD: "AU",
//   AZN: "AZ",
//   BAM: "BA",
//   BBD: "BB",
//   BDT: "BD",
//   XOF: "BE",
//   BGN: "BG",
//   BHD: "BH",
//   BIF: "BI",
//   BMD: "BM",
//   BND: "BN",
//   BOB: "BO",
//   BRL: "BR",
//   BSD: "BS",
//   NOK: "BV",
//   BWP: "BW",
//   BYR: "BY",
//   BZD: "BZ",
//   CAD: "CA",
//   CDF: "CD",
//   XAF: "CF",
//   CHF: "CH",
//   CLP: "CL",
//   CNY: "CN",
//   COP: "CO",
//   CRC: "CR",
//   CUP: "CU",
//   CVE: "CV",
//   CYP: "CY",
//   CZK: "CZ",
//   DJF: "DJ",
//   DKK: "DK",
//   DOP: "DO",
//   DZD: "DZ",
//   ECS: "EC",
//   EEK: "EE",
//   EGP: "EG",
//   ETB: "ET",
//   EUR: "FR",
//   FJD: "FJ",
//   FKP: "FK",
//   GBP: "GB",
//   GEL: "GE",
//   GGP: "GG",
//   GHS: "GH",
//   GIP: "GI",
//   GMD: "GM",
//   GNF: "GN",
//   GTQ: "GT",
//   GYD: "GY",
//   HKD: "HK",
//   HNL: "HN",
//   HRK: "HR",
//   HTG: "HT",
//   HUF: "HU",
//   IDR: "ID",
//   ILS: "IL",
//   INR: "IN",
//   IQD: "IQ",
//   IRR: "IR",
//   ISK: "IS",
//   JMD: "JM",
//   JOD: "JO",
//   JPY: "JP",
//   KES: "KE",
//   KGS: "KG",
//   KHR: "KH",
//   KMF: "KM",
//   KPW: "KP",
//   KRW: "KR",
//   KWD: "KW",
//   KYD: "KY",
//   KZT: "KZ",
//   LAK: "LA",
//   LBP: "LB",
//   LKR: "LK",
//   LRD: "LR",
//   LSL: "LS",
//   LTL: "LT",
//   LVL: "LV",
//   LYD: "LY",
//   MAD: "MA",
//   MDL: "MD",
//   MGA: "MG",
//   MKD: "MK",
//   MMK: "MM",
//   MNT: "MN",
//   MOP: "MO",
//   MRO: "MR",
//   MTL: "MT",
//   MUR: "MU",
//   MVR: "MV",
//   MWK: "MW",
//   MXN: "MX",
//   MYR: "MY",
//   MZN: "MZ",
//   NAD: "NA",
//   XPF: "NC",
//   NGN: "NG",
//   NIO: "NI",
//   NPR: "NP",
//   NZD: "NZ",
//   OMR: "OM",
//   PAB: "PA",
//   PEN: "PE",
//   PGK: "PG",
//   PHP: "PH",
//   PKR: "PK",
//   PLN: "PL",
//   PYG: "PY",
//   QAR: "QA",
//   RON: "RO",
//   RSD: "RS",
//   RUB: "RU",
//   RWF: "RW",
//   SAR: "SA",
//   SBD: "SB",
//   SCR: "SC",
//   SDG: "SD",
//   SEK: "SE",
//   SGD: "SG",
//   SKK: "SK",
//   SLL: "SL",
//   SOS: "SO",
//   SRD: "SR",
//   STD: "ST",
//   SVC: "SV",
//   SYP: "SY",
//   SZL: "SZ",
//   THB: "TH",
//   TJS: "TJ",
//   TMT: "TM",
//   TND: "TN",
//   TOP: "TO",
//   TRY: "TR",
//   TTD: "TT",
//   TWD: "TW",
//   TZS: "TZ",
//   UAH: "UA",
//   UGX: "UG",
//   USD: "US",
//   UYU: "UY",
//   UZS: "UZ",
//   VEF: "VE",
//   VND: "VN",
//   VUV: "VU",
//   YER: "YE",
//   ZAR: "ZA",
//   ZMK: "ZM",
//   ZWD: "ZW",
// };


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

