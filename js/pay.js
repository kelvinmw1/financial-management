//searching for a user
document.getElementById("searchbutton").onclick = function(){
    //get data from HTML

    const searchinput = document.getElementById("searchinput").value;

    firebase.firestore().collection("users").where("userNumber", "==", searchinput).get().then((querySnapshot)=>{
        const content = '';
        querySnapshot.forEach((doc)=>{
            const userNumber = doc.data().userNumber;
           

            content += '<div>';
                content += '<p>'+userNumber+'</p>';
            content += '</div>';

        })

        $("#userResult").append(content);
    })
}