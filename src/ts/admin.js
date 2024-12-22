const fodraszok = JSON.parse(localStorage.getItem("fodraszok") || "[]");
export function jelenitsdMegAdminFeluletet() {
    const adminElem = document.querySelector("#adminfelulet");
    if (!adminElem) {
        console.error("Az admin felület elem nem található!");
        return;
    }
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
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
            .map(idopont => `
                                            <li>
                                                ${idopont}
                                                <button class="torles-gomb" data-fodrasz="${fodraszNev}" data-idopont="${idopont}">Törlés</button>
                                            </li>`)
            .join("")}</ul>`
        : "<p>Nincsenek foglalások.</p>"}
                    </div>
                `)
        .join("")}
        <button id="visszaFooldalra">Vissza a főoldalra</button>
    `;
    document.querySelectorAll(".torles-gomb").forEach(gomb => gomb.addEventListener("click", (event) => {
        const target = event.currentTarget;
        const fodraszNev = target.getAttribute("data-fodrasz");
        const idopont = target.getAttribute("data-idopont");
        if (fodraszNev && idopont)
            toroldFoglalas(fodraszNev, idopont);
    }));
    const visszaGomb = document.getElementById("visszaFooldalra");
    visszaGomb?.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
function toroldFoglalas(fodraszNev, idopont) {
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    const ujFoglalasok = foglalasok.filter((foglalas) => !(foglalas.fodrasz === fodraszNev && foglalas.idopont === idopont));
    localStorage.setItem("foglalasok", JSON.stringify(ujFoglalasok));
    alert(`Foglalás törölve: ${fodraszNev}, ${idopont}`);
    jelenitsdMegAdminFeluletet();
}
// Oldal betöltésekor az admin felület megjelenítése
document.addEventListener("DOMContentLoaded", jelenitsdMegAdminFeluletet);
