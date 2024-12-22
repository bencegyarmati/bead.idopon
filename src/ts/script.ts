
// Fodrász interfész
interface Fodrasz {
    nev: string;
    leiras: string;
    kep: string;
    idopontok: string[];
}

// Példa fodrász adatok
const fodraszok: Fodrasz[] = [
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
function jelenitsdMegFodraszokat(): void {
    const fodraszListaElem = document.querySelector(".fodrasz-lista") as HTMLElement;

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

        // Eseménykezelő hozzáadása
        fodraszBox.querySelector("button")!.addEventListener("click", () => {
            megjelenitIdopontFoglalas(fodrasz);
        });
    });
}

        // Eseménykezelő hozzáadása
        function megjelenitIdopontFoglalas(fodrasz: Fodrasz): void {
            const mainElem = document.querySelector("main") as HTMLElement;
        
            if (!mainElem) {
                console.error("A main elem nem található!");
                return;
            }
        
            const szabadIdopontok = fodrasz.idopontok.filter(
                idopont => !idopontFoglalt(fodrasz.nev, idopont)
            );
        
            mainElem.innerHTML = `
                <section id="idopontfoglalas">
                    <h2>${fodrasz.nev} időpontfoglalás</h2>
                    <p>${fodrasz.leiras}</p>
                    <ul>
                        ${
                            szabadIdopontok.length > 0
                                ? szabadIdopontok
                                      .map(
                                          idopont => `
                                    <li>
                                        <button class="foglalas-idopont-gomb" data-idopont="${idopont}">${idopont}</button>
                                    </li>
                                `
                                      )
                                      .join("")
                                : "<li>Nincsenek elérhető időpontok.</li>"
                        }
                    </ul>
                    <button id="vissza-gomb">Vissza</button>
                </section>
            `;
        
            // Eseménykezelő hozzáadása az időpont gombokhoz
            const idopontGombok = document.querySelectorAll(".foglalas-idopont-gomb");
            idopontGombok.forEach(gomb => {
                gomb.addEventListener("click", (event) => {
                    const target = event.currentTarget as HTMLButtonElement;
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
        

// Ellenőrzi, hogy az adott időpont foglalt-e
function idopontFoglalt(fodraszNev: string, idopont: string): boolean {
    // Itt kellene implementálni az időpont foglaltságának ellenőrzését
    // Például ellenőrizheti egy adatbázisban vagy egy tömbben
    return false; // Például mindig szabadnak jelzi az időpontokat
}

// Foglalja az adott időpontot a megadott fodrászhoz
function foglalIdopont(fodraszNev: string, idopont: string): void {
    // Itt kellene implementálni az időpont foglalását
    // Például hozzáadhatja egy adatbázishoz vagy egy tömbhöz
    console.log(`Időpont foglalva: ${fodraszNev} - ${idopont}`);
}

// Visszatérés a főoldalra
function vissza(): void {
    const mainElem = document.querySelector("main") as HTMLElement;

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
