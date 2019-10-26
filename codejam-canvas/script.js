const canvas = document.querySelector(".canvas"); // Select our canvas element
const ctx = canvas.getContext("2d"); // Save the context we're going to use
const switcher_x4 = document.querySelector("body > div > div.header > div.panel.switcher > div:nth-child(1)");
const switcher_x32 = document.querySelector("body > div > div.header > div.panel.switcher > div:nth-child(2)");
const switcher_x256 = document.querySelector("body > div > div.header > div.panel.switcher > div:nth-child(3)");
const source_image = document.querySelector('.rs');


function getColor(color) {
  if (typeof color === 'string') {
    return '#' + color;
  }

  let r = color[0];
  let g = color[1];
  let b = color[2];
  let a = color[3];

  return "rgba(" + r + ',' + g + ',' + b + ',' + a + ')';
}

function draw(A) {
  const width = A[0].length; // Get the width
  const height = A.length; // Get the height
  const scale = Math.floor(canvas.width / width); // Scales the whole image by this amount

  canvas.width = width * scale; // Set the canvas width
  canvas.height = height * scale; // Set the canvas height

  // Loop through each color and draw that section
  for (var row = 0; row < height; row++) {
    for (var col = 0; col < width; col++) {
      ctx.fillStyle = getColor(A[row][col]); // Set the color to the one specified
      ctx.fillRect(row * scale, col * scale, scale, scale); // Actually draw the rectangle
    }
  }
}

function copy() {
  const width = source_image.offsetWidth;
  const height = source_image.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(source_image, 0, 0);


  switcher_x4.style.background = '#fff';
  switcher_x32.style.background = '#fff';
  switcher_x256.style.background = '#eee';
}


switcher_x4.addEventListener('click', function() {
  fetch("./data4x4.json")
    .then(response => response.json())
    .then(json => draw(json));
  switcher_x4.style.background = '#eee';
  switcher_x32.style.background = '#fff';
  switcher_x256.style.background = '#fff';
});

switcher_x32.addEventListener('click', function() {
  fetch("./data32x32.json")
    .then(response => response.json())
    .then(json => draw(json));
    switcher_x4.style.background = '#fff';
    switcher_x32.style.background = '#eee';
    switcher_x256.style.background = '#fff';
});

switcher_x256.addEventListener('click', copy, false);