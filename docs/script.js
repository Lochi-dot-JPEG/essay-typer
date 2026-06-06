let textAreaElement = document.getElementById("TypeArea");
let pauseButton = document.getElementById("pause");
pauseButton.setAttribute("onclick", "Pause()");
let markedOut = document.getElementById("markedout");
let last_text = "";
textAreaElement.setAttribute("oninput", "UpdatedText()");
textAreaElement.setAttribute("onblur", "FocusTyping()");
markedOut.setAttribute("onclick", "FocusTyping()");

let backSpaceSize = 0;
// Strikethrough markdown
const st_length = 2;
let Paused = true;

textAreaElement.focus();
function FocusTyping() {
  if (textAreaElement.checkVisibility()) {
    textAreaElement.focus();
    let l = last_text.length;
    textAreaElement.setSelectionRange(l, l);
  }
}

function UpdatedText() {
  let new_text = textAreaElement.value;

  // Backspace crossing out handling
  let cut_last_text = last_text.substring(0, last_text.length - 1);
  if (new_text == cut_last_text) {
    Backspace();
  } else if (new_text.includes(last_text)) {
    let last_character = new_text.substring(new_text.length - 1);
    if (last_character != "~") {
      // Don't allow tildes
      last_text = new_text;
    }
    // Create double newlines
    if (last_character == "\n") {
      last_text += "\n";
    }
  }
  MergeDeletions();
  textAreaElement.value = last_text;
  RenderMarkdown();
}

function RenderMarkdown(addCaret = true) {
  if (addCaret) {
    markedOut.innerHTML = converter.makeHtml(last_text + "|");
  } else {
    markedOut.innerHTML = converter.makeHtml(last_text);
  }
}

function Backspace() {
  let index = 1;

  // Check has already backspaced
  let last_letter = last_text.substring(last_text.length - 1);
  if (last_letter == "\n") {
    return;
  }
  let already_deleting = last_letter == "~";
  // Extend deletion
  if (already_deleting) {
    let deletion_length = 1;
    let searching = true;

    while (searching) {
      let searched_character = last_text.substring(
        last_text.length - deletion_length - st_length - 1,
        last_text.length - deletion_length - st_length,
      );

      if (searched_character == "~") {
        last_text = last_text.substring(0, last_text.length - index - 1);
        searching = false;
        continue;
      } else {
        deletion_length += 1;
      }
      // Avoid infinite loop if bugged
      if (deletion_length > 5000) {
        console.log("overflowed");
        searching = false;
      }
    }
    // Add another character to the deletion
    let already_deleted = last_text.substring(
      last_text.length - deletion_length,
      last_text.length,
    );
    let before_deletion = last_text.substring(
      0,
      last_text.length - deletion_length - st_length - 1,
    );
    let add_to_deletion = last_text.substring(
      last_text.length - deletion_length - st_length,
      last_text.length - deletion_length - st_length - 1,
    );
    if (add_to_deletion == "\n") {
      last_text += "~~";
    } else {
      last_text =
        before_deletion + "~~" + add_to_deletion + already_deleted + "~~";
    }

    // First character deletion
  } else {
    // Delete one character
    last_text = last_text.substring(0, last_text.length - 1);
    if (last_letter != " ") {
      last_text = last_text + "~~";
      last_text = last_text + last_letter + "~~";
    }
  }
}

function MergeDeletions() {
  last_text = last_text.replaceAll("~~~~", "");
  last_text = last_text.replaceAll("\n\n\n", "\n\n");
}
function Pause() {
  Paused = !Paused;
  if (Paused) {
    textAreaElement.setAttribute("disabled", "");
    markedOut.style.opacity = "0.5";
    pauseButton.innerText = "Unpause";
  } else {
    textAreaElement.removeAttribute("disabled");
    markedOut.style.opacity = "1";
    pauseButton.innerText = "Pause";
    FocusTyping();
  }
}

window.addEventListener("load", (event) => {
  if (localStorage.getItem("autosave") != "") {
    LoadAutoSave();
  }
});
