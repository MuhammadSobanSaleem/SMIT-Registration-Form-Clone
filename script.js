import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {getFirestore, collection, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyC4lXudPmGxWufW12n8-Gh2kD7iuclSPMk",
    authDomain: "saylani-form-clone-2a30e.firebaseapp.com",
    projectId: "saylani-form-clone-2a30e",
    storageBucket: "saylani-form-clone-2a30e.firebasestorage.app",
    messagingSenderId: "1075221812143",
    appId: "1:1075221812143:web:177980eeffb9508a66d55a",
    measurementId: "G-8473VGKCW0"

};

// Initialize FireBase
const app = initializeApp(firebaseConfig);

// Initialize FireStore
const db = getFirestore(app);



let form = document.querySelector("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    const data= {
        country : document.querySelector("#country").value,
        city : document.querySelector("#city").value,
        course : document.querySelector("#course").value,
        compProf : document.querySelector("#CP").value,
        name : document.querySelector("#name").value,
        fName : document.querySelector("#f-name").value,
        email : document.querySelector("#email").value,
        phone : document.querySelector("#phone").value,
        cnic : document.querySelector("#cnic").value,
        // fcnic : document.querySelector("#fnic").value,
        dob : document.querySelector("#dob").value,
        gender : document.querySelector("#gender").value,
        address : document.querySelector("#address").value,
        qualification : document.querySelector("#qualification").value,
        laptop : document.querySelector("#laptop").value
        
    }

    try{
        await addDoc(collection(db, "SMIT - Registrations"), data)
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Your form was submitted successfully',
          confirmButtonColor: '#0d6db7'
        });    
        form.reset()
    }catch(error){
        console.error("❌ Error adding document:", error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonColor: '#d33'
        });

    }



});


