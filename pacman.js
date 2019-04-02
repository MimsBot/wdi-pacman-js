// Setup initial game stats

let score = 0;
let lives = 2;


// Define your ghosts here

const inky = {
  menu_option: '1',
  name: 'Inky',
  color: 'Red',
  character: 'Shadow'
  // edible: false
};


const blinky = {
  menu_option: '2',
  name: 'Blinky',
  color: 'Cyan',
  character: 'Speedy'
  // edible: false
};


const pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  character: 'Bashful'
  // edible: false
};


const clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  character: 'Pokey'
  // edible: false
};

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`\nPower-Pellets: ${powerPellets}`);
}


function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  ghosts.forEach(function(ghost) {
    let edible_status = ghost.edible ? 'edible':'inedible';
    console.log(`(${ghost.menu_option}) Eat ${ghost.name} (${edible_status})`);
  });
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (!ghost.edible) {
    console.log(`\n${ghost.colour} ${ghost.name} killed Pac-Man!`);
    lives--;
    checkLives();
  } else {
    console.log(`\nPac-Man just ate ${ghost.colour} ${ghost.name}!`);
    score += 200;
    ghost.edible = false;
  }
}
 function eatPowerPellet() {
   score += 50;
   ghosts.forEach(function(ghost) {
     ghost.edible = true;
   });
   powerPellets--;
 }

function checkLives() {
  if (lives < 0) {
    process.exit();
  }
}

function somePelletsLeft() {
  return powerPellets > 0;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
