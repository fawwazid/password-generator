# password-generator

Password generator — a simple client-side tool to create strong, random passwords to help protect accounts and reduce security risks.

## Features
- Generate passwords of configurable length.
- Include or exclude uppercase, lowercase, numbers, and symbols.
- Copy generated passwords to the clipboard.
- Lightweight and client-side only — no server required.

## Usage
- Open `index.html` in your browser.
- Or serve the project locally (example):
	- `python -m http.server 8000` (run from the project root), then visit `http://localhost:8000/`.

## Development
- Key files:
	- `index.html` — UI markup.
	- `js/script.js` — password generation logic and UI hooks.
	- `css/style.css` — custom styles.
- To modify behavior, edit `js/script.js` and reload the page.

## Contributing
Found a bug or want a new feature? Please open an issue or submit a pull request.

## License
This project is licensed under the terms in the `LICENSE` file.