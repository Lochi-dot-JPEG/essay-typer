let textAreaElement = document.getElementById("TypeArea");
let last_text = "";
textAreaElement.setAttribute("oninput", "UpdatedText()");
let backSpaceSize = 0;
// Strikethrough markdown
const st_length = 2

function UpdatedText() {
	let new_text = textAreaElement.value;

	// Backspace crossing out handling
	let cut_last_text = last_text.substring(0, last_text.length - 1);
	if (new_text == cut_last_text) {
		Backspace();
	} else if (new_text.includes(last_text)) {
		last_text = new_text;
	} else {
		textAreaElement.value = last_text;
	}
	RenderMarkdown()

}

function RenderMarkdown() {
	document.getElementById('markedout').innerHTML =
		marked.parse(last_text);
}

function Backspace() {
	let index = 1;

	// Check has already backspaced
	let last_letter = last_text.substring(last_text.length - 1);
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
				continue
			} else {
				deletion_length += 1;
			}
			// Avoid infinite loop if bugged
			if (deletion_length > 1024) {
				console.log("overflowed")
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
		last_text = before_deletion + "~~" + add_to_deletion + already_deleted + "~~"
		// First character deletion
	} else {
		// Delete character
		last_text = last_text.substring(0, last_text.length - 1);
		last_text = last_text + "~~";
		last_text = last_text + last_letter + "~~";
	}
	MergeDeletions()
	textAreaElement.value = last_text;
}

function MergeDeletions() {
	while (last_text.includes("~~~~")) {
		let index = last_text.indexOf("~~~~")
		last_text = last_text.substring(0, index) + last_text.substring(index + 4)
	}
}
