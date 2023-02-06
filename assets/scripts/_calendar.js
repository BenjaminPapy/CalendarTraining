const months = ['January', 'Ferbruary', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];
console.log(months);
// DOM Elements
const dateEl = document.getElementById('date');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const calendarEl = document.getElementById('calendar');
const eventsEl = document.getElementById('events');
const popupEl = document.getElementById('popup');

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const addBtn = document.getElementById('add');

const titleInput = document.getElementById('title');
const timeInput = document.getElementById('time');
  
let date = new Date();
let activeDay = undefined;
let month = undefined;
let year = undefined;
let firstDay = undefined;
let lastDay = undefined;

const events = {
    '2023-January-15': [{
        'title': 'Florin is dumb',
        'time': 'All the time'
    }],
    '2022-December-1': [{
        'title': 'xmetrix is helpful',
        'time': 'today'
    }]
} 

// Initial
updateDate();
updateCalendarDOM();

// Update functions
function updateCalendarDOM() {
    dateEl.innerText = `${month} ${year}`;

    activeDay = undefined;

    createDaysGrid();
    createEvents();
}

function updateDate() {
    month = months[date.getUTCMonth()];
    year = date.getUTCFullYear();
    firstDay = new Date(year, date.getUTCMonth(), 1).getDay();
    lastDay = new Date(year, date.getUTCMonth() + 1, 0).getDate();
}

function createDaysGrid() {
    // reset grid
    calendarEl.innerHTML = '';

    // create buffer days
    for (let i = 0; i < firstDay; i++) {
        createDayEl();
    }

    for (let i = 1; i <= lastDay; i++) {
        createDayEl(i);
    }

}

function createDayEl(date = '') {
    const dayEl = document.createElement('div');

    if(date) {
        const thisDay = `${year}-${month}-${date}`;
        // if it has event in it
        const hasEvents = events[thisDay];

        dayEl.className = `days-item ${hasEvents ? 'eventOn' : ''} ${activeDay ? 'eventOn' : ''}`;

        dayEl.addEventListener('click', () => {
            activeDay = `${year}-${month}-${date}`;
            
            // clear previous 'active'
            document.querySelector('.days-item.active')?.classList.remove('active');

            dayEl.classList.add("active");

            createEvents();
        });
    }
    dayEl.innerText = date;

    calendar.appendChild(dayEl);
}

function createEvents() {
    // reset the DOM
    eventsEl.innerHTML= '';

    if(events[activeDay]) {
        events[activeDay].forEach(event => {
            createEventEl(event);
        });
    }
}

function createEventEl(data) {
    const eventEl = document.createElement('div');
    eventEl.classList.add('event-wrapper');

    eventEl.innerHTML = `
        <div class="meeting-logo">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="30" height="30"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M16 3l0 4"></path>
            <path d="M8 3l0 4"></path>
            <path d="M4 11l16 0"></path>
            <path d="M11 15l1 0"></path>
            <path d="M12 15l0 3"></path>
            </svg>
        </div>
        <div class="meeting-name">
            <h3>${data.title}</h3>
            <p>${data.time}</p>
        </div>
    `;

    eventsEl.appendChild(eventEl);
}

// Event Listeners
// TODO: Not perfect on switching months for some reason
leftBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);

    updateDate();
    updateCalendarDOM();
});

rightBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);

    updateDate();
    updateCalendarDOM();
});


openBtn.addEventListener('click', () => {
    popupEl.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    popupEl.classList.add('hidden');
});

addBtn.addEventListener('click', () => {
    if (!activeDay) return;

    if (title.value && time.value) {
        if (!events[activeDay]) {
            events[activeDay] = [];
        }

        events[activeDay].push({ title: title.value, time: time.value });

        title.value = '';
        time.value = '';
        popupEl.classList.add('hidden');

        createDaysGrid();
        createEvents();
    }
});