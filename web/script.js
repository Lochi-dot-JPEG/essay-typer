let textAreaElement = document.getElementById("TypeArea");
let last_text = "";
textAreaElement.setAttribute("oninput", "UpdatedText()");
let backSpaceSize = 0;

function UpdatedText() {
  let new_text = textAreaElement.value;

  // Backspace crossing out handling
  let cut_last_text = last_text.substring(0, last_text.length - 1);
  if (new_text == cut_last_text) {
    let searching = true;
    let index = 1;
    while (searching) {
      let searched_character = last_text.substring(
        last_text.length - index,
        last_text.length - index + 1,
      );
      if (searched_character != "~") {
        last_text = last_text.substring(0, last_text.length - index);
        for (var i = 0; i < index; i++) {
          last_text += "~";
        }
        searching = false;
      }
      index += 1;
      if (index > 15) {
        searching = false;
      }
    }
    textAreaElement.value = last_text;
  } else if (new_text.includes(last_text)) {
    last_text = new_text;
  } else {
    textAreaElement.value = last_text;
  }
}

function Backspace() {}
