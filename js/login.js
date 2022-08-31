document.getElementById("signup").onclick = function(){

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("phonenumber").value;
    let password = document.getElementById("password").value;
    let timestamp = new Date();

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred)=>{

        let userId = userCred.user.uid;

        firebase.firestore().collection("users").doc(userId).set({
            firstName:firstname,
            lastName:lastname,
            useEmail:email,
            userNumber:number,
            signUpTime:timestamp,
            userId:userId
        }).then(()=>{
            window.location.href = "dashboard.html"
        })

    })
}