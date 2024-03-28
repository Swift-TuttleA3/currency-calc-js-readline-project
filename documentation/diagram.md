```mermaid
flowchart TB
A[Start] --> B[Importiere Module und definiere Variablen]
B --> C[Definiere Funktionen]
C --> D[Starte Anwendung mit frageNachBetrag]
D --> E[Frage nach Betrag]
E -->|Wenn Betrag ungültig| F[Frage, ob Benutzer erneut versuchen möchte]
F -->|Wenn Antwort 'ja'| E
F -->|Wenn Antwort 'nein'| Z[Ende]
E -->|Wenn Betrag gültig| G[Frage nach Ausgangswährung]
G -->|Wenn Ausgangswährung ungültig| H[Frage, ob Benutzer erneut versuchen möchte]
H -->|Wenn Antwort 'ja'| G
H -->|Wenn Antwort 'nein'| Z
G -->|Wenn Ausgangswährung gültig| I[Frage nach Zielwährung]
I -->|Wenn Zielwährung ungültig| J[Frage, ob Benutzer erneut versuchen möchte]
J -->|Wenn Antwort 'ja'| I
J -->|Wenn Antwort 'nein'| Z
I -->|Wenn Zielwährung gültig| K[Rechne Betrag um und gebe Ergebnis aus]
K --> Z
```



## Der Prozess beginnt bei "Start" (Knoten A).

### Zuerst werden Module importiert und Variablen definiert (Knoten B).

### Anschließend werden Funktionen definiert (Knoten C).

### Die Anwendung wird mit der Funktion frageNachBetrag() gestartet (Knoten D).

### Es wird nach dem Betrag gefragt (Knoten E). 

### Wenn der Betrag ungültig ist, wird gefragt, ob der Benutzer es erneut versuchen möchte (Knoten F). Wenn die Antwort "ja" ist, wird erneut nach dem Betrag gefragt (Knoten E). Wenn die Antwort "nein" ist, endet der Prozess (Knoten Z).

### Wenn der Betrag gültig ist, wird nach der Ausgangswährung gefragt (Knoten G). Wenn die Ausgangswährung ungültig ist, wird gefragt, ob der Benutzer es erneut versuchen möchte (Knoten H). Wenn die Antwort "ja" ist, wird erneut nach der Ausgangswährung gefragt (Knoten G). Wenn die Antwort "nein" ist, endet der Prozess (Knoten Z).

### Wenn die Ausgangswährung gültig ist, wird nach der Zielwährung gefragt (Knoten I). Wenn die Zielwährung ungültig ist, wird gefragt, ob der Benutzer es erneut versuchen möchte (Knoten J). Wenn die Antwort "ja" ist, wird erneut nach der Zielwährung gefragt (Knoten I). Wenn die Antwort "nein" ist, endet der Prozess (Knoten Z).

### Wenn die Zielwährung gültig ist, wird der Betrag umgerechnet und das Ergebnis ausgegeben (Knoten K), und der Prozess endet (Knoten Z).


