let ul = document.getElementById("post_list");
let div_nav = document.getElementById("nav_drawer");
let db = firebase.firestore();

db.collection("post_bus").orderBy("time","desc").get().then(function(querySnapshot) {
    if(querySnapshot.size === 0){
        alert("No post!")
    }
    else {
        querySnapshot.forEach(function (doc) {
            let desc = doc.data().desc;
            let time = doc.data().time.toDate().getTime();
            let title = doc.data().title;
            let url = doc.data().url;

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

            let data = "<li><div class=\"row\"><div class=\"col-lg-12\"><div class=\"card card-small card-post h-100\"><div class=\"card-body\">\n" +
                        "<h5 style=\"margin-right: 80px; margin-top:-10px;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;\"><a><b>Bus routes from ";
            data+=title;
            data+="</b></a></h5><span id=\"post_time\" style=\"position: absolute; margin-top: -30px; color: #317bc0; right: 20px\">";
            data+=time;
            data+= "</span><p class=\"card-text\" style=\" margin-bottom:15px;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;\">";
            data+= desc;
            data+= "</p><a href=\"#\" id=\"view\" class=\"btn btn-outline-secondary\" style=\"position: absolute; margin-top: -15px; width: 60px; font-size: 12px; padding: 3px; color: #317bc0; right: 15px; color: #317bc0;\"><b>VIEW</b></a>\n" +
                    "</div></div></div></div></li><br>";

            let newNode = document.createElement('li');
            newNode.innerHTML = data;
            ul.appendChild(newNode);
        });
    }
});

let data =  "<ul class=\"nav\"><li class=\"nav-item\"><a class=\"nav-link active\" href=\"#\"><i class=\"material-icons\">home</i><span>Dashboard</span></a></li>";
    data += "<li class=\"nav-item\"><a class=\"nav-link \" href=\"transport_new_post.html\"><i class=\"material-icons\">note_add</i><span>Add New Post</span></a></li>";
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