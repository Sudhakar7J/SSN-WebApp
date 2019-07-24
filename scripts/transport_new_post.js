let db = firebase.firestore();
let div_nav = document.getElementById("nav_drawer");
let storageRef = firebase.storage().ref("post_bus/");

let file_chosen = "";

document.getElementById("post").addEventListener('click',function () {
    filesArray = [];

    selectedFiles = document.getElementById("inputFile").files;
    numberOfFiles = selectedFiles.length;

    if(numberOfFiles === 0)
        sendData();
    else{
        let file = selectedFiles[0];

        let uploadTask = storageRef.child(file.name).put(file);

        uploadTask.on('state_changed', function(snapshot) {}, function(error) {}, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                let file_index = downloadURL.indexOf("?alt");
                let file_name = downloadURL.substring(77, file_index);

                let type_index = file_name.lastIndexOf(".");
                let type_name = file_name.substring(type_index+1);

                if (type_name === "pdf") {
                    file_chosen = downloadURL;
                    sendData()
                }
                else
                    alert("Please choose PDF file!");
            });
        });
    }
});

function sendData() {
    let desc = document.getElementById("desc").value;
    let title = document.getElementById("title").value;

    var date = new Date(title);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    title = (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y;

    db.collection("post_bus").add({
        title: title,
        desc : desc,
        url : file_chosen,
        avail : ["1"],
        time :firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(docRef) {
        let xhr = new XMLHttpRequest();
        let url = "https://ssn-app-web.herokuapp.com/notify";
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");

        let data = JSON.stringify({
            "message": {
                "data": {
                    "PostType":"2",
                    "PostId":docRef.id,
                    "PostUrl":file_chosen
                },
                "notification": {
                    "title": "Bus routes from " + title,
                    "body":  desc
                },
                "topic": "cse"
            }
        });

        xhr.send(data);

        window.location.href="transport_dashboard.html";
    });
}

//OnCreate script
let now = new Date();
now.setDate(now.getDate() + 1);
document.getElementById('title').valueAsDate = now;

let data =  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"transport_dashboard.html\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link active\" href=\"#\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link \" href=faq.html><i class=\"material-icons\">error</i><span>FAQs</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link \" href=index.html><i class=\"material-icons\">error</i><span>Logout</span></a></li></ul>";

let newNode = document.createElement('ul');
newNode.innerHTML = data;
div_nav.appendChild(newNode);

document.getElementById("access").style.display="block";
document.getElementById("access").innerHTML="TRANSPORT";
document.getElementById("name").innerHTML = localStorage.getItem('name');
document.getElementById("position").innerHTML = localStorage.getItem('position');

let dp_url = document.getElementById('dp_url');
dp_url.src=localStorage.getItem('dp_url');

//Add this, if any error in notif occurs
/*
        xhr.onreadystatechange = function () {
            console.log("status : " + xhr.status);
            if (this.readyState === 4 && this.status === 200) {
                console.log("notified!");

            }
        };
 */