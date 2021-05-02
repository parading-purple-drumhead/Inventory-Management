
document.addEventListener("DOMContentLoaded", async () => {

    document.querySelector("#nav-username").textContent = sessionStorage.name
    prod_table = document.querySelector("#prod-table")

    // data = [
    //     {
    //         'id': '1',
    //         'name': 'Tables',
    //         'quantity': 100,
    //         'room': 'UB401'
    //     },
    //     {
    //         'id': '1',
    //         'name': 'Desks',
    //         'quantity': 100,
    //         'room': 'UB401'
    //     },
    //     {
    //         'id': '1',
    //         'name': 'Tablets',
    //         'quantity': 100,
    //         'room': 'UB401'
    //     },
    //     {
    //         'id': '1',
    //         'name': 'Desktops',
    //         'quantity': 100,
    //         'room': 'UB401'
    //     },
    //     {
    //         'id': '1',
    //         'name': 'Laptops',
    //         'quantity': 100,
    //         'room': 'UB401'
    //     },
    // ]

    data = []

    const call = await fetch(`${link}/item`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
    ).then((response) => response.json())
        .then((rdata) => {
            data = rdata;
        })
        .catch((error) => {
            console.log(error);
        });

    output = ``;

    data.forEach(product => {

        output += `
            <div id=${product.id} class="row center-align" style="margin: 1rem 0rem 1rem;">
            <span class="col l2">Prod_${product.id}</span>
            <span class="col l4">${product.name}</span>
            <span class="col l2">${product.quantity}</span>
            <span class="col l2">${product.room}</span>
            <span class="col l2">
                <a href="#edit-modal"
                    class="btn-floating btn-small blue modal-trigger waves-effect waves-light z-depth-0">
                    <i id="edit_btn" class="material-icons">mode_edit</i>
                </a>
                <a class="btn-floating btn-small red waves-effect waves-light z-depth-0">
                    <i id="delete_btn" class="material-icons">delete</i>
                </a>
            </span>
        </div>
        <hr style="width: 98%;">
            `
    });

    if (output == ``) {
        output = `<div id="no-prod" class="grey-text" style="padding-left: 25rem;margin-top: 10rem;font-size: 2.5rem;"><i>Inventory empty</i></div>`
    }

    prod_table.innerHTML = output;

    function openEditModal(id, name, quantity, room) {
        const edit_form = document.getElementById("edit-product-form")
        edit_form.children[0].children[0].value = id;
        edit_form.children[1].children[0].value = name;
        edit_form.children[2].children[0].value = quantity;
        edit_form.children[3].children[0].value = room;
        M.updateTextFields();
    }

    async function addProduct(name, quantity, room) {
        console.log(name, quantity, room)

        const product = {
            "name": name,
            "quantity": parseInt(quantity),
            "room": parseInt(room)
        }

        const call = await fetch(
            `${link}/item/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            }
        ).then((response) => {
            response.json()
        })
            .then((rdata) => {
                console.log(rdata);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function updateProduct(id, name, quantity, room) {
        console.log(id, name, quantity, room)

        const product = {
            "id": parseInt(id),
            "name": name,
            "quantity": parseInt(quantity),
            "room": parseInt(room)
        }

        const call = await fetch(
            `${link}/item/edit`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            }
        ).then((response) => {
            response.json()
        })
            .then((rdata) => {
                console.log(rdata);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    async function deleteProduct(id) {
        console.log(id)

        const call = await fetch(
            `${link}/item/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 'id': parseInt(id) })
            }
        ).then((response) => {
            response.json()
        })
            .then((rdata) => {
                console.log(rdata);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const search_bar = document.querySelector("#search")
    search_bar.addEventListener('keyup', () => {
        const term = search_bar.value.toLowerCase();

        output = ``

        data.forEach(product => {
            const name = product.name;
            if (name.toLowerCase().indexOf(term) != -1) {
                output += `
                    <div id=${product.id} class="row center-align" style="margin: 1rem 0rem 1rem;">
                    <span class="col l2">Prod_${product.id}</span>
                    <span class="col l4">${product.name}</span>
                    <span class="col l2">${product.quantity}</span>
                    <span class="col l2">${product.room}</span>
                    <span class="col l2">
                        <a href="#edit-modal"
                            class="btn-floating btn-small blue modal-trigger waves-effect waves-light z-depth-0">
                            <i id="edit_btn" class="material-icons">mode_edit</i>
                        </a>
                        <a class="btn-floating btn-small red waves-effect waves-light z-depth-0">
                            <i id="delete_btn" class="material-icons">delete</i>
                        </a>
                    </span>
                </div>
                <hr style="width: 98%;">
                    `
            }
        })

        if (output == ``) {
            output = `<div id="no-prod" class="grey-text" style="padding-left: 25rem;margin-top: 10rem;font-size: 2.5rem;"><i>No products found</i></div>`
        }
        prod_table.innerHTML = output;
    })

    document.querySelector("#logout-btn").addEventListener('click', e => {
        sessionStorage.name = '';
        window.location.href = '/login.html';
    })

    document.addEventListener('click', (e) => {
        // e.preventDefault();

        if (e.target && e.target.id == "edit_btn") {
            const product = e.target.parentNode.parentNode.parentNode;
            const p_id = product.children[0].innerHTML;
            const p_name = product.children[1].innerHTML;
            const p_qty = product.children[2].innerHTML;
            const p_room = product.children[3].innerHTML

            openEditModal(p_id, p_name, p_qty, p_room);
        }

        if (e.target && e.target.id == "update-btn") {
            const edit_form = document.getElementById("edit-product-form")
            var id = edit_form.children[0].children[0].value
            id = id.substring(5)
            const name = edit_form.children[1].children[0].value
            const quantity = edit_form.children[2].children[0].value
            const room = edit_form.children[3].children[0].value

            updateProduct(id, name, quantity, room)
        }

        if (e.target && e.target.id == "delete_btn") {
            const product_id = e.target.parentNode.parentNode.parentNode.id;

            deleteProduct(product_id);
        }

        if (e.target && e.target.id == "add_btn") {
            const add_form = document.getElementById("add-product-form");
            const name = add_form.children[0].children[0].value;
            const quantity = add_form.children[1].children[0].value;
            const room = add_form.children[2].children[0].value;
            addProduct(name, quantity, room);
        }

    })

})
