import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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



let form = document.querySelector(".main-form")

const pfp = document.querySelector("#pfp")
const pfpPreview = document.querySelector(".pfp-preview")
let imageUrl;

pfp.addEventListener("change", function(){
    const file = this.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = function(){

        imageUrl = reader.result

        pfpPreview.style.backgroundImage = `url("${imageUrl}")`
        pfpPreview.style.backgroundColor = `white`
        pfpPreview.style.color = `transparent`
        localStorage.setItem("pfpImageUrl", imageUrl)
    }
})


form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        dob : document.querySelector("#dob").value,
        gender : document.querySelector("#gender").value,
        address : document.querySelector("#address").value,
        qualification : document.querySelector("#qualification").value,
        laptop : document.querySelector("#laptop").value,
        pfp : imageUrl,
        batch : Math.floor(Math.random() * 20) + 1,
        rollno : Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000
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

const idCardBtn = document.querySelector(".id-btn")

idCardBtn.addEventListener("click", function(){
    document.querySelector(".main-form").style.display = "none"
    document.querySelector(".id-form").style.display = "flex"
    idCardBtn.style.color = "#8dc63f"
    idCardBtn.style.backgroundColor = "#fff"
    regBtn.style.color = "#0d6db7"
    regBtn.style.backgroundColor = "rgb(250, 250, 250)"
})

const regBtn = document.querySelector(".registration-btn")

regBtn.addEventListener("click", function(){
    document.querySelector(".id-form").style.display = "none"
    document.querySelector(".main-form").style.display = "flex"
    table.style.display = "none"
    regBtn.style.color = "#8dc63f"
    regBtn.style.backgroundColor = "#fff"
    idCardBtn.style.color = "#0d6db7"
    idCardBtn.style.backgroundColor = "rgb(250, 250, 250)"
})

// Document Values

let batch;
let docName;
let docCourse;
let rollNo;
let docPfp;
let docCNIC;
let courseAbbr;
let fName;

// data sender card function 

window.downloadCard = function(encodedData) {
            
        const data = JSON.parse(encodedData);
        const iframe = document.querySelector("iframe");
        iframe.contentWindow.postMessage(data, "*");
}

let idForm = document.querySelector(".id-form")

idForm.addEventListener("submit", async function(e){
    e.preventDefault();

    let idInput = document.querySelector(".id-input")
    let idInputVal = idInput.value.trim()

    const filterDocs = query(collection(db, "SMIT - Registrations"), where("cnic", "==", idInputVal))
    const filteredDocs = await getDocs(filterDocs)
    const tBody = document.querySelector("tbody")
    const table = document.querySelector("table")
    
    if(!filteredDocs.empty){

        tBody.innerHTML = ""
        filteredDocs.forEach((doc)=> {

            docName = doc.data().name
            docCourse = doc.data().course
            batch = doc.data().batch
            docPfp = doc.data().pfp
            docCNIC = doc.data().cnic
            fName = doc.data().fName
            switch(docCourse){
                case "App Development":
                    courseAbbr = "AD"
                    break

                case "Web Development":
                    courseAbbr = "WD"
                    break

                case "Graphic Designing":
                    courseAbbr = "GD"
                    break

                case "Video Edtiting":
                    courseAbbr = "VE"
                    break

                case "Agentic AI":
                    courseAbbr = "Agentic AI"
                    break

                case "Generative AI":
                    courseAbbr = "Gen AI"
                    break

                case "Modern Web & App Development":
                    courseAbbr = "MWA"
                    break

                case "Techno Kids":
                    courseAbbr = "TK"
                    break
                }

                rollNo = `${courseAbbr}-${doc.data().rollno}`
                    
                const cardData = {
                    name: docName,
                    course: docCourse,
                    rollno: rollNo,
                    pfp: docPfp,
                    cnic: docCNIC,
                    fName: fName,
                    course2: `${courseAbbr} Batch (${batch})`
                };

                // Double stringify and escape quotes safely
            const encodedCardData = JSON.stringify(cardData)
            

        

            tBody.innerHTML += `<tr>
            <td style="width: 50vw; max-width: 320px;">${docCourse}</td>
            <td style="width: 10vw; max-width: 100px; margin-left: 10px;">${batch}</td>
            <td style="width: 20vw; max-width: 120px;"><button class="id-download" data-card='${encodedCardData}'>DOWNLOAD</button></td>
            </tr>`;

            tBody.addEventListener("click", (e) => {
                if (e.target.classList.contains("id-download")) {
                    const encodedData = e.target.getAttribute("data-card");
                    downloadCard(encodedData);
                }
                });
        })

        table.style.display = "block"
    }else{
        Swal.fire({
            icon: "error",
            title: "Student data not found",
            text: "No registration record matches the provided CNIC.",
        });
        idInput.value = ""
    }
});


window.addEventListener("load", function () {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.querySelectorAll("select").forEach(select => select.value = "");
});
