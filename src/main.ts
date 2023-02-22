#!/usr/bin/env deno run --allow-run
import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { rollTrimStr, sleep, useCommand } from "./util.ts";

const DEFAULT_BROWSER = "Chrome";
const DEFAULT_INTERVAL = 1000;
const DEFAULT_MAX_LENGTH = 15;

if (import.meta.main) {
  const parsed = parse(Deno.args);
  const browser = parsed?.broswer ?? DEFAULT_BROWSER;
  const interval = parsed?.interval ?? DEFAULT_INTERVAL;
  const maxLength = parsed?.["max-length"] ?? DEFAULT_MAX_LENGTH;
  console.log(parsed);
  console.log(browser + interval + maxLength);
  let index = 0;

  while (true) {
    const { stdout } = await useCommand([
      "osascript",
      new URL("./getYoutubeMusic.applescript", import.meta.url).pathname,
    ]);

    const trimed = rollTrimStr(
      stdout.replace(/\r?\n?\s/g, ""),
      index,
      maxLength,
    );

    // ステータスラインの表示を更新する
    // useCommand(["tmux", "set", "-g", "status-right", trimed]);

    if (index >= stdout.length) {
      index = 0;
    } else {
      index++;
    }

    await sleep(interval);
  }
}
