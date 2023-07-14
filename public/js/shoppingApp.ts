$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/shopping?format=json", (data) => {
            data.forEach((shopping:any) => {
                $(".modal-body").append(
                    `<div>
                    <span class="shopping-item">
                    ${shopping.item}
                    </span>
                    <div class="item-quantity">
                    ${shopping.quantity}
                    </div>
                    </div>`
                ); 
            });
        }); 
    });  
});