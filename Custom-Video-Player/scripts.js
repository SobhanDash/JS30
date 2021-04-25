// Get our videoents
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".filled")
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".slider")
const fullscreen = player.querySelector(".fullscreen")

//Functions

// toggle the play button
function togglePlay() {
	/* if (video.paused) {
		video.play()
	} else {
		video.pause()
	} 
    it can be written in ternary as follows*/

	const isPlaying = video.paused ? "play" : "pause"
	video[isPlaying]()
}

//update the play and pause button
function updateBtn() {
	const icon = this.paused ? "►" : "❚❚"
	toggle.textContent = icon
}

//for skipping
function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}

//for updating the colume and speed
function rangeUpdater() {
	video[this.name] = this.value
}

//for the progress bar
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100
	progressBar.style.flexBasis = `${percent}%`
}

//when we click anywhere on the progress bar this runs
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
	video.currentTime = scrubTime
}

//for fullscreen
function fullScreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen()
	} else if (video.webkitRequestFullscreen) {
		/* Safari */
		video.webkitRequestFullscreen()
	} else if (video.msRequestFullscreen) {
		/* IE11 */
		video.msRequestFullscreen()
	}
}

//Hook the event listeners

//for play and pause
video.addEventListener("click", togglePlay)
video.addEventListener("play", updateBtn)
video.addEventListener("pause", updateBtn)
video.addEventListener("progress", handleProgress)

//for skipping
toggle.addEventListener("click", togglePlay)
skipButtons.forEach((button) => button.addEventListener("click", skip))

//for increasing/ decreasing the volume and speed of video
ranges.forEach((range) => range.addEventListener("change", rangeUpdater))
ranges.forEach((range) => range.addEventListener("mousemove", rangeUpdater))

//move forward/back on the progress bar
let mousedown = false
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))
progress.addEventListener("mousedown", () => (mousedown = true))
progress.addEventListener("mouseup", () => (mousedown = false))

//fullscreen
fullscreen.addEventListener("click", fullScreen)

//play/pause using spacebar
document.body.onkeyup = (e) => {
	if (e.keyCode == 32) {
		togglePlay()
	}
}
