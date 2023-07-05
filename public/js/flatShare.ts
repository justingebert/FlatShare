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
