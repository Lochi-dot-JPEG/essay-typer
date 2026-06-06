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
      "<details><summary><h2>" +
      formattedTime +
      "</h2></summary><p>" +
      converter.makeHtml(docContent);
    +"</p></details>";
  }
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
    index +
    "\n" +
    String(Date.now()) +
    name_content_delimitter +
    JSON.stringify(markdown).slice(1, -1);

  localStorage.setItem("docsIndex", index);
}

if (docsList) {
  LoadDocuments(GetDocuments());
}
