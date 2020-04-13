// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB-CIrvKzhMKCEbs-5IzPf--KKOA6OH5oE",
    authDomain: "registrationform-38e6e.firebaseapp.com",
    databaseURL: "https://registrationform-38e6e.firebaseio.com",
    projectId: "registrationform-38e6e",
    storageBucket: "registrationform-38e6e.appspot.com",
    messagingSenderId: "959226922380",
    appId: "1:959226922380:web:0741a3bf2949b4fc9402a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Date formatting
let today = new Date();
document.querySelector('input[type=date]').min = today.toLocaleDateString('lt');

// Time formatting

const startTime = 8;
const endTime = 20;
const sessionTime = 0.5;


// Session create
const table = document.querySelector('tbody');

getTable();

const div = document.querySelectorAll('div[time]');

div.forEach(item => {
    item.addEventListener('click', event => {
        event.target.style.color = 'red';

        console.log(event.target.getAttribute('time'));
    })
});


// Firebase query add
document.forms.register.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const surname = event.target.elements.surname.value;
    const age = Number(event.target.elements.age.value);
    const email = event.target.elements.email.value;
    const date = event.target.elements.date.value;


    firebase.firestore().collection("session").add({
        name: name,
        surname: surname,
        age: age,
        email: email,
        date: date,
        //setTime:
    })
        .then(() => alert('added in firebase'));
});


// Firebase query get
firebase.firestore().collection('session').get()
    .then(snapshot => snapshot.docs.forEach(doc => {
            console.log(doc.data());
        })
    );

function getTable() {
    for (let i = startTime; i < endTime; i += sessionTime) {
        const totalMinutes = i * 60;
        const hours = (Math.floor(totalMinutes / 60)).toString();
        let minutes = ((totalMinutes % 60).toString() + '0').slice(0, 2);

        const tr = table.insertRow();

        const td1 = tr.insertCell();
        td1.textContent = hours;
        const td2 = tr.insertCell();
        td2.textContent = minutes;
        const td3 = tr.insertCell();

        const div = document.createElement('div');
        div.textContent = 'Confirm';
        div.setAttribute('time', totalMinutes.toString());
        td3.append(div);

        console.log(`Hours ${hours}, minutes ${minutes}`);
    }
}