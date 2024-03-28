# Programmierprojekt: Währungsumrechner

### Start der Anwendung: node index.js

## Funktionsweise der Anwendung:

## I. Initialisierung der readLine-Schnittstelle. 
  Dazu installieren und importieren wir zu Beginn unseres Codes das Modul readline-sync um es in unserem Projekt verwenden zu können.
  Erst dadurch sind wir in der Lage, Benutzereingaben im Terminal zu lesen und zu verarbeiten. Etwas, was wir in einer interaktiven Anwendung benötigen, Javascript aber nicht von Haus aus mitbringt.
  readline ist ein Objekt, das eine Schnittstelle zum Lesen von Daten aus einem Input-Stream bereitstellt.
  createInterface ist die entsprechende Methode, die ein readline.Interface-Objekt erstellt.
  Dieses Interface-Objekt wird verwendet, um Benutzereingaben zu lesen, speichern und zu verarbeiten.
  Es wird mit zwei Eigenschaften initialisiert: input und output.
  Diese greifen auf die Methode stdin und stdout des process-Objekts zu, um Daten zu lesen und zu schreiben.
  (stdin = Standard-Input-Stream, stdout = Standard-Output-Stream)
  Dieser Stream wird abgefangen und in die readline-Schnittstelle geleitet.


## II. Ein Objekt, das die Wechselkurse enthält wird erstellt.

Wir haben bewusst auf eine dynamische Abfrage verzichtet, um die Komplexität des Programms zu reduzieren
und nur die im Unterricht erlernten Konzepte zu verwenden. Es ist jedoch unser Ziel diesen Code in Zukunft zu erweitern und zu verbessern. Dazu zählt auch
die Implementierung einer dynamischen Abfrage, die es dem Benutzer ermöglicht, tagesaktuelle Wechselkurse abzufragen.
Dies würde dann über eine API(Aplication Programming Interface) realisiert werden und erfordert zusätzliche Kenntnisse
über APIs, json, fetch, promises und asynchrones Programmieren. Zumindest nach unserer Recherche.

Der Code stellt also eine feature-reduzierte Version dar, die trotzdem die Grundfunktionen eines Währungsumrechners
mitbringt und auch die Implementierung von Funktionen wie Fehlerbehandlung/Validierung und Benutzerinteraktion
im Terminal demonstriert.

Im Sinne einer statischen Funktionalität haben wir uns für eine feste Liste von Währungen und Wechselkursen entschieden.
Diese sind alle in einem Objekt gespeichert, das als Konstante deklariert wurde. Währungen können
also in Zukunft nicht dynamisch hinzugefügt oder entfernt werden. Allerdings ist ein Update der Kurse möglich. 

Basiswährung ist der Euro. Das ist notwendig wenn wir dem Nutzer erlauben wollen, von jeder Währung in jede andere zu konvertieren.
Weiter unten werden wir den Betrag in Euro umrechnen und dann in die Zielwährung konvertieren.
Die Umrechnung erfolgt also immer in zwei Schritten weil Wechselkurse prinzipiell nur in Bezug auf eine ausgesuchte Währung gelten.

Bei Erstellung dieses Objektes wurde Bing und CoPilot verwendet um eine Textdatei 
mit aktuellen Wechselkursen in den Code zu übersetzen. Dies stellt aus unserer Sicht eine legitime und effektive Nutzung des Kopiloten dar.


## III. Funktion um den Betrag in die Basiswährung umzurechnen

Umrechnung in Euro. Wir teilen den Betrag durch den Wechselkurs der Ausgangswährung und erhalten den Betrag in Euro.

Umrechnung in Zielwährung. Wechselkurse können ganz simpel multipliziert werden.


## IV. Funktion um zu prüfen ob der Betrag eine gültige Zahl ist

