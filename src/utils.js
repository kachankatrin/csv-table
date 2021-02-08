import moment from "moment";

const states = {
  Arizona: "AZ",
  Alabama: "AL",
  Alaska: "AK",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

export function validateEmail(email) {
  // took a regExp for email validation from stackoverflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateDuplicates = (arr) => {
  return arr.length > 1;
};

export const validateAge = (age) => age >= 21 && Math.floor(age) === age;

export const validateExperience = (experience, age) =>
  experience >= 0 && experience <= age;

export const validateIncome = (income) => {
  return income <= 1000000 && income >= 0;
};

export const validateChildren = (children) =>
  children === true || children === false || children === null;

export const stateAbbr = (input) => {
  let statesBeautified;
  const abbrOfStates = Object.values(states);
  let index;
  if (input.includes("|")) {
    statesBeautified = input.split("|");
  } else {
    statesBeautified = [input];
  }
  const filtered = statesBeautified
    .map((state) => {
      index = abbrOfStates.indexOf(state);
      return index !== -1 ? abbrOfStates[index] : states[state];
    })
    .join(", ");
  return filtered;
};

export const validateDate = (date) => {
  if (
    moment(date, "MM/DD/YYYY", true).isValid() ||
    moment(date, "YYYY-MM-DD", true).isValid()
  ) {
    const formattedDate = moment(date).format("LL");
    return Date.parse(formattedDate) > Date.now();
  }
};

export const validateLicense = (license) =>
  license.length === 6 && license.match(/^[a-zA-Z0-9]*$/g);

export const validatePhone = (tel) => {
  const telMatch = `${tel}`.match(/^[0-9+]*$/g);
  if (!telMatch) {
    return false;
  }
  const telNumber = telMatch[0];
  let normilized = telNumber;
  if (telNumber.startsWith("+1")) {
    normilized = telNumber.slice(2);
    return normilized.length === 10;
  }
  if (telNumber.startsWith("1")) {
    normilized = telNumber.slice(1);
    return normilized.length === 10;
  } else {
    return normilized.length === 10;
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeHeader = (str) => {
  let capitalized;
  if (str.includes(" ")) {
    const arr = str.split(" ");
    capitalized = arr.map((item) => capitalize(item));
    return capitalized.join(" ");
  } else {
    return capitalize(str);
  }
};