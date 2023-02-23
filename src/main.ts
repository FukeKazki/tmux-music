#!/usr/bin/env deno run --allow-run
import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { rollTrimStr, sleep, useCommand } from "./util.ts";

const DEFAULT_BROWSER = "Chrome";
const DEFAULT_INTERVAL = 500;
const DEFAULT_MAX_LENGTH = 15;

if (import.meta.main) {
  const parsed = parse(Deno.args);
  const browser = parsed?.broswer ?? DEFAULT_BROWSER;
  const parsedInterval = parseInt(parsed?.interval);
  const interval = Number.isNaN(parsedInterval)
    ? DEFAULT_INTERVAL
    : parsedInterval;
  const parsedMaxLength = parseInt(parsed?.["max-length"]);
  const maxLength = Number.isNaN(parsedMaxLength)
    ? DEFAULT_MAX_LENGTH
    : parsedMaxLength;
  let index = 0;

  while (true) {
    const { stdout } = await useCommand([
      "osascript",
      new URL("./getYoutubeMusic.applescript", import.meta.url).pathname,
    ]);

    // TODO: 空白トリムせずに先頭が空白だったら+空白分文字出すようにする
    const trimed = rollTrimStr(
      stdout.replace(/\r?\n?\s?•/g, ""),
      index,
      maxLength,
    );

    // ステータスラインの表示を更新する
    useCommand(["tmux", "set", "-g", "status-right", trimed]);

    if (index >= stdout.length) {
      index = 0;
    } else {
      index++;
    }

    await sleep(interval);
  }
}
