# Welcome to Trex!

## Trex 🐱‍🐉

[![GitHub issues](https://img.shields.io/github/issues/crewdevio/Trex)](https://github.com/crewdevio/Trex/issues) [![GitHub forks](https://img.shields.io/github/forks/crewdevio/Trex)](https://github.com/crewdevioTrex/network) [![GitHub stars](https://img.shields.io/github/stars/crewdevio/Trex)](https://github.com/crewdevio/Trex/stargazers) [![GitHub license](https://img.shields.io/github/license/crewdevio/Trex)](https://github.com/crewdevio/Trex/blob/master/LICENSE) ![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/crewdevio/Trex)

![Trex](https://i.ibb.co/fF4BRkZ/trexquad.jpg)

Package management for deno

### What is Trex?

is a "Package management" for deno to implement an import_map.json for your imports is an easiest way to make imports in deno.

```javascript
// import_map.json

{
    "imports":  {
	"http/":  "https://deno.land/std/http/"
    }
}
```

For more information about the import maps in deno [import maps](https://deno.land/manual/linking_to_external_code/import_maps)

## Guide:

### installation:

Download the repository and open the terminal in the folder of the repository and write:

```sh
$  deno install --allow-read --allow-write --allow-net --allow-run --unstable Trex.ts
```

> **note**: You should have the last version 1.0.0 >= of deno for no errors.

or in your terminal you can write

```sh
$  deno install --allow-read --allow-write --allow-net --allow-run --unstable https://deno.land/x/trex/Trex.ts
```

### update Trex using

```sh
$  deno install -f --allow-read --allow-write --allow-net --allow-run --unstable https://deno.land/x/trex/Trex.ts
```

or use:

```sh
$ Trex update
```

for versions 0.2.0 or higher.

check for the installation of the Trex tool writing in the terminal:

```sh
$  Trex --version
```

and the console should presente the Trex version.

for any help of the commands of Trex write:

```sh
$  Trex --help
```

and the console should present:

```
help:
   * flags:
       --map: for install a library
       --version: logs version
       --custom: for install custom package
       --deps: log modules versions

   * install module using:
        Trex install --map fs http

   * install custom module usig:
        Trex --custom module_name=module_url

   * uninstall module using:
        Trex delete module_name

   * install Tool using:
        Trex getTool tool_name

   * check module stated using:
        Trex --deps
```

for a better implementation of this tool you can use the tool Commands of deno [Commands](https://deno.land/x/commands)

# How to use

in your command line write:

```sh
$ Trex install --map fs http fmt
```

> **note**: you can use **Trex i --map fs http fmt**

an import_map.json file will be created with the following.

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/"
  }
}
```

## Usage example.

create a test file

```javascript
// server.ts
import { serve } from "http/server.ts";
import { green } from "fmt/colors.ts";

const server = serve({ port: 8000 });
console.log(green("http://localhost:8000/"));

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

run in terminal

```sh
$ deno run --allow-net --importmap=import_map.json --unstable server.ts
```

> **note**: it is important to use **--importmap=import_map.json --unstable**

### using third party modules

example using [oak](https://deno.land/x/oak)

```sh
$ Trex i --map oak
```

in import_map.json

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts"
  }
}
```

> **note**: third party modules are added using **mod.ts**

in server.ts

```javascript
// server.ts
import { Application } from "oak";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

run in terminal

```sh
$ deno run --allow-net --importmap=import_map.json --unstable server.ts
```

### add custom module

in your command line write:

```sh
$ Trex --custom React=https://dev.jspm.io/react/index.js
```

in import_map.json

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts",
    "React": "https://dev.jspm.io/react/index.js"
  }
}
```

### install tools like [velociraptor](https://github.com/umbopepato/velociraptor) or [Commands](https://deno.land/x/commands)

in your command line write:

```sh
$ Trex getTool Commands
```

this will install the tool

> **note**: this feature is currently unstable
> **note 2**: If you are a linux/MacOs user you'll have to specificate the PATH manually when the tool gets installed the will appear in your terminal __export PATH="/home/username/.deno/bin:$PATH"__

### delete module

in your command line write:

```sh
$ Trex delete React
```

in import_map.json

```json
{
  "imports": {
    "fs/": "https://deno.land/std/fs/",
    "http/": "https://deno.land/std/http/",
    "fmt/": "https://deno.land/std/fmt/",
    "oak": "https://deno.land/x/oak/mod.ts"
  }
}
```

### install another version of a module

write the name of the module more **@\<Version\>**

example:

```sh
$ Trex install --map fs@0.`5`4.0
```

in import_map.json

```json
{
  "imports": {
    "fs/": "https://deno.land/std@0.54.0/fs/"
  }
}
```

> **note**: this feature is currently unstable and can be used with third party modules.

### check the versions of dependencies using

```sh
$ Trex --deps
```

you should see something like that on the console.

```json
// in import_map.json
{
  "imports": {
    "oak": "https://deno.land/x/oak@v4.0.0/mod.ts",
    "http": "https://deno.land/std@0.51.0/http/"
  }
}
```

| name  | module |                   url                   | version  |  latest  | upToDate |
| :---: | :----: | :-------------------------------------: | :------: | :------: | :------: |
|  oak  |  oak   | "https://deno.land/x/oak@v4.0.0/mod.ts" | "v4.0.0" | "v5.0.0" |  false   |
| http/ |  std   |  "https://deno.land/std@0.54.0/http/"   | "0.54.0" | "0.54.0" |   true   |

thanks to [Fzwael](https://github.com/Fzwael) this functionality is based on your tool [deno-check-updates](https://github.com/Fzwael/deno-check-updates)

### flags

view Trex version

```sh
$ Trex --version
```

### view help

```sh
$ Trex --help
```

## Todo

- [x] install std modules and third party modules in deno.land/x.

- [x] delete modules from import_map.json.

- [x] support for custom module outside of deno third party modules.

- [x] sort modules names in import_map.json.

- [x] support to install tools like [Commands](https://deno.land/x/commands) (!unstable).

  - if you want add your tool in database edit this file [database.json](database.json)

- [x] update using:

  - `$ Trex update`

- [x] support to choose install other versions of modules. (!unstable):

  - `$ Trex install --map fs@0.50.0`

- [ ] safe installation for tools like [Commands](https://deno.land/x/commands), [velociraptor](https://deno.land/x/velociraptor) or [dpx](https://deno.land/x/dpx)

  - do not have access to protected resources.

- [x] check the versions of the libraries.
  - `$ Trex --deps`
  
- [ ] View change log when you update Trex

- [ ] System to cache package when install it
