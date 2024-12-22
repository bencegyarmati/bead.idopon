"use strict";
// Példa fodrász adatok
const fodraszok = [
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
    });
    // Dinamikus eseménykezelők hozzáadása
    const gombok = document.querySelectorAll(".foglalas-gomb");
    gombok.forEach(gomb => {
        gomb.addEventListener("click", (event) => {
            const target = event.currentTarget;
            const fodraszNev = target.getAttribute("data-fodrasz");
            const fodrasz = fodraszok.find(f => f.nev === fodraszNev);
            if (fodrasz) {
                megjelenitIdopontFoglalas(fodrasz);
            }
        });
    });
}
// Időpontfoglalás felület megjelenítése
function megjelenitIdopontFoglalas(fodrasz) {
    const mainElem = document.querySelector("main");
    if (!mainElem) {
        console.error("A main elem nem található!");
        return;
    }
    const szabadIdopontok = fodrasz.idopontok.filter(idopont => !idopontFoglalt(fodrasz.nev, idopont));
    mainElem.innerHTML = `
        <section id="idopontfoglalas">
            <h2>${fodrasz.nev} időpontfoglalás</h2>
            <p>${fodrasz.leiras}</p>
            <ul>
                ${szabadIdopontok.length > 0
        ? szabadIdopontok
            .map(idopont => `
                            <li>
                                <button class="foglalas-idopont-gomb" data-idopont="${idopont}">${idopont}</button>
                            </li>
                        `)
            .join("")
        : "<li>Nincsenek elérhető időpontok.</li>"}
            </ul>
            <button id="vissza-gomb">Vissza</button>
        </section>
    `;
    // Eseménykezelő hozzáadása az időpont gombokhoz
    const idopontGombok = document.querySelectorAll(".foglalas-idopont-gomb");
    idopontGombok.forEach(gomb => {
        gomb.addEventListener("click", (event) => {
            const target = event.currentTarget;
            const idopont = target.getAttribute("data-idopont");
            if (idopont) {
                foglalIdopont(fodrasz.nev, idopont);
            }
        });
    });
    // Vissza gomb kezelése
    const visszaGomb = document.getElementById("vissza-gomb");
    if (visszaGomb) {
        visszaGomb.addEventListener("click", vissza);
    }
}
// Időpont foglalása
function foglalIdopont(fodraszNev, idopont) {
    if (idopontFoglalt(fodraszNev, idopont)) {
        alert(`Ez az időpont már foglalt: ${idopont}`);
        return;
    }
    mentsIdopont(fodraszNev, idopont);
    alert(`${fodraszNev} számára lefoglalt időpont: ${idopont}`);
    vissza();
}
// Ellenőrzés, hogy egy időpont foglalt-e
function idopontFoglalt(fodraszNev, idopont) {
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    return foglalasok.some((foglalas) => foglalas.fodrasz === fodraszNev && foglalas.idopont === idopont);
}
// Foglalások mentése
function mentsIdopont(fodraszNev, idopont) {
    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    foglalasok.push({ fodrasz: fodraszNev, idopont });
    localStorage.setItem("foglalasok", JSON.stringify(foglalasok));
}
// Visszatérés a főoldalra
function vissza() {
    const mainElem = document.querySelector("main");
    mainElem.innerHTML = `
        <section id="fodraszok">
            <h2>Válassz fodrászt!</h2>
            <div class="fodrasz-lista"></div>
        </section>
    `;
    jelenitsdMegFodraszokat();
}
// Oldal betöltésekor a főoldal megjelenítése
document.addEventListener("DOMContentLoaded", vissza);
