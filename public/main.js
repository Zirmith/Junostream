if (flvjs.isSupported()) {
    const videoElement = document.getElementById('videoElement');
    const waitingMessage = document.getElementById('waitingMessage');

    const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'https://junostream.onrender.com/live/Juno.flv' // Correct FLV stream URL
    });

    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();

    const checkStream = () => {
        if (flvPlayer.isPaused() || !videoElement.src) {
            waitingMessage.textContent = 'Waiting for the stream to start...';
            waitingMessage.classList.add('show');
        }
    };

    flvPlayer.on(flvjs.Events.ERROR, (error) => {
        console.error('FLV.js Error:', error);
        waitingMessage.textContent = 'Stream not available.';
        waitingMessage.classList.add('show');
    });

    flvPlayer.on(flvjs.Events.LOADED_METADATA, () => {
        waitingMessage.style.display = 'none';
    });

    flvPlayer.on(flvjs.Events.STREAM_END, () => {
        waitingMessage.textContent = 'Stream has ended.';
        waitingMessage.classList.add('show');
    });

    flvPlayer.on(flvjs.Events.PLAYING, () => {
        waitingMessage.style.display = 'none';
    });

    // Check stream status every 5 seconds
    setInterval(checkStream, 5000);

} else {
    document.body.innerHTML = '<p>FLV.js is not supported in this browser.</p>';
}
