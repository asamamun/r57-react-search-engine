import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

/* function sq(n){
  return n*n; 
}
console.log(sq(6)); */
// console.log("abcdaefg".replaceAll("a", "*"));
/* function getTheTruth() {
  if (console.log('B:List')) {
  return true;
  } else {
  return false;
  }
  }
  console.log(getTheTruth()); */
  



/* let first = false;
function hi(n){
  console.log('hi:' + n);
}

for (let index = 0; index < 5; index++) {
  if(!first) first=true;
  else hi(index);
} */
/*
//page 80
const user = {
  firstName: 'Robin',
  pet: {
    name: 'Trixi',
    age:5
  },
};
 // without object destructuring
const firstName = user.firstName;
const name = user.pet.name;
console.log(firstName + ' has a pet called ' + name); 
// "Robin has a pet called Trixi"*/
/*
  // with nested object destructuring
const {
  firstName,
  pet: {
  name,
  },
  } = user;
  console.log(firstName + ' has a pet called ' + name);
  // "Robin has a pet called Trixi"
*/
/*
  let prod = {
    name:"phone",
    color: "green",
    ram:{ twogb:"2GB", fourgb:"4GB",eightgb:"8GB"},
    rom:{ sixtyfourgb:"64GB", onetwoeightgb:"128GB"}
  }

  const {ram:{fourgb},rom:{onetwoeightgb}} = prod;
  console.log(fourgb);
  console.log(onetwoeightgb);
*/
/* const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
console.log(numbersCombined);
const profile = {
  firstName: 'Robin',
  lastName: 'Wieruch',
  hobby:{reading: 1, writing:2}
  };
  const address = {
  country: 'Germany',
  city: 'Berlin',
  };
  const user = {
  ...profile,
  gender: 'male',
  ...address,
  };
  console.log(user); */

/* //rest operator in object destructuring example 1
  let chars = {a: 'a', b:'b', c: 'c', d: 'd', e: 'e'};
  const {c,d,...others} = chars;
  console.log(others);
  //rest operator in object destructuring example 2
  const user = {
    id: '1',
    firstName: 'Robin',
    lastName: 'Wieruch',
    country: 'Germany',
    city: 'Berlin',
    };
    const { id, country, city, ...userWithoutAddress } = user;
    console.log(userWithoutAddress);
     */
  
