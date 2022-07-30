document.addEventListener('DOMContentLoaded', () => {
getDogs()
})

const table = document.getElementById('table-body')
const showName = document.querySelector('[name="name"]')
const showBreed = document.querySelector('[name="breed"]')
const showSex = document.querySelector('[name="sex"]')
const dogForm = document.getElementById('dog-form')
let activeDog;

//event listeners
dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitHandler();
    removeAllChildren(table);
    getDogs();
});

//functions
function getDogs() {
    fetch ('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (dogData => dogData.forEach(renderDog))
}

function renderDog(dog) {
    let tr = document.createElement('tr')
    let nametd = document.createElement('td');
    nametd.innerText = dog.name;
    let breedtd = document.createElement('td');
    breedtd.innerText = dog.breed;
    let sextd = document.createElement('td');
    sextd.innerText = dog.sex;
    let editButton = document.createElement('button');
    editButton.addEventListener('click', () => {
        showName.value = dog.name;
        showBreed.value = dog.breed;
        showSex.value = dog.sex;
        activeDog = dog.id
    })
    editButton.innerText = 'edit dog';
    table.append(tr);
    tr.append(nametd, breedtd, sextd, editButton);
}
function submitHandler() {
    let newDogInfo = {
        'name': `${showName.value}`,
        'breed': `${showBreed.value}`,
        'sex': `${showSex.value}`
    }
    console.log(newDogInfo, ' is the dog object');
    console.log(activeDog, ' is the active dog');
    fetch(`http://localhost:3000/dogs/${activeDog}`, {
        method : 'PATCH',
        body: JSON.stringify(newDogInfo),
        headers: {
            'Content-Type': 'application-json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}