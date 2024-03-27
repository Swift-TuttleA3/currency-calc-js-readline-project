/*
  Initialisierung der readLine-Schnittstelle. Dazu installiere und importiere ich das Modul readline-sync
  um es in unserem Projekt zu verwenden.
  Es ermöglicht es, Benutzereingaben im Terminal zu lesen und zu verarbeiten. Etwas, was 
  wir in unserem Währungsumrechner benötigen, Javascript aber nicht von Haus aus mitbringt.
 
  
  readline ist ein Objekt, das eine Schnittstelle zum Lesen von Daten aus einem Input-Stream (hier: process.stdin) bereitstellt.
  createInterface ist die entsprechende Methode, die ein readline.Interface-Objekt erstellt.
  Dieses Interface-Objekt wird verwendet, um Benutzereingaben zu lesen, speichern und zu verarbeiten.
  Es wird mit zwei Eigenschaften initialisiert: input und output.
  Dieese greifen auf die Methode stdin und stdout des process-Objekts zu, um Daten zu lesen und zu schreiben.
  stdin = Standard-Input-Stream, stdout = Standard-Output-Stream
  Dieser Stream wird quasi abgefangen und in die readline-Schnittstelle geleitet.
  */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

/*
Wir haben bewusst auf eine dynamische Abfrage verzichtet, um die Komplexität des Programms zu reduzieren
und nur die im Unterricht erlernten Konzepte zu verwenden. 
Es ist jedoch unser Ziel diesen Code in Zukunft zu erweitern und zu verbessern. Dazu zählt auch
die Implementierung einer dynamischen Abfrage, die es dem Benutzer ermöglicht, tagesaktuelle Wechselkurse abzufragen.
Dies würde dann über eine API(Aplication Programming Interface) realisiert werden und erfordert zusätzliche Kenntnisse
über APIs, json, fetch, promises und asynchrones Programmieren. Zumindest nach unserer Recherche.

Der Code stellt also eine feature-reduzierte Version dar, die trotzdem die Grundfunktionen eines Währungsumrechners
mitbringt und auch die Implementierung von Funktionen wie Fehlerbehandlung/Validierung und Benutzerinteraktion
im Terminal demonstriert.

Im Sinne einer statischen Funktionalität haben wir uns nachfolgend für eine feste Liste von Währungen und Wechselkursen entschieden.
Diese sind alle in einem Objekt gespeichert, das als Konstante deklariert wurde. (Die Währungen köönen
also in Zukunft nicht dynamisch hinzugefügt oder entfernt werden. Allerdings ist ein Update der Kurse möglich. 
Eine kleine Funktion um entsprechende Kurse über die Einbindung einer Textdatei zu aktualisieren sähe so aus:

      const fs = require('fs'); // File System Modul - ermöglicht das Lesen und Schreiben von Dateien

      const updateKurse = () => {
        const wechselkurse = JSON.parse(fs.readFileSync('kurse.json')); // JSON.parse wandelt den Inhalt der Datei in ein Objekt um
        return wechselkurse;                                            // fs.readFileSync liest den Inhalt der Datei aus
      }                                                                 // und gibt ihn als String zurück und wird dann in ein Objekt umgewandelt.

Diese Funktion würde also die Kurse aus einer Textdatei namens 'kurse.json' lesen und in das Objekt wechselkurse speichern.

!!!!!Diese Funktion ist nur ein Beispiel, erstellt von CoPilot und nicht in unserem Code implementiert.!!!!!

(zu Demonstrationszwecken könnte man den aktuellen Kurs auch per Parameter an die Funktion übergeben und so die Kurse aktualisieren.
  Diese könnten sogar mit dem Aufruf von node index.js und der Übergabe als Argument aktualisiert werden.
  Macht nur nicht so viel Sinn?!)
*/

  const wechselkurse = {
    'EUR': 1,       // Basiswährung ist der Euro. Das ist notwendig wenn wir dem Nutzer erlauben wollen, von jeder Währung in jede andere zu konvertieren.
    'USD': 0.9,     // Weiter unten werden wir den Betrag in Euro umrechnen und dann in die Zielwährung konvertieren.
    'GBP': 1.2,     // Die Umrechnung erfolgt also immer in zwei Schritten weil Wechselkurse prinzipiell nur in Bezug auf eine ausgesuchte Währung gelten.
    'ALL': 103.38,  
    'AMD': 432.46,
    'AZN': 1.8517,
    'GBP': 0.8617,
    'BGN': 1.9652,
    'DKK': 7.4932,
    'GEL': 2.9318,
    'ISK': 149.62,
    'HRK': 7.5698,
    'MKD': 61.508,
    'MDL': 19.198,
    'NOK': 11.679,
    'PLN': 4.341,
    'RON': 4.995,
    'RUB': 100.04,
    'SEK': 11.475,
    'CHF': 0.975,
    'RSD': 117.76,
    'CZK': 25.467,
    'TRY': 34.755,
    'UAH': 42.345,
    'HUF': 399.50,
    'BYN': 3.5197
  };
      // Bei Erstellung dieses Objektes wurde CoPilot verwendet um eine Textdatei 
      // mit den aktuellen Kursen in das Objekt zu konvertieren und die Währungen zu sortieren.


  const umrechnen = (betrag, ausgangsWaehrung, zielWaehrung) => { // Funktion um den Betrag umzurechnen
    const betragInEuro = betrag / wechselkurse[ausgangsWaehrung]; // Umrechnung in Euro. Wir teilen den Betrag durch den Wechselkurs der Ausgangswährung und erhalten den Betrag in Euro.
    return betragInEuro * wechselkurse[zielWaehrung];             // Umrechnung in Zielwährung. Wechselkurse können ganz simpel multipliziert werden.
  };
  
  //const onlyPositiveNumber = (betrag) => {              // Funktion um zu prüfen ob der Betrag eine gültige Zahl ist
  //  return !isNaN(betrag) && parseFloat(betrag) > 0;    // isNaN prüft ob der Wert eine Zahl ist. parseFloat wandelt den Wert ANSCHLIEßEND! in eine Zahl um.
  //};
  function onlyPositiveNumberCoPi(input) {
    var regex = /^[0-9]*\.?[0-9]+$/;
    return regex.test(input) && parseFloat(input) > 0; }; 

                                                          //eine weitere Möglichkeit die Funktion zu schreiben:
                                                          //regex = regular expression = regulärer Ausdruck = Dieser Regex ^[0-9]*\.?[0-9]+$ stellt sicher, dass die Eingabe nur aus Ziffern besteht und optional einen Punkt für Dezimalzahlen enthalten kann.
                                                          //die Methode test() des Objektes regex prüft, ob ein String zu einem bestimmten regulären Ausdruck passt.
                                                          //Wenn der Wert eine Zahl ist und größer als 0, wird true zurückgegeben.
                                                          //Eine falsche Eingabe wie z.Bsp. 2e3 wird jetzt nicht mehr als gültig erkannt weil wir mit regex festgelegt haben, dass nur Zahlen erlaubt sind.
                                                          //Es ist aber auch verwirrend, dass z.Bsp. der Ausdruck "2e3" für ( 2 \times 10^3 ) steht, was 2000 entspricht, und somit eine gültige Darstellung einer positiven Zahl in JavaScript.
                                                          //Deshalb wird er auch von isNaN() als Zahl erkannt.
