#!/usr/bin/env bash

SCRIPT_PATH="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)/src/server.ts"


# tmuxが終了したらプロセスも終了するように run-shellを使う
# バックグラウンドで実行
tmux run-shell -b $SCRIPT_PATH

# バックグラウンドで10秒後に実行
tmux run-shell -d 10 -b 'watch -n 0.5 curl localhost:10020/tmux'
