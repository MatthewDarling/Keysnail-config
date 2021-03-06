// ========================== KeySnail Init File =========================== //
// ======= Lightweight Emacs config to avoid conflicts with OS X keys ====== //
// You can preserve your code in this area when generating the init file using GUI.
// Put all your code except special key, set*key, hook, blacklist.
// ========================================================================= //
//{{%PRESERVE%
// Put your codes here
//}}%PRESERVE%
// ========================================================================= //

// ========================= Special key settings ========================== //

key.quitKey              = "C-g";
key.helpKey              = "<f1>";
key.escapeKey            = "C-q";
key.macroStartKey        = "undefined";
key.macroEndKey          = "undefined";
key.suspendKey           = "<f2>";
key.universalArgumentKey = "C-u";
key.negativeArgument1Key = "C--";
key.negativeArgument2Key = "C-M--";
key.negativeArgument3Key = "M--";

// ================================= Hooks ================================= //

hook.addToHook('KeyBoardQuit', function (aEvent) {
    if (key.currentKeySequence.length) {
        return;
    }
    command.closeFindBar();
    var marked = command.marked(aEvent);
    if (util.isCaretEnabled()) {
        if (marked) {
            command.resetMark(aEvent);
        } else {
            if ("blur" in aEvent.target) {
                aEvent.target.blur();
            }
            gBrowser.focus();
            _content.focus();
        }
    } else {
        goDoCommand("cmd_selectNone");
    }
    if (KeySnail.windowType === "navigator:browser" && !marked) {
        key.generateKey(aEvent.originalTarget, KeyEvent.DOM_VK_ESCAPE, true);
    }
});

// ============================= Key bindings ============================== //

key.setGlobalKey('C-M-r', function (ev) {
    userscript.reload();
}, 'Reload the initialization file', true);

key.setGlobalKey('M-x', function (ev, arg) {
    ext.select(arg, ev);
}, 'List exts and execute selected one', true);

key.setGlobalKey(["<f1>", "b"], function (ev) {
    key.listKeyBindings();
}, 'List all keybindings', false);

key.setGlobalKey('C-m', function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RETURN, true);
}, 'Generate the return key code', false);

key.setGlobalKey(["<f1>", "F"], function (ev) {
    openHelpLink("firefox-help");
}, 'Display Firefox help', false);

key.setGlobalKey(["C-x", "l"], function (ev) {
    command.focusToById("urlbar");
}, 'Focus to the location bar', true);

key.setGlobalKey(["C-x", "g"], function (ev) {
    command.focusToById("searchbar");
}, 'Focus to the search bar', true);