eine Möglichkeit die Funktion zu schreiben:
regex = regular expressions = regulärer Ausdrücke = Dieser Regex(regular expression) ^[0-9]*\.?[0-9]+$ stellt sicher, dass die Eingabe nur aus Ziffern besteht und optional einen einzelnen Punkt für Dezimalzahlen enthalten kann.
die Methode test() des Objektes regex prüft, ob ein String zu dem von aus definierten regulären Ausdruck passt.
Wenn der Wert eine Zahl ist und größer als 0, wird true zurückgegeben. Eine falsche Eingabe wie z.Bsp. 2e3 wird jetzt nicht mehr als gültig erkannt weil wir mit regex festgelegt haben, dass nur Zahlen erlaubt.

Es ist aber auch verwirrend, dass z.Bsp. der Ausdruck "2e3" für ( 2 \times 10^3 ) steht, was 2000 entspricht, und somit eine gültige Darstellung einer positiven Zahl in JavaScript ist.
Dieses Format wiord als exponentielle Notation bezeichnet.
Er wird isNaN() als Zahl erkannt und die falsche Eingabe passiert die Validierung.


### Wir schlüsseln den Regex `^[0-9]*\.?[0-9]+$` am besten einmal auf um zu verstehen was da passieren soll:                                                       

- `^`: Dies ist Anfangsanker, der sicherstellt, dass die Überprüfung am Anfang der Zeichenkette beginnt. 
  Dies ist eine Standardeinstellung.

- `[0-9]`: Der Inhalt der Klammern definiert unsre Zeichenklasse, die jedes aufeinanderfolgende Zeichen zwischen 0 und 9 (also jede Ziffer) akzeptiert. 
  Der Kern der Definition.

- `*`: Dieser Stern bedeutet, dass das vorherige Element (unsere Ziffern zwischen 0 bis 9) null- oder mehrmals vorkommen kann.
  Wichtig, um sicherzustellen, dass jede Kombination gültiger Zeichen zuläässig ist.

- `\.?`: Der Punkt steht für ein Dezimaltrennzeichen. Das Fragezeichen bedeutet, dass das vorherige Element (der Punkt) optional ist, also null- oder einmal
  vorkommen kann.

- `[0-9]+`: Das Pluszeichen bedeutet, dass das vorherige Element (wieder die Ziffern von 0 bis 9) mindestens einmal vorkommen muss.

- `$`: Dies ist der Endanker, der festlegt, dass die Überprüfung am Ende der Zeichenkette stoppt.

### Zusammengefasst prüft dieser reguläre Ausdruck, ob die Eingabe:

- Mit einer Ziffer beginnt (kann aber auch mit einem Punkt beginnen, wenn direkt danach eine Ziffer folgt).
- Keine, eine oder mehrere Ziffern vor einem optionalen Punkt hat.
- Einen optionalen Punkt hat, gefolgt von mindestens einer Ziffer.
- Mit einer Ziffer endet und keine weiteren Zeichen nach der letzten Ziffer hat.

Dieser Ausdruck schließt somit Zeichenketten aus, die nicht ausschließlich aus Ziffern und höchstens einem Punkt bestehen, und verhindert Formate wie die exponentielle Notation.


## V. Funktion zur Abfrage des Betrages

Die Funktion frageNachBetrag fragt den Benutzer nach dem Betrag und prüft, ob es sich um eine gültige Zahl handelt.
    WENN NICHT, wird der Benutzer gefragt, ob er es erneut versuchen möchte.
      WENN JA, wird die Funktion frageNachBetrag erneut aufgerufen.
      WENN NEIN, wird die readline-Schnittstelle geschlossen.

  WENN der Betrag gültig ist, wird der Benutzer nach der Ausgangswährung gefragt.

## VI. Funktion zur Abfrage der Ausgangwährung

  Die Funktion frageNachWaehrung prüft, ob die Ausgangswährung unterstützt wird; SPRICH ob sie im Objekt wechselkurse vorhanden ist.
    WENN NICHT, wird der Benutzer gefragt, ob er es erneut versuchen möchte.
      WENN JA, wird die Funktion frageNachWaehrung erneut aufgerufen.
      WENN NEIN, wird die readline-Schnittstelle geschlossen.

  WENN die Ausgangswährung gültig ist, wird der Benutzer nach der Zielwährung gefragt.

## VII. Funktion zur Abfrage der Zielwährung


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

