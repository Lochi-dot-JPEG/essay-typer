let textAreaElement = document.getElementById("TypeArea")
let last_text = ""
textAreaElement.setAttribute("oninput", "UpdatedText()")

function UpdatedText() {
	let new_text = textAreaElement.value
	if (new_text.includes(last_text)) {
		last_text = new_text
	} else {
		textAreaElement.value = last_text
	}
}
