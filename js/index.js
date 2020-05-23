document.addEventListener('DOMContentLoaded', () => {

url = ('http://localhost:3000/monsters')
const createMonster = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const backButton = document.getElementById('back')
const forwardButton = document.getElementById('forward')

fetch(url)
.then(res => res.json())
.then(mons => {
    monsterList(mons)
    newMonster(mons)
})

const monsterList = monster => {
    for (let i = 0; i < 50; i++) {
        const monsDiv = document.createElement('div')
        monsDiv.className = 'monster-div'
        monsterContainer.appendChild(monsDiv)

        monsDiv.innerHTML = `
            <h2>Name: ${monster[i].name}</h2>
            <h4>Age: ${monster[i].age}</h4>
            <p>Description: ${monster[i].description}</p>
            `
    }
}

const newMonster = monster => {
    const createMonsterForm = document.createElement('form')
    createMonsterForm.id = 'monster-form'

    createMonster.append(createMonsterForm)
    createMonsterForm.innerHTML += `
        <input id='name' placeholder='name...'>
        <input id='age' placeholder='age...'>
        <input id='description' placeholder='description...'>
        <button>Create</button>
    `
    const monsterName = document.querySelector('input#name')
    const monsterAge = document.querySelector('input#age')
    const monsterDescription = document.querySelector('input#description')

    createMonsterForm.addEventListener('submit', (e) => {
        e.preventDefault()

        console.log(monsterName.value)
        console.log(monsterAge.value)
        console.log(monsterDescription.value)

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: monsterName.value,
                age: monsterAge.value,
                description: monsterDescription.value
            })
        })

        .then(resp => resp.json())
        .then(json => addMonster(json))
    
        e.target.reset()
    })

    let addMonster = (monster) => {
        const monCardDiv = document.createElement('div')
            monCardDiv.className = 'card'
            monsterContainer.appendChild(monCardDiv)
            monCardDiv.innerHTML += `
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>${monster.description}</p>
            `
        monsterContainer.prepend(monCardDiv)
    }
}
//

})