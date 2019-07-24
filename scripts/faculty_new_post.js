let div_nav = document.getElementById("nav_drawer");
let db = firebase.firestore();
let storageRef = firebase.storage().ref("post/");

let filesArray = [];
let imageArray = [];
let department = [];

let selectedFiles, numberOfFiles = 0;

document.getElementById("post").addEventListener('click',function () {
    filesArray = [];
    imageArray = [];
    department = [];

    selectedFiles = document.getElementById("inputFile").files;
    numberOfFiles = selectedFiles.length;

    if(numberOfFiles === 0)
        sendData();

    let count = 0;
    for(let i=0; i<numberOfFiles; i++) {
        let file = selectedFiles[i];

        let uploadTask = storageRef.child(file.name).put(file);

        uploadTask.on('state_changed', function(snapshot) {}, function(error) {}, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                let file_index = downloadURL.indexOf("?alt");
                let file_name = downloadURL.substring(77, file_index);

                let type_index = file_name.lastIndexOf(".");
                let type_name = file_name.substring(type_index+1);

                if (type_name === "png" || type_name === "jpg" || type_name === "jpeg")
                    imageArray.push(downloadURL);
                else {
                    let fileArrayData = {"name": file_name, "url": downloadURL};
                    filesArray.push(fileArrayData);
                }

                count++;
                if(count === numberOfFiles)
                    sendData();
            });
        });
    }
});

function sendData() {
    let postTitle = document.getElementById("title").value;
    let postBody = document.getElementById("content").value;

    let allYear = document.getElementById("year_all").checked;
    let firstYear = document.getElementById("year1").checked || allYear;
    let secondYear = document.getElementById("year2").checked || allYear;
    let thirdYear = document.getElementById("year3").checked || allYear;
    let fourthYear = document.getElementById("year4").checked || allYear;

    if(document.getElementById("cse").checked)
        department.push("cse");

    if(document.getElementById("it").checked)
        department.push("it");

    if(document.getElementById("mec").checked)
        department.push("mec");

    if(document.getElementById("bme").checked)
        department.push("bme");

    if(document.getElementById("ece").checked)
        department.push("ece");

    if(document.getElementById("eee").checked)
        department.push("eee");

    if(document.getElementById("civ").checked)
        department.push("civ");

    if(document.getElementById("che").checked)
        department.push("che");

    if(document.getElementById("dept_all").checked)
        department = ["cse","it","mec","bme","ece","eee","civ","che"];

    db.collection("post").add({
        title: postTitle,
        description : postBody,
        author: localStorage.getItem("id"),
        img_urls : imageArray,
        file_urls : filesArray,
        dept: department,
        id: "",
        time :firebase.firestore.FieldValue.serverTimestamp(),
        year : {
            2016 : fourthYear,
            2017 : thirdYear,
            2018 : secondYear,
            2019 : firstYear
        }
    }).then(function(docRef) {
        db.collection("post").doc(docRef.id).update({
            "id": docRef.id
        });

        let xhr = new XMLHttpRequest();
        let url = "https://ssn-app-web.herokuapp.com/notify";
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");

        let data = JSON.stringify({
            "message": {
                "data": {
                    "PostType":"1",
                    "PostId":docRef.id
                },
                "notification": {
                    "title": postTitle,
                    "body":  postBody
                },
                "topic": "cse"
            }
        });

        xhr.send(data);

        window.location.href="faculty_dashboard.html";
    });
}

//OnCreate script

document.getElementById("phone_name").innerHTML = localStorage.getItem('name');
document.getElementById("name").innerHTML = localStorage.getItem('name');
document.getElementById("position").innerHTML = localStorage.getItem('position');
document.getElementById("phone_position").innerHTML = localStorage.getItem('position');

let dp_url = document.getElementById('dp_url');
let phone_dp_url = document.getElementById('phone_dp_url');

dp_url.src=localStorage.getItem('dp_url');
phone_dp_url.src=localStorage.getItem('dp_url');

let data =  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"faculty_dashboard.html\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link active\" href=\"#\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";

if(localStorage.getItem("access") === "SA"){
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add / Modify Admin</span></a></li>";
    document.getElementById("access").style.display="block";
    document.getElementById("access").innerHTML="SUPER ADMIN";
}
else if(localStorage.getItem("access") === "AD"){
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add Faculty</span></a></li>";
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add Clubs</span></a></li>";
    document.getElementById("access").style.display="block";
    document.getElementById("access").innerHTML="ADMIN";
}
else {
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>View Admin</span></a></li>";
    document.getElementById("access").style.display="none";
}
data += "<li class=\"nav-item\"><a class=\"nav-link \" href=faq.html><i class=\"material-icons\">error</i><span>FAQs</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link \" href=index.html><i class=\"material-icons\">error</i><span>Logout</span></a></li></ul>";

let newNode = document.createElement('ul');
newNode.innerHTML = data;
div_nav.appendChild(newNode);

function phoneContentChange(val){
    document.getElementById("phone_content").innerHTML=val;}

function phoneTitleChange(val){
    document.getElementById("phone_title").innerHTML=val;}

function yearChange(checkbox){
    document.getElementById("year1").checked = checkbox.checked;
    document.getElementById("year2").checked = checkbox.checked;
    document.getElementById("year3").checked = checkbox.checked;
    document.getElementById("year4").checked = checkbox.checked;
}

function deptChange(checkbox){
    document.getElementById("cse").checked = checkbox.checked;
    document.getElementById("it").checked = checkbox.checked;
    document.getElementById("mec").checked = checkbox.checked;
    document.getElementById("civ").checked = checkbox.checked;
    document.getElementById("ece").checked = checkbox.checked;
    document.getElementById("eee").checked = checkbox.checked;
    document.getElementById("bme").checked = checkbox.checked;
    document.getElementById("che").checked = checkbox.checked;
}

//Add this, if any error in notif occurs
/*
        xhr.onreadystatechange = function () {
            console.log("status : " + xhr.status);
            if (this.readyState === 4 && this.status === 200) {
                console.log("notified!");

            }
        };
 */