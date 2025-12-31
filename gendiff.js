#!/usr/bin/env node

import { program } from 'commander';
import { parseFile } from './src/parse.js';
import compareFiles from './src/compare.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      const data1 = parseFile(filepath1);
      const data2 = parseFile(filepath2);
      
      const diff = compareFiles(data1, data2);
      console.log(diff);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
