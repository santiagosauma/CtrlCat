const infoButton = document.querySelector(".infoButton")
const socialButton = document.querySelector(".socialButton")
const informationInput = document.querySelector(".informationInput")
const socialInput = document.querySelector(".socialInput")
const saveButtonInfo = document.querySelector(".saveButtonInfo")
const saveButtonSocial = document.querySelector(".saveButtonSocial")
const infoBoxInput = document.querySelector(".textInputInfo")
const copies = document.querySelector(".copies")

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
                updateInfoList(info)
            })
        })
    }
})

function updateInfoList(info) {
    copies.innerHTML = ''
    info.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item.text
        copies.appendChild(li)
    })
}

chrome.storage.local.get(['Info'], (result) => {
    if(result.Info) {
        result.Info.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item.text
            copies.appendChild(li)
        })
    }
    else {
        const p = document.createElement('p')
        p.textContent = "No copies saved"
        copies.appendChild(p)
    }
})