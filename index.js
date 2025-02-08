import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
        onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://abel-tracker-app-default-rtdb.europe-west1.firebasedatabase.app/"
    // databaseURL: process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

onValue(referenceInDB, function(snapshot){
    const snapshotValues = snapshot.val()
    if (snapshotValues) {
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    // Challenge: Import the 'push' function and modify the line above to push inputEl.value to the referenceInDB in the database
    inputEl.value = ""
})