//------------------------------------------------------------------------------------------------------------------------------------------------                                                        
                                                        //  !!!!!!Diese Variante wurde unter Zuhilfenahme von CoPilot erstellt!!!!!!!!
                                                        /*
                                                        Der reguläre Ausdruck `^[0-9]*\.?[0-9]+$` hat folgende Bedeutung:                                                       

- `^`: Dies ist der Anfangsanker, der sicherstellt, dass die Überprüfung am Anfang der Zeichenkette beginnt.
- `[0-9]`: Diese Klammern definieren eine Zeichenklasse, die jedes einzelne Zeichen zwischen 0 und 9 (also jede Ziffer) akzeptiert.
- `*`: Dieser Stern bedeutet, dass das vorherige Element (in diesem Fall die Ziffern von 0 bis 9) null- oder mehrmals vorkommen kann.
- `\.?`: Der Punkt steht für ein Dezimaltrennzeichen. Das Fragezeichen bedeutet, dass das vorherige Element (der Punkt) optional ist, also null- oder einmal vorkommen kann.
- `[0-9]+`: Das Pluszeichen bedeutet, dass das vorherige Element (wieder die Ziffern von 0 bis 9) mindestens einmal vorkommen muss.
- `$`: Dies ist der Endanker, der sicherstellt, dass die Überprüfung am Ende der Zeichenkette endet.

Zusammengefasst prüft dieser reguläre Ausdruck, ob die Eingabe:
- Mit einer Ziffer beginnt (kann aber auch mit einem Punkt beginnen, wenn direkt danach eine Ziffer folgt).
- Keine, eine oder mehrere Ziffern vor einem optionalen Punkt hat.
- Einen optionalen Punkt hat, gefolgt von mindestens einer Ziffer.
- Mit einer Ziffer endet und keine weiteren Zeichen nach der letzten Ziffer hat.

Dieser Ausdruck schließt somit Zeichenketten aus, die nicht ausschließlich aus Ziffern und höchstens einem Punkt bestehen, und verhindert Formate wie die exponentielle Notation.

-------------------------------------------------------------------------------------------------------------------------

Drei Funktionen um den Benutzer nach Betrag und Währung zu fragen:
  
1. frageNachBetrag()

  Die Funktion frageNachBetrag fragt den Benutzer nach dem Betrag und prüft, ob es sich um eine gültige Zahl handelt.
    WENN NICHT, wird der Benutzer gefragt, ob er es erneut versuchen möchte.
      WENN JA, wird die Funktion frageNachBetrag erneut aufgerufen.
      WENN NEIN, wird die readline-Schnittstelle geschlossen.

  WENN der Betrag gültig ist, wird der Benutzer nach der Ausgangswährung gefragt.


2. frageNachWaehrung()

  Die Funktion frageNachWaehrung prüft, ob die Ausgangswährung unterstützt wird; SPRICH ob sie im Objekt wechselkurse vorhanden ist.
    WENN NICHT, wird der Benutzer gefragt, ob er es erneut versuchen möchte.
      WENN JA, wird die Funktion frageNachWaehrung erneut aufgerufen.
      WENN NEIN, wird die readline-Schnittstelle geschlossen.

  WENN die Ausgangswährung gültig ist, wird der Benutzer nach der Zielwährung gefragt.


3. frageNachZielWaehrung()

  Die Funktion frageNachZielWaehrung prüft, ob die Zielwährung unterstützt wird.

      WENN NICHT, wird der Benutzer gefragt, ob er es erneut versuchen möchte.
        WENN JA, wird die Funktion frageNachZielWaehrung erneut aufgerufen.
        WENN NEIN, wird die readline-Schnittstelle geschlossen.

  WENN die Zielwährung gültig ist, wird der Betrag mit dem Aufruf der Funktion
  umrechnen umgerechnet, das Ergebnis in der Zielwährung ausgegeben und
  die readline-Schnittstelle geschlossen.
  
  Die Funktion frageNachBetrag wird zu Beginn aufgerufen und startet den Prozess 
  der Benutzerinteraktion. Die Anordnung der Funktionen ist so gewählt, dass sie
  nacheinander aufgerufen werden und die Benutzerinteraktion in einem logischen
  Ablauf erfolgt(siehe auch Anlage flowchart).

*/


