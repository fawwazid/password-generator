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
## Security
- Passwords are generated locally with the browser Web Crypto API (`crypto.getRandomValues`), using rejection sampling to avoid modulo bias.
- Password length is 12–128 characters (default: 20). Every selected character class is represented, followed by a cryptographically secure shuffle.
- No password is sent to a server or stored by the application. Treat copied passwords as sensitive clipboard data.
- Clipboard copying requires a secure context (HTTPS or localhost in modern browsers); when unavailable, select and copy the displayed password manually.
- The strength indicator is an approximation, not a password security audit. Use unique passwords and a trusted password manager.
- If secure randomness is unavailable, generation fails closed rather than falling back to `Math.random()`.
