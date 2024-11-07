#!/usr/bin/env node

const figlet = require('figlet');
const { Command } = require('commander');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const cliProgress = require('cli-progress');
const { LRUCache } = require('lru-cache');
const csv = require('csv-parser');
const readline = require('readline');
const program = new Command();

const CACHE_FILE = 'translation_cache.json';

// Create an LRU Cache with a maximum of 100 items
const cacheOptions = {
  max: 100,
  ttl: 1000 * 60 * 60 * 24 * 30,
};
const translationCache = new LRUCache(cacheOptions);

// Load existing cache from file (if available)
if (fs.existsSync(CACHE_FILE)) {
  const cacheData = fs.readFileSync(CACHE_FILE);
  const parsedData = JSON.parse(cacheData);
  Object.keys(parsedData).forEach(key => {
    translationCache.set(key, parsedData[key]);
  });
}

// Function to display Transly logo and version
function displayLogo() {
  figlet('Transly v1.0.2', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

// Function to translate text using Google Translate via scraping
async function translateText(text, sourceLang, targetLang) {
  const cacheKey = `${text}_${sourceLang}_${targetLang}`;

  // Check if the translation already exists in the LRU cache
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const response = await axios.get('https://translate.google.com/m', {
      params: {
        sl: sourceLang,
        tl: targetLang,
        q: text,
      },
    });

    const $ = cheerio.load(response.data);
    const translatedText = $('div.result-container').text().trim();

    // Store the translation in the LRU cache
    translationCache.set(cacheKey, translatedText);
    return translatedText;
  } catch (error) {
    console.error('Error while translating:', error);
    return text; // Return original text if translation fails
  }
}

// Save cache to file
function saveCache() {
  const cacheObject = {};
  translationCache.forEach((value, key) => {
    cacheObject[key] = value;
  });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheObject, null, 2));
}

program
  .name('transly')
  .description('CLI for translating files')
  .version('1.0.2');

  program
  .command('start')
  .description('Start Transly and display information')
  .action(() => {
    // Display the logo first
    figlet('Transly v1.0.2', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);

      // Display the welcome information after the logo
      console.log('\nWelcome to Transly CLI Tool!');
      console.log('\nYou can use the following commands to get started:');
      console.log('\n  transly translate <file_path> -l <target_language>');
      console.log('    - Translate a file to the specified target language.');
      console.log('\nOptions:');
      console.log('  -s, --source <source>: Specify the source language (default: en)');
      console.log('\nExamples:');
      console.log('  transly translate test.json -l fa');
      console.log('  transly translate test.csv -l es -s en');
      console.log('\nWebsite: https://sirvav.com');
      console.log('Instagram: https://instagram.com/sirvav_com');
    });
  });


program
  .command('translate')
  .description('Translate a file to a specified language (supports JSON, CSV, TXT)')
  .argument('<file>', 'Path to the file to translate')
  .option('-l, --lang <language>', 'Target language for translation')
  .option('-s, --source <source>', 'Source language for translation', 'en')
  .action(async (file, options) => {
    try {
      const ext = file.split('.').pop().toLowerCase();
      let data = {};

      if (ext === 'json') {
        // Read JSON file
        const rawData = fs.readFileSync(file);
        data = JSON.parse(rawData);
      } else if (ext === 'csv') {
        // Read CSV file
        data = {};
        const lines = [];
        await new Promise((resolve, reject) => {
          fs.createReadStream(file)
            .pipe(csv())
            .on('data', (row) => {
              lines.push(row);
            })
            .on('end', () => {
              lines.forEach((line, index) => {
                data[`line_${index}`] = Object.values(line).join(' ');
              });
              resolve();
            })
            .on('error', (error) => {
              reject(error);
            });
        });
      } else if (ext === 'txt') {
        // Read TXT file
        data = {};
        const rl = readline.createInterface({
          input: fs.createReadStream(file),
          output: process.stdout,
          terminal: false,
        });

        let index = 0;
        for await (const line of rl) {
          data[`line_${index}`] = line;
          index++;
        }
      } else {
        console.error('Unsupported file format. Only JSON, CSV, and TXT are supported.');
        return;
      }

      // Set up the progress bar
      const keys = Object.keys(data);
      const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
      progressBar.start(keys.length, 0);

      // Create a new object to hold translated data
      const translatedData = {};
      let completedTranslations = 0;

      // Iterate over each key to translate
      for (const key of keys) {
        const translatedValue = await translateText(data[key], options.source, options.lang);
        translatedData[key] = translatedValue;
        completedTranslations++;
        progressBar.update(completedTranslations);
      }

      // Stop the progress bar
      progressBar.stop();

      // Write translated data to a new file
      const outputPath = `translated_${options.lang}_${file}`;
      fs.writeFileSync(outputPath, JSON.stringify(translatedData, null, 2));
      console.log(`Translation completed and saved to ${outputPath}`);

      // Save the cache after translation
      saveCache();
    } catch (error) {
      console.error('Error while reading or translating the file:', error);
    }
  });

program.parse();
