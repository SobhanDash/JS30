const video = document.querySelector(".player")
const canvas = document.querySelector(".photo")
const ctx = canvas.getContext("2d")
const strip = document.querySelector(".strip")
const snap = document.querySelector(".snap")

function getVideo() {
	navigator.mediaDevices
		//returns only video
		.getUserMedia({ video: true, audio: false })
		//the navigator returns a promise
		.then((localMediaStream) => {
			// console.log(localMediaStream)
			//gets us a mini version
			video.srcObject = localMediaStream
			video.play()
		})
		.catch((error) => {
			console.error("Please allow access your webcam")
			console.alert("Allow access to webcam")
		})
}

function displayOnCanvas() {
	const width = video.videoWidth
	const height = video.videoHeight
	// console.log(width, height)
	//to draw on canvas the width and height has to be same as we're getting from the cam
	canvas.width = width
	canvas.height = height

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height)
		//take the pixels out
		let pixels = ctx.getImageData(0, 0, width, height)
		//mess with them

		// pixels = redEffect(pixels);

		pixels = splitEffect(pixels)
		ctx.globalAlpha = 0.3

		// pixels = greenScreen(pixels)

		//put them back
		ctx.putImageData(pixels, 0, 0)
	}, 15)
}

function takePic() {
	//plays the sound
	snap.currentTime = 0
	snap.play()

	//take the data out of the canvas
	const data = canvas.toDataURL("image/jpeg")
	// console.log(data)        -> uses a text base data of the pic taken
	//create an anchor tag and assign it the data obttained
	const link = document.createElement("a")
	link.href = data
	link.setAttribute("download", "img") //-> for downloading image with the name 'img'
	// link.textContent = 'Download Image';
	link.innerHTML = `<img src="${data}" alt="Hot guy">`
	strip.insertBefore(link, strip.firstChild)
}

//red filter
function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100 //red
		pixels.data[i + 1] = pixels.data[i + 1] - 75 //green
		pixels.data[i + 2] = pixels.data[i + 2] - 100 //blue
	}
	return pixels
}

function splitEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0] //red
		pixels.data[i + 100] = pixels.data[i + 1] //green
		pixels.data[i - 150] = pixels.data[i + 2] //blue
	}
	return pixels
}

function greenScreen(pixels) {
	//stores the levels of green
	const levels = []

	document.querySelectorAll(".rgb input").forEach((input) => {
		levels[input.name] = input.value
	})

	for (i = 0; i < pixels.data.length; i += 4) {
		red = pixels.data[i + 0]
		green = pixels.data[i + 1]
		blue = pixels.data[i + 2]
		alpha = pixels.data[i + 3]

		if (
			red >= levels.rmin &&
			green >= levels.gmin &&
			blue >= levels.bmin &&
			red <= levels.rmax &&
			green <= levels.gmax &&
			blue <= levels.bmax
		) {
			//if any color lies between these then take it out
			pixels.data[i + 3] = 0
		}
	}
	return pixels
}

getVideo()

video.addEventListener("canplay", displayOnCanvas)
