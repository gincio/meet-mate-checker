const CLICKABLE_AREA_WIDTH = 30;
const CLICKABLE_AREA_HEIGHT = 30;
const USER_ELEMENTS_QUERY = '[data-requested-participant-id]';

window.addEventListener('click', (e) => {
    const users = document.querySelectorAll(USER_ELEMENTS_QUERY);
    const rects = [];
    users.forEach(el => {
        const rect = el.getBoundingClientRect();
        rects.push({
            x: rect.left,
            y: rect.top,
            width: CLICKABLE_AREA_WIDTH,
            height: CLICKABLE_AREA_HEIGHT
        })
    })
    const clickedPosition = { x: e.clientX, y: e.clientY };
    const foundInRects = rects.map(rect => isInRectangle(
        clickedPosition,
        rect
    ));
    foundInRects.forEach((found, index) => {
        if (!found) return;
        e.preventDefault();
        const el = users[index];
        const alreadyChecked = el.dataset.checked == 'true';
        alreadyChecked ? setUnchecked(el) : setChecked(el);
    })
}, true)

const isInRectangle = (point, rect) => {
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

const setChecked = (el) => {
    el.dataset.checked = true;
    el.classList.add('checked');
}

const setUnchecked = (el) => {
    el.dataset.checked = false;
    el.classList.remove('checked');
}