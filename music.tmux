#!/usr/bin/env bash

# 相対パスを計算する
SCRIPT_PATH="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)/src/main.ts"

# tmuxが終了したらプロセスも終了するように run-shellを使う
# バックグラウンドで実行
tmux run-shell -b $SCRIPT_PATH

