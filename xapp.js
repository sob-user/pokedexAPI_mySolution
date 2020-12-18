let status = ''

window.onload = function() {
    status = 'load'
    dynamicStatus(status)
    createStructure()
}

window.onclick = function() {
    const event = window.event
    loadPokemonInfo(event.target.innerText)
}

let statusObj = {
    load: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    next: '',
    previous: ''
}

function createStructure() {
    const divMainScreenHide = document.getElementsByClassName('main-screen hide')[0]
    const createDivScreenHeader = document.createElement('div')
    const createSpanPokeName = document.createElement('span')
    const createSpanPokeId = document.createElement('span')

    createDivScreenHeader.classList.add("screen__header")
    divMainScreenHide.appendChild(createDivScreenHeader)

    createSpanPokeName.classList.add("poke-name")
    createDivScreenHeader.appendChild(createSpanPokeName)

    createSpanPokeId.classList.add("poke-id")
    createDivScreenHeader.appendChild(createSpanPokeId)

    const createDivScreenImage = document.createElement('div')
    const createImgPokeFrontImg = document.createElement('img')
    const createImgPokeBackImg = document.createElement('img')

    createDivScreenImage.classList.add("screen__image")
    divMainScreenHide.appendChild(createDivScreenImage)

    createImgPokeFrontImg.classList.add("poke-front-image")
    createImgPokeFrontImg.setAttribute("alt", "front")
    createDivScreenImage.appendChild(createImgPokeFrontImg)

    createImgPokeBackImg.classList.add("poke-back-image")
    createImgPokeBackImg.setAttribute("alt", "back")
    createDivScreenImage.appendChild(createImgPokeBackImg)

    const createDivScreenDecription = document.createElement('div')
    const createDivStatsTypes = document.createElement('div')
    const createDivScreenStats = document.createElement('div')

    createDivScreenDecription.classList.add("screen__description")
    createDivStatsTypes.classList.add("stats__types")
    createDivScreenStats.classList.add("screen__stats")
    createDivScreenDecription.appendChild(createDivStatsTypes)
    createDivScreenDecription.appendChild(createDivScreenStats)
    divMainScreenHide.appendChild(createDivScreenDecription)

    const createSpanPokeTypeOne = document.createElement('span')
    const createSpanPokeTypeTwo = document.createElement('span')

    createSpanPokeTypeOne.classList.add("poke-type-one")
    createSpanPokeTypeTwo.classList.add("poke-type-two")
    createDivStatsTypes.appendChild(createSpanPokeTypeOne)
    createDivStatsTypes.appendChild(createSpanPokeTypeTwo)

    const createPStatsWeight = document.createElement('p')
    const createPStatsHeight = document.createElement('p')
    createPStatsWeight.classList.add('stats__weight')
    createPStatsHeight.classList.add('stats__height')
    createPStatsWeight.innerHTML = 'weight: '
    createPStatsHeight.innerHTML = 'height: '
    createDivScreenStats.appendChild(createPStatsWeight)
    createDivScreenStats.appendChild(createPStatsHeight)

    const createSpanPokeWeight = document.createElement('span')
    const createSpanPokeHeight = document.createElement('span')
    createSpanPokeWeight.classList.add('poke-weight')
    createSpanPokeHeight.classList.add('poke-height')
    createPStatsHeight.appendChild(createSpanPokeHeight)
    createPStatsWeight.appendChild(createSpanPokeWeight)
    console.log(divMainScreenHide)
}

function dynamicStatus(status) {
    let toogleStatus = null
    if(status === 'load') {
        toogleStatus = statusObj.load
    }
    else if(status === 'next') {
        toogleStatus = statusObj.next
    }
    else if(status === 'previous') {
        toogleStatus = statusObj.previous
    }

    loadPokemon(toogleStatus)
}

let pokemon = []
let pokemonInfo = []

function loadPokemon(toogleStatus) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            statusObj.next = response.next
            statusObj.previous = response.previous
            stampZone(response.results)
            url = response.results
        }
    };
    xhttp.open("GET", `${toogleStatus}`, true);
    xhttp.send(); 
}


function loadPokemonInfo(pokeName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() { 

        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response)
            const divMainScreenHide = document.getElementsByClassName('main-screen hide')[0]
            divMainScreenHide.style.display = 'block'
            const divPokeName = document.getElementsByClassName('poke-name')[0]
            divPokeName.innerHTML = response.name
            
        }
    }
    xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokeName}`, true);
    xhttp.send(); 
}

function stampZone(res) {
    if(res !== undefined) {
        structurePokeList(res)
    }
}

function structurePokeList(res) { 
    const rightContainerSreen = document.getElementsByClassName('right-container__screen')[0]
    
    res.map((pokemon)=>{
        const createDivListItem = document.createElement('div')
        createDivListItem.classList.add('list-item')
        createDivListItem.innerHTML = pokemon.name
        rightContainerSreen.appendChild(createDivListItem)
        const createImgPoke = document.createElement('img')
        createImgPoke.classList.add('img-poke')
        createDivListItem.appendChild(createImgPoke)
    })

}
