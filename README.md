# Transly CLI Tool

**Transly** is a command-line tool designed to translate files in different formats (JSON, CSV, TXT) using Google Translate. It aims to provide developers and users with an easy way to translate data efficiently, with caching support to avoid repeated translations of the same text.

## Features
- Supports multiple file formats: JSON, CSV, TXT.
- Caches translations to prevent re-translation of the same content, improving speed.
- Allows users to select both source and target languages.
- Displays translation progress with a progress bar.

## Requirements
- **Node.js** version >= 14.0.0
- Internet connection (for making translation requests)

## Installation
To install Transly globally using NPM:

```bash
npm install -g transly-cli
```

## Usage
Once installed, you can start using Transly through the command line.

### Start Transly
To display the logo and available options, use the following command:
```bash
transly start
```
This will display the Transly logo along with helpful information about how to use the tool.

### Translating Files
Transly allows you to translate JSON, CSV, and TXT files to your target language.

#### Translating a JSON File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.json -l fa
```
This will translate the contents of `test.json` to Farsi.

#### Translating a CSV File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.csv -l es
```
This will translate the contents of `test.csv` to Spanish.

#### Translating a TXT File
```bash
transly translate <file_path> -l <target_language>
```
Example:
```bash
transly translate test.txt -l de
```
This will translate the contents of `test.txt` to German.

### Additional Options
- `-s, --source <source>`: Specify the source language for translation (default is `en` for English).
  
Example:
```bash
transly translate test.json -l fa -s en
```
This command will translate `test.json` from English to Farsi.

## Example Files for Testing
You can create the following sample files to test the tool:

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
These files contain 50 entries each for more extensive testing:
- **`long_test.json`**: Contains 50 key-value pairs.
- **`long_test.csv`**: Contains 50 rows of data.
- **`long_test.txt`**: Contains 50 lines of text.

## License
This project is licensed under the **GNU General Public License v3.0** (GPL-3.0). See the [LICENSE](LICENSE) file for more details.

## NPM Package
- [Transly on NPM](https://www.npmjs.com/package/transly-cli)

## Website and Social Media
- Website: [sirvav.com](https://sirvav.com)
- Instagram: [sirvav_com](https://instagram.com/sirvav_com)

## Future Plans
- **Web Version**: Plan to create a web version for online use with subscription-based advanced features.
- **API Integration**: Allow integration with other services using an API.

## Published on NPM
Transly is now available on NPM for installation and use globally.

---

For any questions or feedback, feel free to reach out or open an issue on the GitHub repository!

Happy translating! 🚀
