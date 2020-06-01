const support = (function () {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    } catch(err) {
        return false;
    }
    return true;
})();

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
const stringToHTML = function (str) {

    // If DOMParser is supported, use it
    if (support) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    }

    // Otherwise, fallback to old-school method
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;

};
export default stringToHTML;