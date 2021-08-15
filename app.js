//Selecting the div container
const container = document.getElementById("notesBox");

//Selecting the New Note button
const addNote = document.getElementById("addbox");

const titleInput = document.getElementById("titleInput");

const bodyInput = document.getElementById("bodyInput");

const allItems = document.getElementsByClassName("notes");

//Selecting the delete all button
const deleteAll = document.getElementById("deleteAll");

deleteAll.style.display = "none";

//Declaring I to use for data id numbers
let i = 0;

let x = 0;

//Making a Note class for new notes

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = i;
  }
}

function createNote(e) {
  if ((titleInput.value == false) | (bodyInput.value == false)) {
    //Alert to enter something!
    window.alert("Please enter a new item");

    deleteAll.style.display = "none";
  } else {
    e.preventDefault();

    localStorage.setItem(`${titleInput.value}`, `${bodyInput.value}`);

    console.log(localStorage);

    deleteAll.style.display = "";

    i++;

    x++;

    let newDiv = document.createElement("div");

    let titleDiv = document.createElement("div");

    titleDiv.setAttribute("data-id", i);

    titleDiv.setAttribute("data-title", `${titleInput.value}`);

    newDiv.setAttribute("data-id", x);

    titleDiv.className = "notes";

    let note = new Note(titleInput.value, bodyInput.value);

    newDiv.innerText = `${bodyInput.value}`;

    titleDiv.innerText = `${titleInput.value}`;

    //Create delete button
    let deleteButton = document.createElement("button");

    //Assign delete button class, positioning, overlay, attributes, etc.
    deleteButton.className = "btn deletebtn";

    deleteButton.innerText = "X";

    deleteButton.style.position = "relative";

    deleteButton.setAttribute("data-delete-num", i);

    deleteButton.addEventListener("click", trashNote);

    deleteButton.classList.add("deletebtn");

    titleInput.value = "";

    bodyInput.value = "";

    titleDiv.appendChild(deleteButton);

    container.appendChild(titleDiv);
    titleDiv.appendChild(newDiv);
  }
}

function trashNote(e) {
  if ([...allItems].length == 1) {
    deleteAll.style.display = "none";
  }

  e.preventDefault();

  let title = e.target.parentElement.getAttribute("data-title");
  //Get value of delete button
  let deleteValue = e.target.getAttribute("data-delete-num");

  //Get value of parent div/note
  let noteValue = document.querySelector(`[data-id="${deleteValue}"]`);

  noteValue.parentElement.removeChild(noteValue);
  localStorage.removeItem(title);
  console.log(localStorage);
}

function deleteList(e) {
  [...allItems].map((htmlList) => htmlList.remove());
  deleteAll.style.display = "none";
  localStorage.clear();
  e.preventDefault();
}

function refreshNotes(key, value) {
  if (localStorage.length == 0) {
    deleteAll.style.display = "none";
  } else {

    deleteAll.style.display = "";

    i++;

    let newDiv = document.createElement("div");

    let titleDiv = document.createElement("div");

    titleDiv.setAttribute("data-id", i);

    titleDiv.setAttribute("data-title", key);

    titleDiv.className = "notes";

    let note = new Note(key, value);

    newDiv.innerText = key;

    titleDiv.innerText = value;

    //Create delete button
    let deleteButton = document.createElement("button");

    //Assign delete button class, positioning, overlay, attributes, etc.
    deleteButton.className = "btn deletebtn";

    deleteButton.innerText = "X";

    deleteButton.style.position = "relative";

    deleteButton.setAttribute("data-delete-num", i);

    deleteButton.classList.add("deletebtn");

    deleteButton.addEventListener("click", trashNote);

    titleDiv.appendChild(deleteButton);

    container.appendChild(titleDiv);

    titleDiv.appendChild(newDiv);
  }
}

//Retrieving from localstorage on refresh
function gatherData(e) {
  for (let k = 0; k < localStorage.length; k++) {
    const key = localStorage.key(k);
    const value = localStorage.getItem(key);

    refreshNotes(key, value);
  }
}

addNote.addEventListener("click", createNote);

window.addEventListener("load", gatherData);

deleteAll.addEventListener("click", deleteList);
