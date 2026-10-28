-- Comments on an exported PRD in Microsoft Word, as a reviewer would, for the
-- end-to-end test of /prd-comments (scripts/prd-comments.e2e.mjs).
--
--   osascript word-comment.applescript <copy of the export.docx> <find text> <comment> [<find text> <comment> ...]
--
-- Each pair finds the first match of its text and comments on exactly that
-- text. Word saves the file in place, then closes only that document.

on run argv
	set target to item 1 of argv
	tell application "Microsoft Word"
		set wanted to do shell script "basename " & quoted form of target
		open file name target
		-- open can return before the new document is active. Wait for it, and
		-- never work on another document: it is someone else's.
		repeat 30 times
			if (count of documents) > 0 and (name of active document) is wanted then exit repeat
			delay 0.5
		end repeat
		set doc to active document
		if (name of doc) is not wanted then error "Word did not open " & target & "; the active document is " & (name of doc)
		set n to 2
		repeat while n < (count of argv)
			set needle to item n of argv
			set msg to item (n + 1) of argv
			-- A find on the selection moves the selection to the match. A find on
			-- a range object does not, in Word 16.
			select (create range doc start 0 end 0)
			execute find (find object of selection) find text needle match case true wrap find find stop
			set r to text object of selection
			if (content of r) is not needle then error "Word did not find: " & needle
			-- The author is the Word user's name, as for a real reviewer. A reference
			-- that make returns can point at another comment after the next insert,
			-- because Word numbers comments by position, so nothing is set on it.
			make new Word comment at doc with properties {scope:r, comment text:msg}
			set n to n + 2
		end repeat
		set made to (count of Word comments of doc)
		-- Word's sandbox refuses save as to a new file here, so the caller
		-- passes a copy of the export and Word saves it in place.
		save doc
		close doc saving no
		return made as text
	end tell
end run
