/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { cyan, red, green, yellow } from "https://deno.land/std/fmt/colors.ts";
import exec from "../tools/install_tools.ts";
import { VERSION } from "./info.ts";

export function Version(version: string) {
  console.log(version, cyan("༼ つ ◕_◕ ༽つ"));
}

export function LogHelp(helpsInfo: string[]) {
  for (const info of helpsInfo) {
    console.log(info);
  }
}

export async function updateTrex(): Promise<void> {
  // * get the version of the repo in github
  const response = await fetch(
    "https://raw.githubusercontent.com/crewdevio/Trex/master/utils/version.json"
  ); // * get the plain text
  const repoVersion = (await response.json()) as { VERSION: string };

  if (repoVersion.VERSION !== VERSION.VERSION) {
    setTimeout(async () => {
      await exec({
        config: {
          permissions: ["-A", "--unstable"],
          url: "https://deno.land/x/trex/Trex.ts",
        },
      });
      console.log(repoVersion.VERSION);
    }, 1000);
  } else {
    console.log(cyan("Trex is already up to date"));
  }
}

export function offLine() {
  throw new Error(
    red(
      "something went wrong when making the request, maybe you're offline, check your connection.")).message;
}

export function Somebybroken(message: string = "some process is broken.") {
  throw new Error(red(message)).message;
}

export function ErrorInstalling() {
  const logError = `${red("something went wrong\n")}${green(
    "maybe this package is missing a mod.ts file, use custom install.\n"
  )}${yellow("Trex --custom module=moduleUrl\n")}`;

  throw new Error(logError).message;
}
