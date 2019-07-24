let ul_post = document.getElementById("post_list");
let div_nav = document.getElementById("nav_drawer");
let db = firebase.firestore();

db.collection("post").where("author", "==", localStorage.getItem("id")).orderBy("time","desc").get().then(function(querySnapshot) {
    if(querySnapshot.size === 0){
        alert("No post!")
    }
    else {
        querySnapshot.forEach(function (doc) {
            let description = doc.data().description;
            let time = doc.data().time.toDate().getTime();
            let title = doc.data().title;
            let img_urls = doc.data().img_urls;

            let now = new Date().getTime();
            let t = now - time;

            if(t < 60000)
                time = ((t / 1000)|0) + "s ago";
            else if(t < 3600000)
                time = ((t / 60000)|0) + "m ago";
            else if(t < 86400000)
                time = ((t / 3600000)|0) + "h ago";
            else if(t < 604800000)
                time = ((t/86400000)|0) + "d ago";
            else if(t < 2592000000)
                time = ((t/604800000)|0) + "w ago";
            else if(t < 31536000000)
                time = ((t/2592000000)|0) + "M ago";
            else
                time = ((t/31536000000)|0) + "y ago";

            let data = "<li><div class=\"row\"><div class=\"col-lg-12\"><div class=\"card card-small card-post h-100\">";

            if(img_urls.length > 0)
                data += "<div class=\"card-post__image\" style=\"height: 220px; background-image: url('" + img_urls[0] + "')\"></div>";

            data += "<div class=\"card-body\"><h5 style=\"margin-right: 80px; margin-top:-10px;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;\"><a><b>" + title + "</b></a></h5>\n" +
                    "<span id=\"post_time\" style=\"position: absolute; margin-top: -30px; color: #317bc0; right: 20px\">" + time + "</span>" +
                    "<p class=\"card-text\" style=\" margin-bottom:-10px;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;\">"+ description + "</p>\n" +
                    "</div></div></div></div></li><br>";

            let newNode = document.createElement('li');
            newNode.innerHTML = data;
            ul_post.appendChild(newNode);
        });
    }
});

let data =  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link active\" href=\"#\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=\"faculty_new_post.html\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";

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

document.getElementById("name").innerHTML = localStorage.getItem('name');
document.getElementById("position").innerHTML = localStorage.getItem('position');

let dp_url = document.getElementById('dp_url');
dp_url.src=localStorage.getItem('dp_url');