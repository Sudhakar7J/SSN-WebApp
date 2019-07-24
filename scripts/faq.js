let div_nav = document.getElementById("nav_drawer");

let data = "";
if(localStorage.getItem("access") === "TI"){
    data +=  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"transport_dashboard.html\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=\"transport_new_post.html\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";
    document.getElementById("access").style.display = "block";
    document.getElementById("access").innerHTML = "TRANSPORT";
}
else {
    data +=  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"faculty_dashboard.html\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=\"faculty_new_post.html\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";

    if (localStorage.getItem("access") === "SA") {
        data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add / Modify Admin</span></a></li>";
        document.getElementById("access").style.display = "block";
        document.getElementById("access").innerHTML = "SUPER ADMIN";
    }
    else if (localStorage.getItem("access") === "AD") {
        data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add Faculty</span></a></li>";
        data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>Add Clubs</span></a></li>";
        document.getElementById("access").style.display = "block";
        document.getElementById("access").innerHTML = "ADMIN";
    }
    else {
        data += "<li class=\"nav-item\"><a class=\"nav-link \" href=#><i class=\"material-icons\">error</i><span>View Admin</span></a></li>";
        document.getElementById("access").style.display = "none";
    }
}

data += "<li class=\"nav-item\"><a class=\"nav-link active\" href=#><i class=\"material-icons\">error</i><span>FAQs</span></a></li>";
data += "<li class=\"nav-item\"><a class=\"nav-link \" href=\"index.html\"><i class=\"material-icons\">error</i><span>Logout</span></a></li></ul>";

let newNode = document.createElement('ul');
newNode.innerHTML = data;
div_nav.appendChild(newNode);

document.getElementById("name").innerHTML = localStorage.getItem('name');
document.getElementById("position").innerHTML = localStorage.getItem('position');

let dp_url = document.getElementById('dp_url');
dp_url.src=localStorage.getItem('dp_url');
