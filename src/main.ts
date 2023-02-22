#!/usr/bin/env deno run --allow-run

import { rollTrimStr, sleep, useCommand } from "./util.ts";

const INTERVAL = 1000;
const MAX_LENGTH = 15;

if (import.meta.main) {
  let index = 0;

  while (true) {
    const { stdout } = await useCommand([
      "osascript",
      new URL("./getYoutubeMusic.applescript", import.meta.url).pathname,
    ]);

    const trimed = rollTrimStr(
      stdout.replace(/\r?\n?\s/g, ""),
      index,
      MAX_LENGTH,
    );

    // ステータスラインの表示を更新する
    useCommand(["tmux", "set", "-g", "status-right", trimed]);

    if (index >= stdout.length) {
      index = 0;
    } else {
      index++;
    }

    await sleep(INTERVAL);
  }
}
