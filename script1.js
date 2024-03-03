let s = ['s1.mp3', 's2.mp3', 's3.mp3', 's4.mp3', 's5.mp3', 's6.mp3'];
let currentSongIndex = 0; // Initialize the current song index
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');

// Function to play the next song
function next() {
    currentSongIndex = (currentSongIndex + 1) % s.length; // Update the index
    song.src = s[currentSongIndex]; // Change the song
    song.play(); // Play the new song
    updateProgress(); // Update progress bar
}

function prev() {
    currentSongIndex = (currentSongIndex - 1 + s.length) % s.length; // Update the index for previous song
    song.src = s[currentSongIndex]; // Change the song
    song.play(); // Play the new song
    updateProgress(); // Update progress bar
}



// Function to update progress bar
function updateProgress() {
    song.onloadedmetadata = function() {
        progress.max = song.duration;
        progress.value = 0; // Reset progress to start
    };
}

song.pause(); // Pause the song initially
updateProgress(); // Call updateProgress to set initial progress bar

function playPause() {
    if (ctrlIcon.classList.contains('fa-pause')) {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        song.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
}

// Update progress bar while song is playing
song.addEventListener('timeupdate', function() {
    progress.value = song.currentTime;
});

progress.oninput = function() {
    song.currentTime = progress.value;
};

song.addEventListener('timeupdate', function() {
    // Update current time
    let currentTimeElement = document.getElementById('currentTime');
    currentTimeElement.textContent = formatTime(song.currentTime);

    // Update duration (if not NaN)
    let durationElement = document.getElementById('duration');
    if (!isNaN(song.duration)) {
        durationElement.textContent = formatTime(song.duration);
    }
});

// Function to format time (convert seconds to MM:SS format)
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
}