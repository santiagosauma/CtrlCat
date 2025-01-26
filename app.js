let infoButton = document.querySelector(".infoButton")
let socialButton = document.querySelector(".socialButton")
let informationInput = document.querySelector(".informationInput")
let socialInput = document.querySelector(".socialInput")

function hideAll() {
    informationInput.classList.add("hidden")
    socialInput.classList.add("hidden")
}

infoButton.addEventListener('click', () => {
    hideAll()
    informationInput.classList.toggle("hidden")
})

socialButton.addEventListener('click', () => {
    hideAll()
    socialInput.classList.toggle("hidden")
})

