function changeFavicon(text) {
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = '64px sans-serif';
    ctx.fillText(text, 0, 60);
  
    const link = document.createElement('link');
    const oldLinks = document.querySelectorAll('link[rel="shortcut icon"]');
    oldLinks.forEach(e => e.parentNode.removeChild(e));
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
}
if (document.location.href === 'https://solarflurry.github.io/blank' || document.location.host === '' || document.location.hostname === 'localhost') {
    changeFavicon('')
    setTimeout(() => {
        var ans = prompt("Github Pages has detected 3 seconds of inactivity.\nRedirecting to solarflurry.github.io...\nPlease type 'cancel' to cancel", "")
        if (ans === 'nah keep me here') {
            var secret = document.getElementById('secret')
            document.getElementsByClassName("container")[0].style.display = "none"
            secret.style.display = "block";
            document.title = "Secret Website :)"
            document.body.style.backgroundColor = "white"
            changeFavicon('😎')
            var rainbows = document.getElementsByTagName("shouter")
            for (i=0; i < rainbows.length; i++) {
                rainbows[i].addEventListener('mouseenter', (event) => {
                    for (j=0; j<20; j++) {
                        setTimeout(() => {
                            var shout = document.createElement("shout")
                            document.body.appendChild(shout)
                            shout.innerHTML = event.target.innerHTML
                            shout.style.top = Math.random()*window.innerHeight.toString() + "px"
                            shout.style.left = Math.random()*window.innerWidth.toString() + "px"
                            setTimeout(() => {
                                shout.remove()
                            }, 2000)
                        }, j*75)
                    }
                })
            }
            var messages = ['', '', "Double Click!", "Triple Click!", "Mega Click!", "Ultra Click!", "Crazy Click!!", "Insane Click!!","Dominating Click!!", "Rampaging Click!!", "Monster Click!!!", "Unstoppable Click!!!", "Mouse Breaking Click!!!", "Spamming Click!!!", "GODLIKE CLICK!!!!"]
            var clicks = 0
            var counter = document.getElementById("counter")
            var increase = document.getElementById("increase")
            increase.addEventListener('click', (event) => {
                clicks += 1
                event.target.style.position = "absolute"
                event.target.style.left = Math.random()*(window.innerWidth - 100).toString() + "px" 
                counter.innerHTML = messages[Math.min(clicks, messages.length-1)] + "\nClicks: " + clicks.toString()
                event.target.animate([
                    {scale: 1, offset: 0},
                    {scale: 2, offset: 0.5},
                    {scale: 1, offset: 1}
                ],{
                    duration: 200,
                    iterations: 1
                })
                if (clicks > messages.length - 2) {
                    counter.classList.add("godlike")
                    document.getElementById("needsgodlike").style.display = "block"
                }
            })
        } else if (ans === 'cancel') {
            alert("Github Pages redirect has been canceled")
        } else {
            document.location.href = "/"
        }
    }, 100)
}