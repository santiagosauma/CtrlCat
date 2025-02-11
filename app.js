const infoButton = document.querySelector(".infoButton");
const socialButton = document.querySelector(".socialButton");
const informationInput = document.querySelector(".informationInput");
const socialInput = document.querySelector(".socialInput");
const saveButtonInfo = document.querySelector(".saveButtonInfo");
const saveButtonSocial = document.querySelector(".saveButtonSocial");
const infoBoxInput = document.querySelector(".textInputInfo");
const socialBoxInput = document.querySelector(".textInputSocial");
const copies = document.querySelector(".copies");
const socialCopies = document.querySelector(".social-copies");
const addInfoButton = document.querySelector(".addInfoButton");
const addSocialButton = document.querySelector(".addSocialButton");
const cancelButtonInfo = document.querySelector(".cancelButtonInfo");
const cancelButtonSocial = document.querySelector(".cancelButtonSocial");

function hideAll() {
    informationInput.classList.add("hidden");
    socialInput.classList.add("hidden");
}

infoButton.addEventListener('click', () => {
    hideAll();
    informationInput.classList.toggle("hidden");
});

socialButton.addEventListener('click', () => {
    hideAll();
    socialInput.classList.toggle("hidden");
});

saveButtonInfo.addEventListener('click', () => {
    if (infoBoxInput.value.trim()) {
        chrome.storage.local.get(['Info'], (result) => {
            const info = result.Info || [];
            const newInfo = {
                id: Date.now(),
                text: infoBoxInput.value.trim(),
                type: "Information"
            };
            info.push(newInfo);
            chrome.storage.local.set({ Info: info }, () => {
                infoBoxInput.value = '';
                updateInfoList(info);
            });
        });
        infoBoxInput.classList.toggle('hidden');
        saveButtonInfo.classList.toggle('hidden');
        copies.classList.toggle('hidden');
        addInfoButton.classList.toggle('hidden');
        cancelButtonInfo.classList.toggle('hidden');
    }
});

saveButtonSocial.addEventListener('click', () => {
    if (socialBoxInput.value.trim()) {
        chrome.storage.local.get(['Social'], (result) => {
            const social = result.Social || [];
            const newSocial = {
                id: Date.now(),
                text: socialBoxInput.value.trim(),
                type: "Social"
            };
            social.push(newSocial);
            chrome.storage.local.set({ Social: social }, () => {
                socialBoxInput.value = '';
                updateSocialList(social);
            });
        });
        socialBoxInput.classList.toggle('hidden');
        saveButtonSocial.classList.toggle('hidden');
        socialCopies.classList.toggle('hidden');
        addSocialButton.classList.toggle('hidden');
        cancelButtonSocial.classList.toggle('hidden');
    }
});

function updateInfoList(info) {
    copies.innerHTML = '';
    if (info.length === 0) {
        const defaultInfoMessage = document.createElement('li');
        defaultInfoMessage.textContent = 'No information available';
        defaultInfoMessage.classList.add('default-message');
        copies.appendChild(defaultInfoMessage);
    } else {
        info.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span class="deleteBtn" data-id="${item.id}">X</span>
            ${item.text}
            `;
            copies.appendChild(li);
        });
    }
}

function updateSocialList(social) {
    socialCopies.innerHTML = '';
    if (social.length === 0) {
        const defaultSocialMessage = document.createElement('li');
        defaultSocialMessage.textContent = 'No social links available';
        defaultSocialMessage.classList.add('default-message');
        socialCopies.appendChild(defaultSocialMessage);
    } else {
        social.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span class="deleteBtn" data-id="${item.id}">X</span>
            ${item.text}
            `;
            socialCopies.appendChild(li);
        });
    }
}

copies.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const id = Number(e.target.dataset.id);
        chrome.storage.local.get(['Info'], (result) => {
            const updatedInfo = result.Info.filter(item => item.id !== id);
            chrome.storage.local.set({ Info: updatedInfo }, () => {
                updateInfoList(updatedInfo);
            });
        });
    }
});

