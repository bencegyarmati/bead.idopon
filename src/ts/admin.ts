// Exportált függvények
export function jelenitsdMegAdminFeluletet(): void {
    const adminElem = document.querySelector("#adminfelulet") as HTMLElement;

    if (!adminElem) {
        console.error("Az admin felület elem nem található!");
        return;
    }

    const foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    const fodraszok = JSON.parse(localStorage.getItem("fodraszok") || "[]");

    const foglalasokCsoportositva: { [key: string]: string[] } = {};
    fodraszok.forEach((fodrasz: { nev: string }) => {
        foglalasokCsoportositva[fodrasz.nev] = foglalasok
            .filter(
                (foglalas: { fodrasz: string; idopont: string }) =>
                    foglalas.fodrasz === fodrasz.nev
            )
            .map((foglalas: { fodrasz: string; idopont: string }) => foglalas.idopont);
    });

    adminElem.innerHTML = `
        <h2>Foglalások adminisztrációja</h2>
        ${Object.entries(foglalasokCsoportositva)
            .map(
                ([fodraszNev, idopontok]) => `
                <div class="admin-fodrasz">
                    <h3>${fodraszNev}</h3>
                    ${
                        idopontok.length > 0
                            ? `<ul>${idopontok
                                  .map(
                                      idopont =>
                                          `<li>${idopont} <button onclick="toroldFoglalas('${fodraszNev}', '${idopont}')">Törlés</button></li>`
                                  )
                                  .join("")}</ul>`
                            : "<p>Nincsenek foglalások.</p>"
                    }
                </div>
            `
            )
            .join("")}
    `;
}

export function toroldFoglalas(fodraszNev: string, idopont: string): void {
    let foglalasok = JSON.parse(localStorage.getItem("foglalasok") || "[]");
    foglalasok = foglalasok.filter(
        (foglalas: { fodrasz: string; idopont: string }) =>
            !(foglalas.fodrasz === fodraszNev && foglalas.idopont === idopont)
    );
    localStorage.setItem("foglalasok", JSON.stringify(foglalasok));
    jelenitsdMegAdminFeluletet();
}
