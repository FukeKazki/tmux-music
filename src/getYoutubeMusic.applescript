tell application "Sidekick"
	set allTabs to tabs of windows
	repeat with currentTab in allTabs
		repeat with t in currentTab
			set AHIAHI to URL of t
			if AHIAHI starts with "https://music.youtube.com/" then
				set titleText to execute t javascript "document.querySelector('ytmusic-player-bar .title').textContent;"
				set subText to execute t javascript "document.querySelector('.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string').getAttribute('title');"
				# つなげる
				return titleText & " " & subText
			end if
		end repeat
	end repeat
end tell
