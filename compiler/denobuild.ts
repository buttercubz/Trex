
const { args } = Deno;

Deno.run({
  cmd: ["esbuild.exe", args[0], args[1]]
}).status()