link = 'http://269526632c51.ngrok.io';

document.addEventListener("DOMContentLoaded", () => {

    async function loginUser() {

        const form = document.querySelector("#login-form");

        const userDetails = {
            "email": form['l-email'].value,
            "password": form['l-password'].value
        }

        console.log(userDetails)

        const call = await fetch(`${link}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        })

        const response = await call.json()


        if (response['message']){
            console.log(response['message'])
            document.querySelector("#error").textContent = "Email/password incorrect";
        }
        else{
            console.log(response)
            
            sessionStorage.name = response.name;         
            
            window.location.href = '/index.html';
        }

    }

    document.querySelector("#login-btn").addEventListener('click', (e) => {
        loginUser();
    })
})