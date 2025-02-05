import { Command } from "commander";

const program = new Command();

program
  .option("--first")
  .option("-s, --separator <char>")
  .argument("<string>", "string to split");

program.parse();

const options = program.opts();
console.log(options);
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
