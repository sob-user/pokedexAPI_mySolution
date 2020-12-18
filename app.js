let loadStatus = {
    load: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
    next: '',
    previous: '',
    data: {},
    current: {},
    currentType: '',
    page: 1,
    _id: ''
}

window.onload = () => {
    loadContent(loadStatus.load)
}

loadContent = (status) => {
    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.response)
            loadStatus.next = response.next
            loadStatus.previous = response.previous
            loadStatus.data = response.results
            diplayPokeList()
        }
    }

    xhttp.open('GET', `${status}`, true)
    xhttp.send()
}

diplayPokeList = () => {
    const divRightContainerScreen = document.getElementsByClassName('right-container__screen')[0].children
    const passIntoArray = [].slice.call(divRightContainerScreen)
    const data = loadStatus.data

    const togglePokeName = data.map((item) => {
        return item.name
    })

    let count = 0
    let page = loadStatus.page

    passIntoArray.map((list_item) => {
        list_item.innerHTML = `${page}. ${togglePokeName[count]}`
        count = count + 1
        page = page + 1
    })

    linkTheClick()
}

linkTheClick = () => {
    const divRightContainerScreen = document.getElementsByClassName('right-container__screen')[0].children
    const passIntoArray = [].slice.call(divRightContainerScreen)

    passIntoArray.map((list_item) => {
        list_item.onclick = (item) => {
            loadInfo(item.target.innerText)
        }
    })

    const buttonNext = document.getElementsByClassName('left-button')[0]
    const buttonPrev = document.getElementsByClassName('right-button')[0]

    buttonNext.onclick = () => {
        previous()
    }

    buttonPrev.onclick = () => {
        next()
    }
}

loadInfo = (name) => {
    const extractName = name.replace(/[.\/0-9 ]/g,'')

    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.response)
            loadStatus.current = response
            toogleBackground()
        }
    }

    xhttp.open('GET', `https://pokeapi.co/api/v2/pokemon/${extractName}`, true)
    xhttp.send()
}

previous = () => {
    if(loadStatus.previous !== null) {
        loadContent(loadStatus.previous)
        loadStatus.page = loadStatus.page - 20
    }
}

next = () => {
    if(loadStatus.next !== null) {
        loadContent(loadStatus.next)
        loadStatus.page = loadStatus.page + 20
    }
}

toogleBackground = () => {
    const pokeType = loadStatus.current.types[0].type.name
    const divMainScreen = document.getElementsByClassName('main-screen')[0]

    divMainScreen.classList.remove('hide')

    if(loadStatus.currentType !== '') {
        divMainScreen.classList.remove(loadStatus.currentType)
        loadStatus.currentType = pokeType
        divMainScreen.classList.add(`${loadStatus.currentType}`)
        displayPokeInfo()
    }
    else if(loadStatus.currentType === '') {
        loadStatus.currentType = pokeType
        divMainScreen.classList.add(`${loadStatus.currentType}`)
        displayPokeInfo()
    }
}

displayPokeInfo = () => {
    const pokeName = document.getElementsByClassName('poke-name')[0]
    const pokeId = document.getElementsByClassName('poke-id')[0]
    const name = loadStatus.current.name
    const id = loadStatus.current.id

    verifyIdLength(id)

    pokeName.innerHTML = name
    pokeId.innerHTML = loadStatus._id + id

    const imgSrcFront = loadStatus.current.sprites.front_default
    const imgSrcBack = loadStatus.current.sprites.back_default
    const imgPokeFrontImage = document.getElementsByClassName('poke-front-image')[0]
    const imgPokeBackImage = document.getElementsByClassName('poke-back-image')[0]
    imgPokeFrontImage.setAttribute('src', imgSrcFront)
    imgPokeBackImage.setAttribute('src', imgSrcBack)

    const pokeTypes = loadStatus.current.types
    const divStatsTypes = document.getElementsByClassName('stats__types')[0].children
    const passIntoArray = [].slice.call(divStatsTypes)

    const types = pokeTypes.map((types) => {
        return types.type.name
    })

    let count = 0

    passIntoArray.map((span) => {
        if(types.length === 2) {
            span.innerHTML = types[count]
            count = count + 1
            span.style.display = 'block'
        }
        else if(types.length === 1) {
            passIntoArray[count].innerHTML = types[count]
            passIntoArray[count + 1].innerHTML = null
            passIntoArray[count + 1].style.display = 'none'
        }
    })

    const spanPokeWeight = document.getElementsByClassName('poke-weight')[0]
    const spanPokeHeight = document.getElementsByClassName('poke-height')[0]
    const pokeWeight = loadStatus.current.weight
    const pokeHeight = loadStatus.current.height
    spanPokeWeight.innerHTML = pokeWeight
    spanPokeHeight.innerHTML = pokeHeight
}

verifyIdLength = (id) => {
    const idToString = id.toString()

    if(idToString.length === 1) {
        loadStatus._id = '#00'
    }
    else if(idToString.length === 2) {
        loadStatus._id = '#0'
    }
    else if(idToString.length >= 3) {
        loadStatus._id = '#'
    }
}