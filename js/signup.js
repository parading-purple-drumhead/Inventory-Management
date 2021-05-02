document.addEventListener("DOMContentLoaded", () => {

    async function signupUser() {

        const form = document.querySelector("#signup");

        const userDetails = {
            "name": form['name'].value,
            "email": form['s-email'].value,
            "password": form['s-password'].value
        }

        console.log(userDetails)

        const call = await fetch(
            `${link}/user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            }
        )

        response = await call.json()

        window.location.href = '/login.html'

    }

    document.querySelector("#signup-btn").addEventListener('click', (e) => {
        signupUser();
    })
})