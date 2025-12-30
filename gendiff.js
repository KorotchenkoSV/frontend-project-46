#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .argument('<filepath1>', 'path to the first configuration file')
  .argument('<filepath2>', 'path to the second configuration file')
  .option('-f, --format [type]', 'output format');

program.parse();

// Для демонстрации: выводим полученные аргументы и опции
const options = program.opts();
const [filepath1, filepath2] = program.args;

console.log('Arguments:');
console.log(`  filepath1: ${filepath1}`);
console.log(`  filepath2: ${filepath2}`);

if (options.format) {
  console.log(`Format: ${options.format}`);
}
