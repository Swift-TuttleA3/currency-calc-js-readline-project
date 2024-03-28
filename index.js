/*    
  Projekt Währungsumrechner

  Die Kommentare wurden in die Datei dokumentation_GER.md im Ordner documentation verschoben, um den Code übersichtlicher zu gestalten.
  
  Der Code ist in Abschnitte unterteilt und durchgehend numeriert und verweist auf die entsprechenden Stellen in der Dokumentation.

  Bitte beachten Sie, dass dieser Code nur eine einfache Demonstration der Funktionalität eines Währungsumrechners ist
  und nicht für den produktiven Einsatz gedacht ist. Der Code wurde im Rahmen eines Projektes des dci erstellt.

Start der Anwendung: node index.js

  The comments have been moved to the file documentation_GER.md in the documentation folder to make the code more organized. The code is divided into sections and consistently numbered, referring to the corresponding locations in the documentation.

  Please note that this code is only a simple demonstration of a currency converter’s functionality and is not intended for production use. The code was created as part of a project at DCI.

To start the application: node index.js
*/

// I. Initialisierung der readLine-Schnittstelle.
console.clear();
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// II. Objekt mit den Wechselkursen.

const wechselkurse = {
  EUR: 1,
  USD: 0.9,
  GBP: 1.2,
  ALL: 103.38,
  AMD: 432.46,
  AZN: 1.8517,
  GBP: 0.8617,
  BGN: 1.9652,
  DKK: 7.4932,
  GEL: 2.9318,
  ISK: 149.62,
  HRK: 7.5698,
  MKD: 61.508,
  MDL: 19.198,
  NOK: 11.679,
  PLN: 4.341,
  RON: 4.995,
  RUB: 100.04,
  SEK: 11.475,
  CHF: 0.975,
  RSD: 117.76,
  CZK: 25.467,
  TRY: 34.755,
  UAH: 42.345,
  HUF: 399.5,
  BYN: 3.5197,
};

// III. Funktion um den Betrag in die Basiswährung umzurechnen

const umrechnen = (betrag, ausgangsWaehrung, zielWaehrung) => {
  const betragInEuro = betrag / wechselkurse[ausgangsWaehrung];
  return betragInEuro * wechselkurse[zielWaehrung];
};

// IV. Callbackfunktion um zu prüfen ob der Betrag eine gültige Zahl ist

function onlyValidNumber(input) {
  var regex = /^[0-9]*\.?[0-9]+$/;
  return regex.test(input) && parseFloat(input) > 0;
}

// V. Funktion zur Abfrage des Betrages

const frageNachBetrag = () => {
  readline.question(
    "Bitte gib den Betrag als positive Zahl zwischen 0 und 9 ein: ",
    (betrag) => {
      if (!onlyValidNumber(betrag)) {
        console.log(
          "Das ist keine gültige Eingabe. Achte u.U. darauf einen Punkt und kein Komma zu setzen. Möchtest du es erneut versuchen? (ja/nein)"
        );
        readline.question("", (antwort) => {
          if (antwort.toLowerCase() === "ja") {
            frageNachBetrag();
          } else {
            readline.close();
          }
        });
      } else {
        frageNachWaehrung(parseFloat(betrag));
      }
    }
  );
};

// VI. Funktion zur Abfrage der Ausgangwährung

const frageNachWaehrung = (betragAlsZahl) => {
  const waehrungenFrage = Object.keys(wechselkurse).join(", ");
  readline.question(
    `Bitte gib die gewünschte Zielwährung als Kürzel ein.\nVerfügbare Währungen sind:\n${waehrungenFrage}\n`,
    (ausgangsWaehrung) => {
      if (typeof ausgangsWaehrung !== "string") {
        console.log(
          "Ungültige Eingabe. Bitte gib die Ausgangswährung als Kürzel ein."
        );
        frageNachWaehrung(betragAlsZahl);
      } else {
        ausgangsWaehrung = ausgangsWaehrung.toUpperCase();
        if (!wechselkurse[ausgangsWaehrung]) {
          console.log(
            "Diese Ausgangswährung wird nicht unterstützt. Möchtest du es erneut versuchen? (ja/nein)"
          );
          readline.question("", (antwort) => {
            if (antwort.toLowerCase() === "ja") {
              frageNachWaehrung(betragAlsZahl);
            } else {
              readline.close();
            }
          });
        } else {
          frageNachZielWaehrung(betragAlsZahl, ausgangsWaehrung);
        }
      }
    }
  );
};
// VII. Funktion zur Abfrage der Zielwährung

const frageNachZielWaehrung = (betragAlsZahl, ausgangsWaehrung) => {
  const waehrungenZiel = Object.keys(wechselkurse).join(", ");
  readline.question(
    `Bitte gib die gewünschte Zielwährung als Kürzel ein.\nVerfügbare Währungen sind:\n${waehrungenZiel}\n`,
    (zielWaehrung) => {
      zielWaehrung = zielWaehrung.toUpperCase();
      if (!wechselkurse[zielWaehrung]) {
        console.log(
          "Diese Zielwährung wird nicht unterstützt. Möchtest du es erneut versuchen? (ja/nein)"
        );
        readline.question("", (antwort) => {
          if (antwort.toLowerCase() === "ja") {
            frageNachZielWaehrung(betragAlsZahl, ausgangsWaehrung);
          } else {
            readline.close();
          }
        });
      } else {
        const umgerechneterBetrag = umrechnen(
          betragAlsZahl,
          ausgangsWaehrung,
          zielWaehrung
        );
        console.log(
          `Der umgerechnete Betrag ist: ${umgerechneterBetrag} ${zielWaehrung}`
        );
      }
    }
  );
};

// VIII. Start der Anwendung durch Funktionsaufruf ohne Parameter

frageNachBetrag();
