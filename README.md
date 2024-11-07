# Transly CLI Tool

Transly is a command-line tool that translates files in different formats (JSON, CSV, TXT) using Google Translate. It is designed to be efficient, easy to use, and supports caching to speed up translations when translating similar phrases.

## Features
- Supports multiple file formats: JSON, CSV, TXT.
- Caches translations to avoid re-translation of the same text.
- Supports source and target language selection.
- Displays progress with a progress bar during translation.

## Requirements
- Node.js (version >= 14.0.0)
- Internet connection (for making translation requests)

## Installation
To install Transly CLI, first clone the repository from GitHub and then install dependencies:

```bash
# Clone the repository
git clone https://github.com/masoudv/transly-cli.git

# Navigate to the project directory
cd transly-cli

# Install dependencies
npm install
```

## Usage
To use Transly CLI, you can use the following commands:

### Starting Transly
To start using Transly, first run the start command to see the logo and available options:
```bash
transly start
```
This will display the Transly logo along with helpful information about how to use the tool.

### Translating a JSON File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.json -l fa
```
This will translate the contents of `test.json` to Farsi.

### Translating a CSV File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.csv -l fa
```
This will translate the contents of `test.csv` to Farsi.

### Translating a TXT File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.txt -l fa
```
This will translate the contents of `test.txt` to Farsi.

### Additional Options
- `-s, --source <source>`: Specify the source language for translation (default is `en` for English).
- Example:
  ```bash
  transly translate test.json -l fa -s en
  ```
  This command will translate `test.json` from English to Farsi.

## File Formats Supported
Transly supports the following file formats:
- **JSON**: Each key-value pair in the JSON file will be translated.
- **CSV**: Each row in the CSV file will be translated.
- **TXT**: Each line in the TXT file will be translated.

## Example Files for Testing
### JSON Example File (`test.json`)
```json
{
  "greeting": "Hello",
  "farewell": "Goodbye",
  "question": "How are you?",
  "statement": "This is a test."
}
```

### CSV Example File (`test.csv`)
```csv
message
Hello
Goodbye
How are you?
This is a test.
```

### TXT Example File (`test.txt`)
```
Hello
Goodbye
How are you?
This is a test.
```

### Extended Example Files
These files contain 50 entries each for more extensive testing. You can create these files in the project folder to test the tool's capabilities with larger datasets:

- **`long_test.json`**: Contains 50 key-value pairs.
- **`long_test.csv`**: Contains 50 rows of data.
- **`long_test.txt`**: Contains 50 lines of text.

## Example Usage for Extended Files
To translate an extended JSON file:
```bash
transly translate long_test.json -l fa
```
This will translate the contents of `long_test.json` to Farsi, demonstrating how the tool handles larger files efficiently.

## Website and Social Media
- Website: [sirvav.com](https://sirvav.com)
- Instagram: [sirvav_com](https://instagram.com/sirvav_com)

## License
This project is licensed under the **GNU General Public License v3.0** (GPL-3.0). See the [LICENSE](LICENSE) file for more details.

## Future Plans
- **Web Version**: Plan to create a web version for online use with subscription-based advanced features.
- **API Integration**: Allow integration with other services using an API.

## Publishing to NPM (Coming Soon)
Once we finalize the features and test thoroughly, we plan to publish Transly on NPM for wider accessibility.

---

For any questions or feedback, feel free to reach out or open an issue on the GitHub repository!