key.setGlobalKey(["C-x", "t"], function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setGlobalKey(["C-x", "s"], function (ev) {
    command.focusElement(command.elementsRetrieverButton, 0);
}, 'Focus to the first button', true);

key.setGlobalKey('C-s', function (ev) {
    command.iSearchForwardKs(ev);
}, 'Emacs like incremental search forward', true);

key.setGlobalKey('C-r', function (ev) {
    command.iSearchBackwardKs(ev);
}, 'Emacs like incremental search backward', true);

key.setGlobalKey(["C-x", "k"], function (ev) {
    BrowserCloseTabOrWindow();
}, 'Close tab / window', false);

key.setGlobalKey(["C-x", "K"], function (ev) {
    closeWindow(true);
}, 'Close the window', false);

key.setGlobalKey(["C-c", "u"], function (ev) {
    undoCloseTab();
}, 'Undo closed tab', false);

key.setGlobalKey(["C-x", "n"], function (ev) {
    OpenBrowserWindow();
}, 'Open new window', false);

key.setGlobalKey('C-M-l', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab', false);

key.setGlobalKey('C-M-h', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab', false);

key.setGlobalKey(["C-x", "C-c"], function (ev) {
    goQuitApplication();
}, 'Exit Firefox', true);

key.setGlobalKey(["C-x", "o"], function (ev, arg) {
    command.focusOtherFrame(arg);
}, 'Select next frame', false);

key.setGlobalKey(["C-x", "1"], function (ev) {
    window.loadURI(ev.target.ownerDocument.location.href);
}, 'Show current frame only', true);

key.setGlobalKey(["C-x", "C-f"], function (ev) {
    BrowserOpenFileWindow();
}, 'Open the local file', true);

key.setGlobalKey(["C-x", "C-s"], function (ev) {
    saveDocument(window.content.document);
}, 'Save current page to the file', true);

key.setGlobalKey(["C-c", "C-c", "C-v"], function (ev) {
    toJavaScriptConsole();
}, 'Display JavaScript console', true);

key.setGlobalKey(["C-c", "C-c", "C-c"], function (ev) {
    command.clearConsole();
}, 'Clear Javascript console', true);

key.setEditKey(["C-x", "h"], function (ev) {
    command.selectAll(ev);
}, 'Select whole text', true);

key.setEditKey([["C-`"], ["C-@"]], function (ev) {
    command.setMark(ev);
}, 'Set the mark', true);

key.setEditKey('C-o', function (ev) {
    command.openLine(ev);
}, 'Open line', false);

key.setEditKey([["C-x", "u"], ["C-_"]], function (ev) {
    display.echoStatusBar("Undo!", 2000);
    goDoCommand("cmd_undo");
}, 'Undo', false);

key.setEditKey('C-\\', function (ev) {
    display.echoStatusBar("Redo!", 2000);
    goDoCommand("cmd_redo");
}, 'Redo', false);

key.setEditKey('C-a', function (ev) {
    command.beginLine(ev);
}, 'Beginning of the line', false);

key.setEditKey('C-e', function (ev) {
    command.endLine(ev);
}, 'End of the line', false);

key.setEditKey('C-f', function (ev) {
    command.nextChar(ev);
}, 'Forward char', false);

key.setEditKey('C-b', function (ev) {
    command.previousChar(ev);
}, 'Backward char', false);

key.setEditKey('C-n', function (ev) {
    command.nextLine(ev);
}, 'Next line', false);

key.setEditKey('C-p', function (ev) {
    command.previousLine(ev);
}, 'Previous line', false);

key.setEditKey('C-v', function (ev) {
    command.pageDown(ev);
}, 'Page down', false);

key.setEditKey('M-<', function (ev) {
    command.moveTop(ev);
}, 'Beginning of the text area', false);

key.setEditKey('M->', function (ev) {
    command.moveBottom(ev);
}, 'End of the text area', false);

key.setEditKey('C-d', function (ev) {
    goDoCommand("cmd_deleteCharForward");
}, 'Delete forward char', false);

key.setEditKey('C-h', function (ev) {
    goDoCommand("cmd_deleteCharBackward");
}, 'Delete backward char', false);

key.setEditKey([["C-<backspace>"], ["M-<delete>"]], function (ev) {
    command.deleteBackwardWord(ev);
}, 'Delete backward word', false);

key.setEditKey('C-k', function (ev) {
    command.killLine(ev);
}, 'Kill the rest of the line', false);

key.setEditKey('C-y', command.yank, 'Paste (Yank)', false);

key.setEditKey('M-y', command.yankPop, 'Paste pop (Yank pop)', true);

key.setEditKey('C-M-y', function (ev) {
    if (!command.kill.ring.length) {
        return;
    }
    let (ct = command.getClipboardText()) (!command.kill.ring.length || ct != command.kill.ring[0]) &&
        command.pushKillRing(ct);
    prompt.selector({message: "Paste:", collection: command.kill.ring, callback: function (i) {if (i >= 0) {key.insertText(command.kill.ring[i]);}}});
}, 'Show kill-ring and select text to paste', true);

key.setEditKey('C-w', function (ev) {
    goDoCommand("cmd_copy");
    goDoCommand("cmd_delete");
    command.resetMark(ev);
}, 'Cut current region', true);

key.setEditKey(["C-x", "r", "d"], function (ev, arg) {
    command.replaceRectangle(ev.originalTarget, "", false, !arg);
}, 'Delete text in the region-rectangle', true);

key.setEditKey(["C-x", "r", "t"], function (ev) {
    prompt.read("String rectangle: ", function (aStr, aInput) {command.replaceRectangle(aInput, aStr);}, ev.originalTarget);
}, 'Replace text in the region-rectangle with user inputted string', true);

key.setEditKey(["C-x", "r", "o"], function (ev) {
    command.openRectangle(ev.originalTarget);
}, 'Blank out the region-rectangle, shifting text right', true);

key.setEditKey(["C-x", "r", "k"], function (ev, arg) {
    command.kill.buffer = command.killRectangle(ev.originalTarget, !arg);
}, 'Delete the region-rectangle and save it as the last killed one', true);

key.setEditKey(["C-x", "r", "y"], function (ev) {
    command.yankRectangle(ev.originalTarget, command.kill.buffer);
}, 'Yank the last killed rectangle with upper left corner at point', true);

key.setViewKey([["C-n"], ["j"]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_DOWN, true);
}, 'Scroll line down', false);

key.setViewKey([["C-p"], ["k"]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_UP, true);
}, 'Scroll line up', false);

key.setViewKey([["C-f"], ["."]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_RIGHT, true);
}, 'Scroll right', false);

key.setViewKey([["C-b"], [","]], function (ev) {
    key.generateKey(ev.originalTarget, KeyEvent.DOM_VK_LEFT, true);
}, 'Scroll left', false);

key.setViewKey([["M-v"], ["b"]], function (ev) {
    goDoCommand("cmd_scrollPageUp");
}, 'Scroll page up', false);

key.setViewKey('C-v', function (ev) {
    goDoCommand("cmd_scrollPageDown");
}, 'Scroll page down', false);

