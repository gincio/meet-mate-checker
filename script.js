window.addEventListener('click', (e) => {
    const users = document.querySelectorAll('[data-requested-participant-id]:not([data-requested-participant-id=""])');
    console.log(users);
    const rects = [];
    users.forEach(el => rects.push({ x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight }))
    const clickedPosition = { x: e.clientX, y: e.clientY };
    const foundInRects = rects.map(rect => isInRectangle(clickedPosition, rect));
    console.log(foundInRects);
    foundInRects.forEach((found, index) => {
        if (!found) return;
        const el = users[index];
        const alreadyChecked = el.dataset.checked == 'true';
        alreadyChecked ? setUnchecked(el) : setChecked(el);
    })
}, true)

const isInRectangle = (point, rect) => {
    return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
}

const setChecked = (el) => {
    el.dataset.checked = true;
    el.classList.add('checked');
}

const setUnchecked = (el) => {
    el.dataset.checked = false;
    el.classList.remove('checked');
}