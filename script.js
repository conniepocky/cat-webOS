// time code

var timeText = document.querySelector("#time_text");

function updateTime() {
    var currentTime = new Date().toLocaleString();
    timeText.innerHTML =  currentTime;
}

setInterval(updateTime, 1000);

// window and app icon logic 

var welcomeScreen = document.querySelector("#welcome");

var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenOpen.addEventListener('click', () => openWindow(welcomeScreen))

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add('selected')
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove('selected')
  selectedIcon = undefined
}

function handleIconTap(element, window) {
  console.log('tapped icon')
  if (element.classList.contains('selected')) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

var biggestIndex = 1;

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;  
    element.style.zIndex = biggestIndex;
}

function addWindowTapHandling(element) {
  element.addEventListener('mousedown', () => handleWindowTap(element))
}

function handleWindowTap(element) {
  biggestIndex++ 
  element.style.zIndex = biggestIndex
  topBar.style.zIndex = biggestIndex + 1
  deselectIcon(selectedIcon)
}

function makeClosable(elementName) {
  var screen = document.querySelector('#' + elementName)
  var closeButton = document.querySelector('#' + elementName + 'close')
  closeButton.addEventListener('click', () => closeWindow(screen))
}


function initializeIcon(name) {
  var icon = document.querySelector('#' + name + 'icon')
  var screen = document.querySelector('#' + name)
  icon.addEventListener('click', () => handleIconTap(icon, screen))
}

function initializeWindow(elementName) {
  var screen = document.querySelector('#' + elementName)
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
  if (elementName != 'welcome') {
    initializeIcon(elementName)
  }
}

initializeWindow('welcome')
initializeWindow('notes')
initializeWindow('binary')
initializeWindow('photo')

// drag logic

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// notes app content

var content = [
  {
    title: 'Notes App',
    content: `
          <p contenteditable="True">
            <span contenteditable="true">
              Welcome to <strong>notepad!</strong>
              </br>
              This is a place where you can store any thoughts or notes you may have. You can even edit the text in this note!
            </span>
        </p>
      `
  }
]

function setNotesContent(index) {
  var notesContent = document.querySelector('#notesContent')

  notesContent.innerHTML = content[index].content
}

setNotesContent(0)

// photos

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_BZOhBxF0VXtHFCOtRJbo5fE3FzKJh9YdEDPkwKeasNxSIOBJ2oCfmZDaX4qBQXT5"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function setPhotoContent(photoUrl) {
  var photoContent = document.querySelector('#photoContent')
  photoContent.innerHTML = `<img src="${photoUrl}" alt="Random Cat" style="max-width: 50%; max-height: 50%;">`
}

function loadRandomCatPhoto() {
  fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const photoUrl = data[0].url;
        setPhotoContent(photoUrl);
      }
    })
    .catch(error => console.log('error', error));
}

loadRandomCatPhoto()

// when image pressed get new photo

var photoContent = document.querySelector('#photoContent')
photoContent.addEventListener('click', () => { loadRandomCatPhoto() })

// binary app content

function decodeBinary() {
  var bit128 = document.querySelector('#bit128').checked ? 1 : 0;
  var bit64 = document.querySelector('#bit64').checked ? 1 : 0;
  var bit32 = document.querySelector('#bit32').checked ? 1 : 0;
  var bit16 = document.querySelector('#bit16').checked ? 1 : 0;
  var bit8 = document.querySelector('#bit8').checked ? 1 : 0;
  var bit4 = document.querySelector('#bit4').checked ? 1 : 0;
  var bit2 = document.querySelector('#bit2').checked ? 1 : 0;
  var bit1 = document.querySelector('#bit1').checked ? 1 : 0;
  
  var binaryString = `${bit128}${bit64}${bit32}${bit16}${bit8}${bit4}${bit2}${bit1}`;
  var decimalValue = parseInt(binaryString, 2);
  
  var decodedOutput = document.querySelector('#decodedOutput');
  decodedOutput.textContent = `Decimal Value: ${decimalValue}`;

  var binaryOutput = document.querySelector('#binaryOutput');
  binaryOutput.textContent = `Binary Input: ${binaryString}`;
}