// Data for sections - Edit these arrays/objects to update content

// Image Slideshow: Add image paths (place images in an 'images' folder in your repo)
const slides = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.jpg'
    // Add more as needed
];

// Upcoming Shows: Array of gig objects with date in YYYY-MM-DD format
const gigs = [
    { date: '2025-10-01', time: '8:00 PM', venue: 'Local Theater', description: 'Poetry Night' },
    { date: '2025-09-15', time: '7:00 PM', venue: 'City Hall', description: 'Past Event' }, // This will be hidden
    // Add more gigs here
];

// About Us: Array of 4 people
const aboutUs = [
    {
        name: 'Person 1',
        bio: 'Short bio for Person 1, passionate about poetry and performance.',
        image: 'images/person1.jpg'
    },
    {
        name: 'Person 2',
        bio: 'Short bio for Person 2, a creative soul with a love for words.',
        image: 'images/person2.jpg'
    },
    {
        name: 'Person 3',
        bio: 'Short bio for Person 3, blending music and poetry.',
        image: 'images/person3.jpg'
    },
    {
        name: 'Person 4',
        bio: 'Short bio for Person 4, dedicated to storytelling.',
        image: 'images/person4.jpg'
    }
];

// Guest Artists: Up to 3 people (add fewer if needed)
const guestArtists = [
    {
        name: 'Guest 1',
        bio: 'Guest artist with a unique perspective on poetry.',
        image: 'images/guest1.jpg'
    },
    {
        name: 'Guest 2',
        bio: 'Guest artist known for evocative performances.',
        image: 'images/guest2.jpg'
    }
    // Add a third if needed
];

// Our Poetry: Array of poems
const poems = [
    {
        title: 'Poem 1',
        content: `Line 1
Line 2
Line 3`
    },
    {
        title: 'Poem 2',
        content: `Another line 1
Another line 2`
    }
    // Add more poems
];

// Function to initialize slideshow
function initSlideshow() {
    const container = document.querySelector('.slideshow-container');
    slides.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.style.display = 'block';
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        slide.appendChild(img);
        container.appendChild(slide);
    });

    let currentSlide = 0;
    setInterval(() => {
        const slidesElements = document.querySelectorAll('.slide');
        slidesElements[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slidesElements[currentSlide].style.display = 'block';
    }, 3000); // Change slide every 3 seconds
}

// Function to populate upcoming shows
function populateGigs() {
    const list = document.getElementById('gigs-list');
    const section = document.getElementById('upcoming-shows');
    const now = new Date();
    const futureGigs = gigs.filter(gig => new Date(gig.date) > now);

    if (futureGigs.length === 0) {
        section.classList.add('hidden');
        return;
    }

    futureGigs.forEach(gig => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${gig.date} at ${gig.time}</strong> - ${gig.venue}<br>${gig.description}`;
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

// Initialize everything on page load
window.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    populateGigs();
    populateBios('about-us', aboutUs);
    populateBios('guest-artists', guestArtists);
    populatePoems();
});