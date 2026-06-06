const name_content_delimitter = " ~~~ ";

showdown.setOption("strikethrough", "true");
let converter = new showdown.Converter();

let docsList = document.getElementById("docsList");

function LoadDocuments(index) {
  docsList.innerHTML = "";
  for (var content in index) {
    var docName = index[content][0];

    var date = new Date(Number(docName));
    var day =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    var formattedTime = day + " " + hours + ":" + minutes.substr(-2);

    // Unescapes newlines
    var docContent = JSON.parse(`"${index[content][1]}"`);

    docsList.innerHTML +=
      "<div class='bordered'> <div class=buttons><button onClick='DeleteDocument(" +
      docName +
      ")'>Delete</button>" +
      "<button onClick=\"Copy('" +
      JSON.stringify(docContent).slice(1, -1) +
      "')\">Copy Markdown</button></div>" +
      "<details><summary><h2>" +
      formattedTime +
      "  </h2>" +
      '</summary><div class="box">' +
      converter.makeHtml(docContent);
    +"</div></details></div>";
  }
}

function Copy(text) {
  console.log(text);
  navigator.clipboard.writeText(JSON.parse(`"${text}"`)).then(
    () => {
      console.log("Text successfully copied!");
    },
    () => {
      console.error("Failed to copy text: ", err);
    },
  );
}
function DeleteDocument(name) {
  if (!confirm("Do you want to delete this?")) {
    return;
  }
  let index = localStorage.getItem("docsIndex");
  if (!index) {
    return;
  }
  let newIndex = "";
  const split = index.split("\n");
  for (var line in split) {
    if (!split[line].startsWith(name)) {
      newIndex += "\n" + split[line];
    } else {
      console.log("removes " + name);
    }
  }

  localStorage.setItem("docsIndex", newIndex.trim());
  location.reload();
}

function GetDocuments() {
  let index = localStorage.getItem("docsIndex");

  if (!index) {
    return;
  }
  const lines = index.split("\n");
  let split_index = [];
  for (var line in lines) {
    if (lines[line] == "") {
      continue;
    }
    name_content = lines[line].split(name_content_delimitter);
    split_index.push(name_content);
  }
  return split_index;
}

function SaveFile(markdown) {
  // Get storage index
  let index = localStorage.getItem("docsIndex");
  if (!index) {
    index = "";
  }
  index =
    "\n" +
    String(Date.now()) +
    name_content_delimitter +
    JSON.stringify(markdown).slice(1, -1) +
    index;

  localStorage.setItem("docsIndex", index.trim());
  localStorage.setItem("autosave", "");
}

if (docsList) {
  LoadDocuments(GetDocuments());
}

function LoadAutoSave() {
  const json_data = localStorage.getItem("autosave");
  const autosave_data = JSON.parse(json_data);

  Start(autosave_data.seconds_remaining / 60);
  last_text = autosave_data.current_text;
  if (!Paused) {
    Pause();
  }
  RenderMarkdown();
}

function AutoSave() {
  if (textAreaElement.value == "") {
    return;
  }
  const autosaved_file = {
    seconds_remaining: seconds_remaining,
    current_text: textAreaElement.value,
  };
  const autosave_json = JSON.stringify(autosaved_file);

  localStorage.setItem("autosave", autosave_json);
}
