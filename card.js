window.addEventListener("message", (e) => {
  const data = e.data;

  let pfp = data.pfp
  let _name = data.name.toUpperCase()
  let course = data.course
  let rollno = data.rollno.toUpperCase()
  let fName = data.fName.toUpperCase()
  let cnic = data.cnic
  let course2 = data.course2


  document.querySelector(".card-name").innerHTML = _name;
  document.querySelector(".card-course").innerHTML = course;
  document.querySelector(".card-roll-no").innerHTML = rollno;
  document.querySelector(".card-pfp").src = pfp;

  document.querySelector(".card-name2").innerHTML = `Name: <span>${_name}</span>`;
  document.querySelector(".card-f-name2").innerHTML = `Father Name: <span>${fName}</span>`;
  document.querySelector(".card-cnic2").innerHTML = `CNIC: <span>${cnic}</span>`;
  document.querySelector(".card-course2").innerHTML = `Course:<span>${course2}</span>`;

      const pdfOptions = {
      margin:     0,
      filename:   `${data.rollno}.pdf`,
      html2canvas:{ scale: 2 },
      jsPDF:      { unit: "px", format: [1200, 650], orientation: "landscape" }
    };


  setTimeout(()=>{
    const cardContainer = document.querySelector(".main")
    html2pdf().set(pdfOptions).from(cardContainer).save(`${rollno}.pdf`)
  })
});