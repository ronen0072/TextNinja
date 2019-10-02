var menu  = $('#menu');
const toggleMenu = command => {
    menu.show();
    menu.css('block', `none`);
};
const setPosition = ({ top, left }) => {
    console.log(`${top}px`);
    menu.css('left', `${left}px`);
    menu.css('top', `${top}px`);
    toggleMenu('show');
};

