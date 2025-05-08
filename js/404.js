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
if (document.location.href === 'https://solarflurry.github.io/blank' || document.location.host === '') {
    changeFavicon('')
    setTimeout(() => {
        var ans = prompt("Github Pages has detected 3 seconds of inactivity.\nRedirecting to solarflurry.github.io...\nPlease type 'cancel' to cancel", "")
        if (ans === 'nah keep me here') {
            var secret = document.getElementById('secret')
            secret.style.display = "block";
            document.title = "Secret Website :)"
            document.body.style.backgroundColor = "white"
            changeFavicon('😎')
            var rainbows = document.getElementsByTagName("rainbow")
            for (i=0; i < rainbows.length; i++) {
                rainbows[i].addEventListener('mouseenter', (event) => {
                    var shouts = event.target.shouts
                    if (!shouts) {
                        shouts = 10
                    }
                    for (j=0; j<shouts; j++) {
                        setTimeout(() => {
                            var shout = document.createElement("shout")
                            document.body.appendChild(shout)
                            shout.innerHTML = event.target.innerHTML
                            shout.style.top = Math.random()*window.innerHeight.toString() + "px"
                            shout.style.left = Math.random()*window.innerWidth.toString() + "px"
                            setTimeout(() => {
                                shout.remove()
                            }, 2000)
                        }, j*150)
                    }
                })
            }
        } else if (ans === 'cancel') {
            alert("Github Pages redirect has been canceled")
        } else {
            document.location.href = "/"
        }
    }, 100)
}