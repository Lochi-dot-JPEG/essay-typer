# Essay Style Typer

Text editor software that places restrictions on text deletion to force chronological editing. This will help build the skills for typing coherent essays without relying on the advantages of digital tools for fast iteration.

## Premise

Text editor that attempts to mimic the limitations of writing on paper.

- Editing past text can only be done by crossing out words and typing on an above line buffer to show edits (like writing extra words above written text)
- Simple modal (vim-like?) editing for jumping around the buffer
- Left handed and right handed modes for rendering a hand in the way of writing to make it harder to see past text.
- Zoom options

## TODO

- [ ] Prototype in plain html/css/javascript
- [ ] Deleting generating strikethrough markdown
- [ ] [Render markdown](https://marked.js.org/) and hide textarea. 

## Similar Projects

[Similar philosophy in the most dangerous writing app](https://en.wikipedia.org/wiki/The_Most_Dangerous_Writing_App), forcing always moving forward and rejecting editting the first draft.

## Technologies

- Pure html/css/javascript prototype
- Web app would be ideal for rendering advanced stuff
	- Electron for desktop
	- React
- Game engine?
    - Godot
    - raylib
