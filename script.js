'use strict';

const DomElement = function(selector, height, width, bg, fontSize, text) {
    this.text = text;
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};    


DomElement.prototype.createElem = function() {
    let elemBlock;

    if (this.selector[0] === '.') {
        elemBlock = document.createElement('div');
        elemBlock.classList.add(this.selector);
        elemBlock.innerHTML = '<p>' + this.text + '</p>';
    } else if (this.selector[0] === '#') {
        elemBlock = document.createElement('div');
        elemBlock.setAttribute('id', this.selector);
        elemBlock.innerHTML = '<p>' + this.text + '</p>';
    }
    
    elemBlock.style.cssText = 'height: ' + this.height + 'px' + 
        '; width: ' + this.width + 'px' + 
        '; background: ' + this.bg + 
        '; font-size: ' + this.fontSize + 'px;';

    document.body.prepend(elemBlock);
};

let firstElem = new DomElement('.hi', 50, 400, 'red', 25, 'Привет всем!');

firstElem.createElem();

console.log(firstElem);