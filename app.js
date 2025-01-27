const infoButton = document.querySelector(".infoButton")
const socialButton = document.querySelector(".socialButton")
const informationInput = document.querySelector(".informationInput")
const socialInput = document.querySelector(".socialInput")
const saveButtonInfo = document.querySelector(".saveButtonInfo")
const saveButtonSocial = document.querySelector(".saveButtonSocial")
const infoBoxInput = document.querySelector(".textInputInfo")

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

saveButtonInfo.addEventListener('click', () =>{
    if(infoBoxInput.value.trim()){
        chrome.storage.local.get(['Info'], (result) =>
        {
            const info = result.info || []
            const newInfo = {
                id: Date.now(),
                text: infoBoxInput.value.trim(),
                type: "Information"
            }
            info.push(newInfo)
            chrome.storage.local.set({ Info: info }, () => {
                infoBoxInput.value = ''
            })
        })
    }
})
