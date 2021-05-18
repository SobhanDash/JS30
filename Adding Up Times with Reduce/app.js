const timeNodes = [...document.querySelectorAll("[data-time]")]

//since timeNodes is a nodelist, map() won't run on it. so we either spread it or use Array.from()
const seconds = timeNodes
    //grab all time. returns a nodelist
	.map((node) => node.dataset.time)
    //split the time into mins and secs and convert default string to float
	.map((timeCode) => {
		const [mins, secs] = timeCode.split(":").map(parseFloat)
		//console.log(mins, secs)
		return mins * 60 * secs
	})
    //adds all the time
    .reduce((total, vidSeconds) => total + vidSeconds)

    //console.log(seconds);

    let secondsLeft = seconds;
    //total hours
    const hours = Math.floor(secondsLeft / 3600)
    //to get the remaining seconds after hours is found
    secondsLeft = secondsLeft % 3600;

    //total mins
    const min = Math.floor(secondsLeft / 60)
    //remaining seconds
    secondsLeft = secondsLeft % 60

    console.log(hours, min, secondsLeft)

