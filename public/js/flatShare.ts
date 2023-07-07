$.get("/api/todos", (results = {}) => {
    let data = results.data; 
    if (!data || !data.todos) return;
    data.todos.forEach((todo:any) => {
        $("#modal-body").append(
            `<div class="card">
            ${todo.name}
            </div>`
        );
    });
});

const socket = io();
$("chatForm").submit(() => {
    let text = $("#chat-input").val()
    socket.emit("message", {
        content: text
    })
    $("#chat-input").val("")
    return false
})

socket.on("message", (msg:any) => {
    displayMessage(msg.content)
})

let displayMessage = (message:any) => {
    $("#chat").prepend($("<li>").html(message))
}

