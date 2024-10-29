document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card.h-100');
    cards.forEach(card => {
        const cardText = card.querySelector('.card-text');
        
        card.addEventListener('click', function() {
            // open or close?
            if (cardText.classList.contains('show')) {
                cardText.classList.remove('show'); // close
                setTimeout(() => {
                    cardText.style.display = 'none'; // hide text
                }, 500); // delay of text
            } else {
                cardText.style.display = 'block'; // show text
                setTimeout(() => {
                    cardText.classList.add('show'); // animation class
                }, 10); // delay of animation
            }
        });
    });

    document.querySelector('#changeColor').addEventListener('click', function() {
        // rgb
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        // apply
        document.body.style.backgroundColor = randomColor;
    });
   
    function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById('datetime').textContent = formattedDate;
}

// update rn
updateDateTime();

// in seconds
setInterval(updateDateTime, 1000);

const toggleModeButton = document.querySelector('#toggleMode');
const body = document.body;
const modeIcon = document.querySelector('#modeIcon');

 // Toggle mode on button click
 toggleModeButton.addEventListener('click', function() {
    toggleNightMode();
});

// Toggle mode on Ctrl key press
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        toggleNightMode();
    }
});

function toggleNightMode() {
    body.classList.toggle('night-mode');

    if (body.classList.contains('night-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}


const trackShipmentButton = document.getElementById('trackShipmentButton');
const shipmentContainer = document.getElementById('shipmentContainer');

// Track index for what event to display
let currentEventIndex = 0;

trackShipmentButton.addEventListener('click', () => {
    trackShipment();
});

async function trackShipment() {
    try {
        // Fetching local JSON file
        const response = await fetch('ship.json');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        // Checking if there are more events to display
        if (currentEventIndex < data.events.length) {
            // Creating shipment information element
            const shipmentInfo = document.createElement('div');
            shipmentInfo.classList.add('col-md-12', 'mb-4');

            // Fill information into element
            const event = data.events[currentEventIndex];
            shipmentInfo.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5>Shipment Status: ${event.status}</h5>
                        <p>Location: ${event.location_city}, ${event.location_state}</p>
                        <p>Date: ${new Date(event.date).toLocaleString()}</p>
                    </div>
                </div>
            `;

            shipmentContainer.appendChild(shipmentInfo);
            // Incrementing index to continue to the next element
            currentEventIndex++;

        } else {
            alert("No more events to display.");
        }

    } catch (error) {
        console.error('Failed to track shipment:', error);
    }
}

});

// Play & button from fontawesome.com
let isPlaying = false;
        
function toggleAudio() {
    const audioPlayer = document.getElementById("audioPlayer");
    const playButton = document.getElementById("playButton");

    if (isPlaying) {
        audioPlayer.pause();
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play")
    } else {
        audioPlayer.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause")
    }

    isPlaying = !isPlaying;
}