socialCopies.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const id = Number(e.target.dataset.id);
        chrome.storage.local.get(['Social'], (result) => {
            const updatedSocial = result.Social.filter(item => item.id !== id);
            chrome.storage.local.set({ Social: updatedSocial }, () => {
                updateSocialList(updatedSocial);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['Info'], (result) => {
        updateInfoList(result.Info || []);
    });

    chrome.storage.local.get(['Social'], (result) => {
        updateSocialList(result.Social || []);
    });

    const copiesList = document.querySelector('.copies');
    const socialCopiesList = document.querySelector('.social-copies');
    const defaultInfoMessage = document.createElement('li');
    const defaultSocialMessage = document.createElement('li');

    defaultInfoMessage.textContent = 'No information available';
    defaultInfoMessage.classList.add('default-message');
    defaultSocialMessage.textContent = 'No social links available';
    defaultSocialMessage.classList.add('default-message');

    const updateDefaultMessage = (list, defaultMessage) => {
        if (list.children.length === 0) {
            list.appendChild(defaultMessage);
        } else if (list.contains(defaultMessage)) {
            list.removeChild(defaultMessage);
        }
    };

    updateDefaultMessage(copiesList, defaultInfoMessage);
    updateDefaultMessage(socialCopiesList, defaultSocialMessage);

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const listItem = event.target.closest('li');
            const list = listItem.parentElement;
            list.removeChild(listItem);
            updateDefaultMessage(list, list === copiesList ? defaultInfoMessage : defaultSocialMessage);
        }
    });

    addInfoButton.addEventListener('click', () => {
        infoBoxInput.classList.toggle('hidden');
        saveButtonInfo.classList.toggle('hidden');
        cancelButtonInfo.classList.toggle('hidden');
        copies.classList.toggle('hidden');
        document.querySelectorAll(".copies li").forEach(item => {
            item.classList.toggle('hidden');
        });
        addInfoButton.classList.toggle('hidden');
        const defaultInfoMessage = document.querySelector('.default-message');
        if (defaultInfoMessage) {
            defaultInfoMessage.remove();
        }
    });

    addSocialButton.addEventListener('click', () => {
        socialBoxInput.classList.toggle('hidden');
        saveButtonSocial.classList.toggle('hidden');
        cancelButtonSocial.classList.toggle('hidden');
        socialCopies.classList.toggle('hidden');
        document.querySelectorAll(".social-copies li").forEach(item => {
            item.classList.toggle('hidden');
        });
        addSocialButton.classList.toggle('hidden');
    });
});

cancelButtonInfo.addEventListener('click', () => {
    saveButtonInfo.classList.toggle('hidden');
    cancelButtonInfo.classList.toggle('hidden');
    infoBoxInput.value = "";
    infoBoxInput.classList.toggle('hidden');
    copies.classList.toggle('hidden');
    document.querySelectorAll(".copies li").forEach(item => {
        item.classList.toggle('hidden');
    });
    addInfoButton.classList.toggle('hidden');
    if (copies.children.length === 0) {
        const defaultInfoMessage = document.createElement('li');
        defaultInfoMessage.textContent = 'No information available';
        defaultInfoMessage.classList.add('default-message');
        copies.appendChild(defaultInfoMessage);
    }
});

cancelButtonSocial.addEventListener('click', () => {
    saveButtonSocial.classList.toggle('hidden');
    cancelButtonSocial.classList.toggle('hidden');
    socialBoxInput.value = "";
    socialBoxInput.classList.toggle('hidden');
    socialCopies.classList.toggle('hidden');
    document.querySelectorAll(".social-copies li").forEach(item => {
        item.classList.toggle('hidden');
    });
    addSocialButton.classList.toggle('hidden');
    // Restore default message if no items are present
    if (socialCopies.children.length === 0) {
        const defaultSocialMessage = document.createElement('li');
        defaultSocialMessage.textContent = 'No social links available';
        defaultSocialMessage.classList.add('default-message');
        socialCopies.appendChild(defaultSocialMessage);
    }
});