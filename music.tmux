#!/usr/bin/env zsh

# 相対パスを計算する
SCRIPT_PATH="$(pwd -P)/src/main.ts"

INTERVAL_TIME=$(tmux show-options -gv @tmux-music-interval-time)
MAX_LENGTH=$(tmux show-options -gv @tmux-music-max-length)

# $SCRIPT_PATH --interval $INTERVAL_TIME --max-length $MAX_LENGTH
# tmuxが終了したらプロセスも終了するように run-shellを使う
# バックグラウンドで実行
tmux run-shell -b "$SCRIPT_PATH --interval $INTERVAL_TIME --max-length $MAX_LENGTH"

