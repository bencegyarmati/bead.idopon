// Adminfelület megjelenítése
export function jelenitsdMegAdminFeluletet() {
    const adminElem = document.querySelector("#adminfelulet");
    if (!adminElem) {
        console.error("Az admin felület elem nem található!");
        return;
    }
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    const fodraszok = JSON.parse(localStorage.getItem("fodraszok") || "[]");
    const foglalasokCsoportositva = {};
    fodraszok.forEach((fodrasz) => {
        foglalasokCsoportositva[fodrasz.nev] = foglalasok
            .filter((foglalas) => foglalas.fodrasz === fodrasz.nev)
            .map((foglalas) => foglalas.idopont);
    });
    adminElem.innerHTML = `
        <h2>Foglalások adminisztrációja</h2>
        ${Object.entries(foglalasokCsoportositva)
        .map(([fodraszNev, idopontok]) => `
                    <div class="admin-fodrasz">
                        <h3>${fodraszNev}</h3>
                        ${idopontok.length > 0
        ? `<ul>${idopontok
            .map(idopont => `<li>${idopont} <button onclick="toroldFoglalas('${fodraszNev}', '${idopont}')">Törlés</button></li>`)
            .join("")}</ul>`
        : "<p>Nincsenek foglalások.</p>"}
                    </div>
                `)
        .join("")}
        <button id="visszaFooldalra">Vissza a főoldalra</button>
    `;
}
// Foglalás törlése
export function toroldFoglalas(fodraszNev, idopont) {
    let foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    foglalasok = foglalasok.filter((foglalas) => !(foglalas.fodrasz === fodraszNev && foglalas.idopont === idopont));
    localStorage.setItem("foglalasok", JSON.stringify(foglalasok));
    jelenitsdMegAdminFeluletet();
}
// Visszatérés a főoldalra
document.addEventListener("DOMContentLoaded", () => {
    const visszaGomb = document.getElementById("visszaFooldalra");
    if (visszaGomb) {
        visszaGomb.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
    jelenitsdMegAdminFeluletet();
});
