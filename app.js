let hex = localStorage.getItem('mainColor')
let collectionLink = localStorage.getItem('collectionLink')
console.log(collectionLink)
if(hex==null){
    localStorage.setItem('mainColor','#ffffff')
}else{
    document.documentElement.style.setProperty('--mainColor', hex)
}
if(collectionLink==null){
    localStorage.setItem('collectionLink','v6KJwmrcJzM')
}else{
    collectionLink = localStorage.getItem('collectionLink')
    console.log(collectionLink)
}
accessKey = 'nVt3_BYBXjCaUzo2Qlh142lWxzWew0ZffENsejwz4WY'
let characters = document.querySelectorAll('.character')
console.log(characters)
let creditLink = document.querySelector('.creditLink')
async function getBackGroundImage(collectionId) {
    const res = await fetch(`https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${accessKey}`)
    const data = await res.json();
    console.log(data)
    let backgroundImg = document.querySelector('.bgContainer')
    backgroundImg.style.backgroundImage = `url(${data.urls.full})`
    creditLink.textContent = `Photo By ${data.user.name} - Unsplash`
    creditLink.href = data.user.links.html
    const img = new Image()
    img.onload = ()=>{
        backgroundImg.classList.add('goInClass')
        for(let i=0; i<characters.length; i++){
            characters[i].classList.add('welcomingAnimation')
            if(i == characters.length-1){
                characters[i].classList.add('lastChar')
            }
        }
        let lastChar = document.querySelector('.lastChar')
        lastChar.addEventListener('animationend', (e)=>{
        if(e.target === lastChar){
            titleHolder.classList.add('goOutClass')
        }
    })
    }
    img.onerror=()=>{
        console.error('image load failed')
    }
    img.src = `${data.urls.full}`
}
getBackGroundImage(collectionLink)
let titleHolder = document.querySelector('.titleholder')
let clock = document.querySelector('.clock')



titleHolder.addEventListener('animationend', (e)=>{
    if (e.target === titleHolder) { // only parent animation
        titleHolder.style.display = 'none';
        clock.style.display = 'block'
        clock.classList.add('slideUP')
    }
})
function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    // convert to 12-hour format
    hours = hours % 12 || 12; // 0 → 12

    const time = `${hours}:${minutes}`;
    clock.textContent = time
}
setInterval(updateClock, 1000)
let settingBtn = document.querySelector('.settingsBtn')
let settingsPanel = document.querySelector('.settingsPanel')
let settingsOpen = false
settingBtn.addEventListener('click', ()=>{
    if(settingsOpen){
        settingsPanel.style.display = 'none'
        settingsOpen = false
        settingBtn.style.backgroundColor = '#ffffff'
    }else{
        settingsPanel.style.display = 'block'
        settingsOpen = true
        settingBtn.style.backgroundColor = '#000000'

    }
})
let updateBTN = document.querySelector('.submitBtn')
updateBTN.addEventListener('click', ()=>{
    let link = document.querySelector('#collection')
    let hex = document.querySelector('#color')
    if(link.value.length>0){
        console.log(link.value)
        url = link.value
        const { pathname } = new URL(url);
        const parts = pathname.split('/');
        localStorage.setItem('collectionLink', parts[2]);
        updateBTN.textContent = 'Saved'
    }
    if(hex.value.length>0){
        console.log(hex.value)
        if(isHexColor(hex.value)){
            console.log('IS HEX')
            document.documentElement.style.setProperty('--mainColor', hex.value)
            localStorage.setItem('mainColor', hex.value)
            updateBTN.textContent = 'Saved'
        }else{
            hex.style.backgroundColor = '#fdacacff'
        }
    }
})
function isHexColor(value) {
    console.log('is hex?')
    return /^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value);
}
