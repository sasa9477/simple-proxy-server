/// @ts-check
const fs = require("fs");
const httpProxy = require("http-proxy");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const args = yargs(hideBin(process.argv))
  .usage("$0 <cmd> [args]")
  .options({
    target: {
      type: "string",
      describe: "target origin url",
      demandOption: true,
    },
    port: {
      type: "number",
      describe: "port for listening",
      default: 8888,
    },
  })
  .alias({
    h: "help",
    v: "version",
    t: "target",
    p: "port",
  })
  .help()
  .parseSync();

const key = fs.readFileSync("localhost-key.pem");
const cert = fs.readFileSync("localhost.pem");

httpProxy
  .createProxyServer({
    target: args.target,
    ssl: {
      key,
      cert,
    },
    // see https://github.com/http-party/node-http-proxy/issues/1083
    secure: false,
    ws: true,
  })
  .listen(args.port);

console.log(`target url: ${args.target}`);
console.log(`listen on port ${args.port}...`);
