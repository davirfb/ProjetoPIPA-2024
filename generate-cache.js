const fs = require('fs');
const path = './images'; // Adjust to your folder path
const images = fs.readdirSync('./img').map(file => `/img/${file}`);
const urlsToCache = ['/', '/index.html', '/styles.css', '/script.js', ...images];
console.log(JSON.stringify(urlsToCache, null, 2));



