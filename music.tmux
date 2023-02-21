#!/usr/bin/env bash

SCRIPT_PATH="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)/src/server.ts"

($SCRIPT_PATH) &

# TODO: tmuxが終了したらプロセスも終了するように
(watch -n 0.5 curl localhost:10020/tmux) &
