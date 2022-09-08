document.getElementById("Submit").onclick = function(){
    let incomeType = document.getElementById("incomeType").value;
    let paymentMethod = document.getElementById("paymentMethod").value;
    let amount = document.getElementById("amount").value;
    let receivedBy = document.getElementById("receivedBy").value;
    let timeStamp = new Date();

    let addIncome = firebase.firestore().collection("income").doc();
    addIncome.set({

        docId:addIncome.id,
        timeStamp:timeStamp,
        incomeType:incomeType,
       paymentMethod:paymentMethod,
        amount:amount,
        receivedBy:receivedBy
    }).then(()=>{
        window.location.reload();
    })
}
// Read Income

firebase.firestore().collection("income").get().then((querySnapshot)=>{
    let content = '';
    querySnapshot.forEach((doc)=>{
        let incomeType = doc.data().incomeType;
        let paymentMethod = doc.data().paymentMethod;
        let amount = doc.data().amount;
        let receivedBy = doc.data().receivedBy;
        let timeStamp = doc.data().timeStamp;
        let docId = doc.data().docId;


        content+= '<tr>' 

            content+= '<td>'+incomeType+'</td>'
            content+= '<td>'+paymentMethod+'</td>'
            content+= '<td> KES '+amount+'</td>'
            content+= '<td>'+receivedBy+'</td>'
            content+= '<td><button class="btn btn-success">Edit</button></td>'
            content+= '<td><button onclick = "deleteDoc(\'' +docId+ '\')" class="btn btn-danger"data-bs-toggle="modal" data-bs-target="#deletemodal">Delete</button></td>'

        content+= '</tr>'
    })
    $("#incomelist").append(content);
})
    //run a function to get the doc id on click of a button
    window.deleteDoc = function(docId){
        console.log(docId)

        document.getElementById("deletebtn").onclick = function(){

            firebase.firestore().collection("income").doc(docId).delete().then(()=>{
                window.location.href = "income.html"
            })
        }
    } 