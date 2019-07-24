let db = firebase.firestore();

document.getElementById("login").addEventListener('click',function () {

    firebase.auth().signOut();

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;

        var email = user.email;
        var displayName = user.displayName;
        var dp_url = user.photoURL;
        var id = user.uid;

        //TODO: remove email_dup during release
        var fac_pattern = /@gmail.com$/i;
        var flag = email.match(fac_pattern);
        if(flag !== null){
            db.collection("user").where("id", "==", id).get().then(function(querySnapshot) {

                if(querySnapshot.size === 0){
                    db.collection("faculty").where("email", "==", email).get().then(function(querySnapshot1) {
                        if(querySnapshot1.size === 0){
                            user.delete();
                            alert("Please contact admin to login!")
                        }
                        else {
                            console.log("sign-up");
                            querySnapshot1.forEach(function (doc) {
                                console.log(doc.data().name);

                                db.collection("user").doc(id).set({
                                    access: doc.data().access,
                                    clearance: 1,
                                    dept: doc.data().dept,
                                    dp_url: dp_url,
                                    email: doc.data().email,
                                    id: id,
                                    name: doc.data().name,
                                    position: doc.data().position
                                }).then(function () {
                                    localStorage.setItem('access',doc.data().access);
                                    localStorage.setItem('clearance',1);
                                    localStorage.setItem('dept',doc.data().dept);
                                    localStorage.setItem('dp_url',dp_url);
                                    localStorage.setItem('email',doc.data().email);
                                    localStorage.setItem('id',id);
                                    localStorage.setItem('name',doc.data().name);
                                    localStorage.setItem('position',doc.data().position);

                                    if(doc.data().access === "TI")
                                        window.location.href="transport_dashboard.html";
                                    else
                                        window.location.href="faculty_dashboard.html";
                                });
                            });
                        }
                    });
                }
                else {
                    querySnapshot.forEach(function (doc) {
                        console.log("already logged-in");

                        localStorage.setItem('access',doc.data().access);
                        localStorage.setItem('clearance',1);
                        localStorage.setItem('dept',doc.data().dept);
                        localStorage.setItem('dp_url',dp_url);
                        localStorage.setItem('email',doc.data().email);
                        localStorage.setItem('id',id);
                        localStorage.setItem('name',doc.data().name);
                        localStorage.setItem('position',doc.data().position);

                        if(doc.data().access === "TI")
                            window.location.href="transport_dashboard.html";
                        else
                            window.location.href="faculty_dashboard.html";

                        console.log("already logged-in");
                    });
                }
            });
        }
        else {
            user.delete();
            alert("Sign in with college email ID");
        }
    });
});

//localStorage.clear();
//localStorage.removeItem(key);
//localStorage.getItem('name');

//var currentUser = firebase.auth().currentUser;