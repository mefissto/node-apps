console.log('JS is loaded');

fetch('http://localhost:3000/weather?address=boston')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
