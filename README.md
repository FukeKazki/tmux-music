# tmux-music
status-rightに聞いている曲名を表示するプラグインです。

## demo
[![Image from Gyazo](https://i.gyazo.com/ead43c062927e13aa23cb1d485fc111e.gif)](https://gyazo.com/ead43c062927e13aa23cb1d485fc111e)

## setup
```tmux
set -g @plugin 'FukeKazki/tmux-music'
```

## requirements
- deno

## options
```tmux
# 画面の更新頻度
set -g @tmux-music-interval-time 500

# 表示する最大文字数
set -g @tmux-music-max-length 15
```

# not working
- denoのバージョンが古いかもしれません
