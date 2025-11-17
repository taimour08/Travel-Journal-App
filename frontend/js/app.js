const button = document.getElementById('showGamersBtn');
const container = document.getElementById('data-container');

console.log('Button:', button); // Check if button is found
console.log('Container:', container); // Check if container is found

button.addEventListener('click', function() {
    console.log('Button clicked!'); // Check if click works
     container.innerHTML = '<p>Hello</p>';
   
});

 container.innerHTML = '<p>Hello World!</p>';