key.setViewKey([["M-<"], ["g"]], function (ev) {
    goDoCommand("cmd_scrollTop");
}, 'Scroll to the top of the page', true);

key.setViewKey([["M->"], ["G"]], function (ev) {
    goDoCommand("cmd_scrollBottom");
}, 'Scroll to the bottom of the page', true);

key.setViewKey('l', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(1, true);
}, 'Select next tab', false);

key.setViewKey('h', function (ev) {
    getBrowser().mTabContainer.advanceSelectedTab(-1, true);
}, 'Select previous tab', false);

key.setViewKey(':', function (ev, arg) {
    shell.input(null, arg);
}, 'List and execute commands', true);

key.setViewKey('R', function (ev) {
    BrowserReload();
}, 'Reload the page', true);

key.setViewKey('B', function (ev) {
    BrowserBack();
}, 'Back', false);

key.setViewKey('F', function (ev) {
    BrowserForward();
}, 'Forward', false);

key.setViewKey(["C-x", "h"], function (ev) {
    goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setViewKey('f', function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setViewKey('M-p', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button', false);

key.setViewKey('M-n', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button', false);

key.setCaretKey([["C-a"], ["^"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectBeginLine") : goDoCommand("cmd_beginLine");
}, 'Move caret to the beginning of the line', false);

key.setCaretKey([["C-e"], ["$"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line', false);

key.setCaretKey([["C-n"], ["j"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectLineNext") : goDoCommand("cmd_scrollLineDown");
}, 'Move caret to the next line', false);

key.setCaretKey([["C-p"], ["k"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectLinePrevious") : goDoCommand("cmd_scrollLineUp");
}, 'Move caret to the previous line', false);

key.setCaretKey([["C-f"], ["l"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectCharNext") : goDoCommand("cmd_scrollRight");
}, 'Move caret to the right', false);

key.setCaretKey([["C-b"], ["h"], ["C-h"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectCharPrevious") : goDoCommand("cmd_scrollLeft");
}, 'Move caret to the left', false);

key.setCaretKey([["M-f"], ["w"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectWordNext") : goDoCommand("cmd_wordNext");
}, 'Move caret to the right by word', false);

key.setCaretKey([["M-b"], ["W"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectWordPrevious") : goDoCommand("cmd_wordPrevious");
}, 'Move caret to the left by word', false);

key.setCaretKey([["C-v"], ["SPC"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectPageNext") : goDoCommand("cmd_movePageDown");
}, 'Move caret down by page', false);

key.setCaretKey([["M-v"], ["b"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectPagePrevious") : goDoCommand("cmd_movePageUp");
}, 'Move caret up by page', false);

key.setCaretKey([["M-<"], ["g"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectTop") : goDoCommand("cmd_scrollTop");
}, 'Move caret to the top of the page', false);

key.setCaretKey([["M->"], ["G"]], function (ev) {
    ev.target.ksMarked ? goDoCommand("cmd_selectEndLine") : goDoCommand("cmd_endLine");
}, 'Move caret to the end of the line', false);

key.setCaretKey('J', function (ev) {
    util.getSelectionController().scrollLine(true);
}, 'Scroll line down', false);

key.setCaretKey('K', function (ev) {
    util.getSelectionController().scrollLine(false);
}, 'Scroll line up', false);

key.setCaretKey(',', function (ev) {
    util.getSelectionController().scrollHorizontal(true);
    goDoCommand("cmd_scrollLeft");
}, 'Scroll left', false);

key.setCaretKey('.', function (ev) {
    goDoCommand("cmd_scrollRight");
    util.getSelectionController().scrollHorizontal(false);
}, 'Scroll right', false);

key.setCaretKey('z', function (ev) {
    command.recenter(ev);
}, 'Scroll to the cursor position', false);

key.setCaretKey([["C-`"], ["C-@"]], function (ev) {
    command.setMark(ev);
}, 'Set the mark', true);

key.setCaretKey(':', function (ev, arg) {
    shell.input(null, arg);
}, 'List and execute commands', true);

key.setCaretKey('R', function (ev) {
    BrowserReload();
}, 'Reload the page', true);

key.setCaretKey('B', function (ev) {
    BrowserBack();
}, 'Back', false);

key.setCaretKey('F', function (ev) {
    BrowserForward();
}, 'Forward', false);

key.setCaretKey(["C-x", "h"], function (ev) {
    goDoCommand("cmd_selectAll");
}, 'Select all', true);

key.setCaretKey('f', function (ev) {
    command.focusElement(command.elementsRetrieverTextarea, 0);
}, 'Focus to the first textarea', true);

key.setCaretKey('M-p', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, true, true);
}, 'Focus to the next button', false);

key.setCaretKey('M-n', function (ev) {
    command.walkInputElement(command.elementsRetrieverButton, false, true);
}, 'Focus to the previous button', false);

