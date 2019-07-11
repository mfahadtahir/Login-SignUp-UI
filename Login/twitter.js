
const twitterLogin = (event) => {
    event.preventDefault();
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(token, user);
        if(user.emailVerified){
            window.location.replace('../home.html');
        }
        else{
            var user = firebase.auth().currentUser;
            
            user.sendEmailVerification()
            .then(function () {
                alert('Verification email sent');
                window.location.reload();
            }).catch(function (error) {
                // An error happened.
                console.log(error);
            });
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage);
        // ...
    });
}