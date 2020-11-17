console.log('client side is ok for send request');



// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=boston').then( (response) => {
//     response.json().then( (data) => {
//         if(data.error) {
//             return console.log('You have an Error')
//         }
//         console.log(data.location);
//         console.log(data.forecast);
//     })
// })

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${search.value}`).then( (response) => {
    response.json().then( (data) => {
        if(data.error) {
                messageOne.textContent = 'Unable to find location, Try another search';
                messageTwo.textContent = '';
           // return console.log('You have an Error')
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
        // console.log(data.location);
        // console.log(data.forecast);
        
    })
    })
})