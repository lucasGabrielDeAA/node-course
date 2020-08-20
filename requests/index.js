/* 
* Get an user
* Get phone number from an user by its ID
* Get the address from an user by its ID
*/
const util = require('util');
const getAddressAsync = util.promisify(getAddress);

function getUser() {
  // reject -> to catch problems
  // resolve -> Everything OK
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: Math.random(),
        name: 'Aladdin',
        birthday: new Date(),
      })
     }, 1000);
  })
 }
 
 function getPhone(idUser) {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       return resolve({
         number: '999998888',
         prefix: 32,
        })
      }, 1000);
    })
 }
 
 function getAddress(idUser, callback) {
     setTimeout(() => {
       return callback(null, {
         street: 'Rua dos bobos',
         number: 0,
        })
      }, 1000);
 }
 
// Callback
// getUser((userError, user) => {
//   if (userError) {
//     console.log(`User error ${userError}`);
//     return;
//   }

//   getPhone(user.id, (phoneError, phone) => {
//     if (phoneError) {
//       console.log(`Phone error ${phoneError}`);
//       return;
//     }

//     getAddress(user.id, (addressError, address) => {
//       if (addressError) {
//         console.log(`Address error ${addressError}`);
//         return;
//       }

//       console.log(`User: ${user.name}\nPhone: (${phone.prefix})${phone.number}\nAddress: ${address.street} - número: ${address.number}`);
//     })
//   })
// });

// Promises
// .then() -> Manipulate result
// .catch() -> Catch errors
// getUser().then(user => {
//   return getPhone(user.id).then(phone => {
//     return { user: { ...user }, phone };
//   }).then(result => {
//     const addressAsyncResult = getAddressAsync(result.user.id);
//     return addressAsyncResult.then(addressResult => {
//       return { ...result, address: { ...addressResult} };
//     })
//   })
// }).then(result => {
//   console.log(`User: ${result.user.name}\nPhone: (${result.phone.prefix})${result.phone.number}\nAddress: ${result.address.street} - número: ${result.address.number}`);
// }).catch(error => {
//   console.log(`Error ${error}`);
// })

// Async/await
async function main() {
  try {
    console.time('Async/await');
    const user = await getUser();
    // const phone = await getPhone(user.id);
    // const address = await getAddressAsync(user.id);

    // Using Promise.all
    const result = await Promise.all([
      getPhone(user.id),
      getAddressAsync(user.id)
    ]);
    const phone = result[0];
    const address = result[1];

    console.log(`User: ${user.name}\nPhone: (${phone.prefix})${phone.number}\nAddress: ${address.street} - número: ${address.number}`);
    console.timeEnd('Async/await');
  } catch (error) {
    console.log(`Error ${error}`);
  }
}

main()
