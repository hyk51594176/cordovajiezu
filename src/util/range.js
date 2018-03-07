let currentRange, _parentElem, supportRange = typeof document.createRange === 'function';
export const getCurrentRange = function (txt) {
    let selection, range;
    if (supportRange) {
        selection = document.getSelection();
        if (selection.getRangeAt && selection.rangeCount) {
            range = document.getSelection().getRangeAt(0);
            _parentElem = range.commonAncestorContainer;
        }
    } else {
        range = document.selection.createRange();
        _parentElem = range.parentElement();
    }
    if (_parentElem && (txt.compareDocumentPosition(_parentElem) == 20|| txt === _parentElem)) {
        return range;
    }
    return range;
}
export const saveSelection = function (dom) {
    currentRange = getCurrentRange(dom);
}
export const restoreSelection = function () {
    if (!currentRange) {
        return;
    }
    var selection,
        range;
    if (supportRange) {
        selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(currentRange);
    } else {
        range = document.selection.createRange();
        range.setEndPoint('EndToEnd', currentRange);
        if (currentRange.text.length === 0) {
            range.collapse(false);
        } else {
            range.setEndPoint('StartToStart', currentRange);
        }
        range.select();
    }
}
export const insertImage = function (dom, html) {
    restoreSelection();
    if (document.selection)
        currentRange.pasteHTML(html);
    else {
        dom.focus();
        document.execCommand("insertImage", false, html);
        currentRange.collapse();
    }
    saveSelection(dom);
}