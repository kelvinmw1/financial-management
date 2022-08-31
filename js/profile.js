firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        const userId = user.uid;
        const useEmail = user.email;
        const userNumber = user.number;

        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{

            const firstname = doc.data().firstName;
            const lastname = doc.data().lastName;
            const usernumber = doc.data().userNumber;
            const profileImage = doc.data().profileimage;
           
            document.getElementById("profilepic").src = profileImage;
            document.getElementById("username").innerText = firstname + " " + lastname;
            document.getElementById("usernumber").innerText = usernumber;
        })

        document.getElementById("savechanges").onclick = function(){
            const editfirstname = document.getElementById("editfirstname").value;
            const editlastname = document.getElementById("editlastname").value;

            firebase.firestore().collection("users").doc(userId).update({
                firstName:editfirstname,
                lastName:editlastname,
            }).then(()=>{
                window.location.reload();
            })
        }  
            document.getElementById("upload").onclick = function(){
            const profileimage = document.getElementById("uploadpic").files[0];
            const storageref = firebase.storage().ref();
            const uploadtask = storageref.child("profile/").child(Math.random() + profileimage.name).put(profileimage);

            uploadtask.on('state_changed', (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
            },(error)=>{

            },()=>{
                uploadtask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    firebase.firestore().collection("users").doc(userId).update({
                        profileimage:downloadURL
                    }).then(()=>{
                        window.location.reload();
                    })
                

                })

            })
        }   
           
            
    }
})