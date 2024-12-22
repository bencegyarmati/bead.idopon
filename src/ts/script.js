// Fodrászok adatok
export const fodraszok = [
    {
        nev: "Fodrász Fruzsi",
        leiras: "Immár 10 éve a szakmában. Kedvenc technikám a balayage!",
        kep: "./res/img/fodrasz1.jpg",
        idopontok: ["10:00", "11:00", "13:00", "14:00"]
    },
    {
        nev: "Illés Noémi",
        leiras: "Szépséget varázsolok hajadnak, szeretettel várlak!",
        kep: "./res/img/fodrasz2.jpg",
        idopontok: ["09:30", "10:30", "12:00", "15:30"]
    }
];
// Fodrászok adatok mentése a localStorage-ba
if (!localStorage.getItem("fodraszok")) {
    localStorage.setItem("fodraszok", JSON.stringify(fodraszok));
}
// Fodrászok megjelenítése a főoldalon
function jelenitsdMegFodraszokat() {
    const fodraszListaElem = document.querySelector(".fodrasz-lista");
    if (!fodraszListaElem) {
        console.error("A fodrasz-lista elem nem található!");
        return;
    }
    fodraszListaElem.innerHTML = ""; // Töröljük az előző tartalmat
    fodraszok.forEach(fodrasz => {
        const fodraszBox = document.createElement("div");
        fodraszBox.className = "fodrasz-box";
        fodraszBox.innerHTML = `
            <img src="${fodrasz.kep}" alt="${fodrasz.nev}">
            <h3>${fodrasz.nev}</h3>
            <p>${fodrasz.leiras}</p>
            <button class="foglalas-gomb" data-fodrasz="${fodrasz.nev}">Időpontfoglalás</button>
        `;
        fodraszListaElem.appendChild(fodraszBox);
        fodraszBox.querySelector("button").addEventListener("click", () => {
            megjelenitIdopontFoglalas(fodrasz);
        });
    });
}
// Időpontfoglalás megjelenítése
function megjelenitIdopontFoglalas(fodrasz) {
    const mainElem = document.querySelector("main");
    const szabadIdopontok = fodrasz.idopontok.filter(idopont => !idopontFoglalt(fodrasz.nev, idopont));
    mainElem.innerHTML = `
        <section id="idopontfoglalas">
            <h2>${fodrasz.nev} időpontfoglalás</h2>
            <ul>
                ${szabadIdopontok
        .map(idopont => `
                        <li>
                            <button class="idopont-gomb" data-idopont="${idopont}">${idopont}</button>
                        </li>`)
        .join("")}
            </ul>
            <button id="vissza-gomb">Vissza</button>
        </section>
    `;
    document.querySelectorAll(".idopont-gomb").forEach(gomb => gomb.addEventListener("click", (event) => {
        const target = event.currentTarget;
        const idopont = target.getAttribute("data-idopont");
        if (idopont)
            foglalIdopont(fodrasz.nev, idopont);
    }));
    const visszaGomb = document.getElementById("vissza-gomb");
    visszaGomb?.addEventListener("click", vissza);
}
// Foglalás kezelése
function foglalIdopont(fodraszNev, idopont) {
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    foglalasok.push({ fodrasz: fodraszNev, idopont });
    localStorage.setItem("foglalasok", JSON.stringify(foglalasok));
    alert(`Foglalás mentve: ${fodraszNev} - ${idopont}`);
    vissza();
}
// Ellenőrzés, hogy egy időpont foglalt-e
function idopontFoglalt(fodraszNev, idopont) {
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    return foglalasok.some((foglalas) => foglalas.fodrasz === fodraszNev && foglalas.idopont === idopont);
}
// Főoldal visszatérése
function vissza() {
    const mainElem = document.querySelector("main");
    mainElem.innerHTML = `<section id="fodraszok"><div class="fodrasz-lista"></div></section>`;
    jelenitsdMegFodraszokat();
}
// Oldal betöltésekor a főoldal megjelenítése
document.addEventListener("DOMContentLoaded", vissza);
