var list = document.getElementById("list");

firebase.database().ref("todos").on('child_added', function (data) {

    // create li tag with text node
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.classList.add("fa", "fa-check-square-o", "fa-6");
    li.appendChild(liText)




    // create delete button
    var delBtn = document.createElement("button")
    delBtn.innerHTML = '<i class="fas fa-trash-alt fa-spin" style="font-size:20px; color:black"></i>'
    var delText = document.createTextNode("")
    delBtn.setAttribute("class", "btn")
    delBtn.setAttribute('id', data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.setAttribute("class", "addButton")
    delBtn.appendChild(delText)


    // create edit button
    var editBtn = document.createElement("button")
    editBtn.innerHTML = '<i class="fas fa-pencil-alt fa-spin" style="font-size:20px; color:black"></i>';
    var editText = document.createTextNode('')
    editBtn.setAttribute("class", "btn")
    editBtn.setAttribute('id', data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.setAttribute("class", "addButton")
    editBtn.appendChild(editText)





    li.appendChild(delBtn)
    li.appendChild(editBtn)


    list.appendChild(li)

    database.child(key).set(todo)
    
})


function addTodo() {
    var todo_item = document.getElementById("todo-item");
    var key = firebase.database().ref('todos').push().key

    var todo = {
        value: todo_item.value,
        key: key
    }

    firebase.database().ref("todos").child(key).set(todo)
    todo_item.value = ""

}




function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function editItem(e) {

    var val = prompt("Enter the edit value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val
}


function deleteAll() {
    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}