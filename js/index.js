const data = fetch("https://api.github.com/users/SolarFlurry", {mode: "no-cors"})
var selectedNav = document.getElementsByTagName("nav-link")[0]
var select = document.getElementById("link-select")
var searchBtn = document.getElementById("search")
var searchPopup = document.getElementById("search-popup")
var searchBar = document.getElementById("search-bar")

updateSelectedLink(selectedNav)

data
    .then(response => {
        return response.json()
    })
    .then(response => console.log(response))
    .catch(e => {console.warn(e)})

class NavLink extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', event => {
            if (this.getAttribute("content") === null) return
            searchPopup.style.display = 'none'
            const contents = document.getElementsByClassName("content")
            for (let i = 0; i < contents.length; i++) {
                contents[i].style.display = "none"
            }
            document.getElementById(this.getAttribute("content")).style.display = "block"
            selectedNav = this
        })
    }
}

class ToolTip extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('mouseenter', event => {
            if (this.getAttribute("tip") === null) return
            const tip = document.getElementById(this.getAttribute("tip"))
            tip.style.opacity = 1
            tip.style.scale = 1
            tip.style.left = `${this.getBoundingClientRect().left}px`
            tip.style.top = `${this.getBoundingClientRect().top-tip.clientHeight}px`
        })
        this.addEventListener('mouseleave', event => {
            if (this.getAttribute("tip") === null) return
            const tip = document.getElementById(this.getAttribute("tip"))
            tip.style.opacity = 0
            tip.style.scale = 0
        })
    }
}

window.addEventListener('load', () => {update()})
searchBtn.addEventListener('click', event => {
    searchPopup.style.display = 'block'
})
searchBar.addEventListener('input', event => {
    if (event.target.value === '') {
        document.getElementById("inputtext").innerHTML = "Search Something"
    } else {
        document.getElementById("inputtext").innerHTML = event.target.value
    }
})

customElements.define("nav-link", NavLink)
customElements.define("tool-tip", ToolTip)

function updateSelectedLink(navlink) {
    select.innerHTML = navlink.innerHTML
    select.style.left = `${navlink.offsetLeft}px`
    select.style.top = `${navlink.offsetTop}px`
}

function update() {
    updateSelectedLink(selectedNav)
    window.requestAnimationFrame(update)
}