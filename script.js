// Data for sections - Edit these arrays/objects to update content

// Header Image: Single image path (place in 'images' folder in your repo)
const headerImage = 'images/header.jpg';

// Gallery Images: Add image paths (place images in 'images' folder in your repo)
const galleryImages = [
    'images/gallery1.jpg',
    'images/gallery2.jpg',
    'images/gallery3.jpg',
    'images/gallery4.jpg',
    'images/gallery5.jpg',
    'images/gallery6.jpg'
    // Add more as needed
];

// Upcoming Shows: Array of gig objects with date in YYYY-MM-DD format and address
// Dates in the past are hidden
const gigs = [
    {
        date: '2025-10-09',
        time: '6:00 PM',
        venue: 'Zydeco - Outdoor Patio',
        address: '112 E 5th St, Hermann, MO 65041',
        description: ''
    },
    {
        date: '2026-01-10',
        time: '5:00 PM',
        venue: '1837',
        address: '403 Market St, Hermann, MO 65041',
        description: ''
    },
    // Add more gigs here
];

// About Us: Array of 4 people
const aboutUs = [
    {
        name: 'Keri',
        bio: 'Keri is the kindest soul you may ever meet. She lives for her three children, Ronald, Donald, and Flonald, and her husband, Blart. In her free time, she loves to garden, and specializes in raising that rarity, pre-pickled okra.',
        image: 'images/keri.jpg'
    },
    {
        name: 'Keely',
        bio: 'Keely is in the running for the busiest person ever to live, and may actually be two people. She lives on a wee farm with three of every animal, in a bid to outdo Noah. She is skilled at nearly everything that she does, to the admiration of many.',
        image: 'images/keely.jpg'
    },
    {
        name: 'Emily',
        bio: 'Emily is a free spirit, at heart, and embodies every kind of creativity. She specializes in playing instruments whilst standing on her head, and has been heard to speculate about branching out into underwater performances. She is a nationally ranked precision plate-thrower, and is expected to take top honors at this years Nationals.',
        image: 'images/emily.jpg'
    },
    {
        name: 'Cecily',
        bio: 'Cecily lives her life dedicated to the avoidance of peaking too soon. She has 13 children, all girls, and intends to attempt the takeover of a small country, when the time is right. She plays every instrument, to varying levels of mediocrity.',
        image: 'images/cec.jpg'
    }
];

// Guest Artists: Up to 3 people (add fewer if needed)
const guestArtists = [
    {
        name: 'Reyna',
        bio: 'Reyna is on track to become the premier guitar wielding therapist in the state. We actually think she may secretly be the 5th Beatle. Her hobby is training squirrels to sing in choirs, and she tells us that they are really starting to nail the three part harmonies.',
        image: 'images/reyna.jpg'
    },
    // {
    //     name: 'Guest 2',
    //     bio: 'Guest artist known for evocative performances.',
    //     image: 'images/guest2.jpg'
    // }
    // Add a third if needed
];

// Our Poetry: Array of poems
const poems = [
    {
        title: 'Encounters on J',
        content: `Deer.
Can I thought was a Raccoon.
Fog
11 Million Bugs.
No pig.`
    },
    {
        title: 'Angry drummer',
        content: `WTF, who left the cash?`
    }
    // Add more poems
];

// Function to set header image
function setHeaderImage() {
    const container = document.querySelector('.header-image');
    container.style.backgroundImage = `url(${headerImage})`;
}

// Function to initialize carousel
function initCarousel() {
    const wrapper = document.querySelector('.swiper-wrapper');

    // Populate slides
    galleryImages.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gallery Image ${index + 1}`;
        slide.appendChild(img);
        wrapper.appendChild(slide);
    });

    // Initialize Swiper
    const swiper = new Swiper('.gallery-swiper', {
        loop: true,
        autoplay: false, // Explicitly disable auto-advance
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        effect: 'slide',
        speed: 500
    });
}

// Function to format date with day of the week
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-based in JS
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // e.g., "Friday, October 10, 2025"
}

// Function to populate upcoming shows
function populateGigs() {
    const list = document.getElementById('gigs-list');
    const section = document.getElementById('upcoming-shows');
    const now = new Date();
    // Normalize 'now' to start of day for comparison
    now.setHours(0, 0, 0, 0);
    
    const futureGigs = gigs.filter(gig => {
        // Parse gig.date as local date for comparison
        const [year, month, day] = gig.date.split('-').map(Number);
        const gigDate = new Date(year, month - 1, day);
        return gigDate >= now;
    });

    if (futureGigs.length === 0) {
        section.classList.add('hidden');
        return;
    }

    futureGigs.forEach(gig => {
        const li = document.createElement('li');
        const encodedAddress = encodeURIComponent(gig.address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        li.innerHTML = `
            <div class="gig-date">${formatDate(gig.date)}</div>
            <div class="gig-venue">${gig.venue}</div>
            <div class="gig-address"><a href="geo:0,0?q=${encodedAddress}" onclick="window.open('${googleMapsUrl}', '_blank'); return false;" target="_blank">${gig.address}</a></div>
            <div class="gig-time">${gig.time}</div>
            <div class="gig-description">${gig.description}</div>
        `;
        list.appendChild(li);
    });
}

// Function to populate bios
function populateBios(containerId, people) {
    const container = document.querySelector(`#${containerId} .bio-container`);
    people.forEach(person => {
        const div = document.createElement('div');
        div.classList.add('bio');
        div.innerHTML = `
            <img src="${person.image}" alt="${person.name}">
            <h3>${person.name}</h3>
            <p>${person.bio}</p>
        `;
        container.appendChild(div);
    });
}

// Function to populate poems
function populatePoems() {
    const container = document.getElementById('poems-container');
    poems.forEach(poem => {
        const div = document.createElement('div');
        div.classList.add('poem');
        div.innerHTML = `
            <h3>${poem.title}</h3>
            <p>${poem.content}</p>
        `;
        container.appendChild(div);
    });
}

// Hamburger Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize everything on page load
window.addEventListener('DOMContentLoaded', () => {
    setHeaderImage();
    populateGigs();
    populateBios('band', aboutUs);
    populateBios('guest-artists', guestArtists);
    populatePoems();
    initCarousel();

    // Add hamburger menu event listener
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
});