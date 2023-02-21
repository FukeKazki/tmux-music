#!/usr/bin/env deno run -A

import { Application, Router } from "oak";
import { useCommand } from "./util.ts";

const PORTS = 10020;
const app = new Application();
const router = new Router();

// どの文字まで表示したか
let index = 0;

router
  .get("/tmux", async () => {
    // YoutubeMusicで再生している曲情報を取得する
    const { stdout } = await useCommand([
      "osascript",
      new URL("./getYoutubeMusic.applescript", import.meta.url).pathname,
    ]);

    // 良い感じにトリミングする
    const strWidth = stdout.length;
    const maxWidth = 15;
    const current = (index + 1) % stdout.length; // 先頭から何文字目から表示するか
    const mem = stdout + stdout;
    const txt = mem.substring(current, current + maxWidth);

    // ステータスラインの表示を更新する
    useCommand(["tmux", "set", "-g", "status-right", txt]);

    // インデックスを進める
    if (current === strWidth) {
      index = 0;
    } else {
      index++;
    }
  });

app.use(router.routes());
await app.listen({ port: PORTS });