const frageNachBetrag = () => {
  readline.question('Bitte gib den Betrag ein: ', (betrag) => {
    if (!onlyPositiveNumberCoPi(betrag)) {
      console.log('Das ist kein gültiger Betrag. Möchtest du es erneut versuchen? (ja/nein)');
      readline.question('', (antwort) => {
        if (antwort.toLowerCase() === 'ja') {
          frageNachBetrag();
        } else {
          readline.close();
        }
      });
    } else {
      frageNachWaehrung(parseFloat(betrag));
    }
  });
};
  
  const frageNachWaehrung = (betragAlsZahl) => {
    readline.question('Bitte gib die Ausgangswährung ein (EUR, USD, GBP, ...): ', (ausgangsWaehrung) => {
      if (!wechselkurse[ausgangsWaehrung]) {
        console.log('Diese Ausgangswährung wird nicht unterstützt. Möchtest du es erneut versuchen? (ja/nein)');
        readline.question('', (antwort) => {
          if (antwort.toLowerCase() === 'ja') {
            frageNachWaehrung(betragAlsZahl);
          } else {
            readline.close();
          }
        });
      } else {
        frageNachZielWaehrung(betragAlsZahl, ausgangsWaehrung);
      }
    });
  };
  
  const frageNachZielWaehrung = (betragAlsZahl, ausgangsWaehrung) => {
    readline.question('Bitte gib die Zielwährung ein (EUR, USD, GBP, ...): ', (zielWaehrung) => {
      if (!wechselkurse[zielWaehrung]) {
        console.log('Diese Zielwährung wird nicht unterstützt. Möchtest du es erneut versuchen? (ja/nein)');
        readline.question('', (antwort) => {
          if (antwort.toLowerCase() === 'ja') {
            frageNachZielWaehrung(betragAlsZahl, ausgangsWaehrung);
          } else {
            readline.close();
          }
        });
      } else {
        const umgerechneterBetrag = umrechnen(betragAlsZahl, ausgangsWaehrung, zielWaehrung);
        console.log(`${betragAlsZahl} ${ausgangsWaehrung} entspricht ${umgerechneterBetrag} ${zielWaehrung}.`);
        readline.close();
      }
    });
  };
  
  frageNachBetrag();
