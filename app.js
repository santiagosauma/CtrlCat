const infoButton = document.querySelector(".infoButton")
const socialButton = document.querySelector(".socialButton")
const informationInput = document.querySelector(".informationInput")
const socialInput = document.querySelector(".socialInput")
const saveButtonInfo = document.querySelector(".saveButtonInfo")
const saveButtonSocial = document.querySelector(".saveButtonSocial")
const infoBoxInput = document.querySelector(".textInputInfo")
const copies = document.querySelector(".copies")
const addInfoButton = document.querySelector(".addInfoButton")
const cancelButtonInfo = document.querySelector(".cancelButtonInfo")

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
            const info = result.Info || []
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
        infoBoxInput.classList.toggle('hidden')
        saveButtonInfo.classList.toggle('hidden')
        copies.classList.toggle('hidden')
        addInfoButton.classList.toggle('hidden')
        cancelButtonInfo.classList.toggle('hidden')
    }
})

function updateInfoList(info) {
    copies.innerHTML = ''
    info.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="deleteBtn" data-id="${item.id}">X</span>
        ${item.text}
        `
        copies.appendChild(li)
    })
}

copies.addEventListener('click', (e) => {
    if(e.target.classList.contains('deleteBtn')){
        const id = Number(e.target.dataset.id)
        chrome.storage.local.get(['Info'], (result) => {
            const updatedInfo = result.Info.filter(item => item.id !== id)
            chrome.storage.local.set({Info: updatedInfo}, () => {
                updateInfoList(updatedInfo)
            })

        })
        const li = document.createElement('li')
            li.innerHTML = "<p>No copies saved!</p>"
            copies.appendChild(li)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['Info'], (result) => {
        if(result.Info && result.Info.length > 0) {
            result.Info.forEach(item => {
                const li = document.createElement('li')
                li.innerHTML = `
                <span class="deleteBtn" data-id="${item.id}">X</span>
                ${item.text}
                `
                copies.appendChild(li)
            })
        }
        else {
            const li = document.createElement('li')
            li.innerHTML = "<p>No copies saved!</p>"
            copies.appendChild(li)
        }
    })
})

addInfoButton.addEventListener('click', () =>{
    infoBoxInput.classList.toggle('hidden')
    saveButtonInfo.classList.toggle('hidden')
    cancelButtonInfo.classList.toggle('hidden')
    copies.classList.toggle('hidden')
    document.querySelectorAll(".copies li").forEach(item => {
        item.classList.toggle('hidden');
    });
    addInfoButton.classList.toggle('hidden')
})

cancelButtonInfo.addEventListener('click', () => {
    saveButtonInfo.classList.toggle('hidden')
    cancelButtonInfo.classList.toggle('hidden')
    infoBoxInput.classList.toggle('hidden')
    copies.classList.toggle('hidden')
    document.querySelectorAll(".copies li").forEach(item => {
        item.classList.toggle('hidden');
    });
    addInfoButton.classList.toggle('hidden')
})