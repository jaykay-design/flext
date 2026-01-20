"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = setup;
function resize(element) {
    const scrollY = window.scrollY, styles = getComputedStyle(element), paddingWidth = parseInt(styles.getPropertyValue('padding-top'), 10) + parseInt(styles.getPropertyValue('padding-bottom'), 10), borderWidths = parseInt(styles.getPropertyValue('border-top-width'), 10) + parseInt(styles.getPropertyValue('border-bottom-width'), 10), copy = document.getElementById(element.dataset.copy);
    let minHeight = borderWidths;
    if (element.closest('.form-floating'))
        minHeight += 24 + paddingWidth;
    copy.value = element.value;
    let newHeight = copy.scrollHeight;
    if (newHeight === 0)
        newHeight = minHeight;
    newHeight += paddingWidth + borderWidths;
    element.style.height = newHeight + 'px';
    window.scrollTo(window.scrollX, scrollY);
}
function setup(e) {
    if (CSS.supports('field-sizing', 'content'))
        return;
    let items = [];
    if (e.detail.textarea)
        items.push(e.detail.textarea);
    else if (e.detail.container)
        items = Array.from(e.detail.container.querySelectorAll('textarea.growme'));
    else
        return;
    items.forEach(el => {
        const copy = document.createElement('textarea');
        copy.style.height = '1px';
        copy.style.width = '100%';
        copy.style.visibility = 'hidden';
        copy.style.border = '0';
        copy.style.padding = '0';
        copy.id = 'flext-' + Math.trunc(Math.random() * 100000000);
        copy.value = el.value;
        el.dataset.copy = copy.id;
        el.insertAdjacentElement('afterend', copy);
        resize(el);
        if (el.hasAttribute('flext'))
            return;
        el.setAttribute('flext', 'done');
        el.addEventListener('keyup', () => resize(el));
        el.addEventListener('paste', () => resize(el));
    });
}
