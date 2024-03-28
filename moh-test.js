const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const wechselkurse = {
    'EUR': 1, // Basiswährung
    'USD': 0.9,
    'GBP': 1.2,
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
  
  const umrechnen = (betrag, ausgangsWaehrung, zielWaehrung) => {
    const betragInEuro = betrag / wechselkurse[ausgangsWaehrung];
    return betragInEuro * wechselkurse[zielWaehrung];
  };
  
  const frageNachBetrag = () => {
    readline.question('Bitte gib den Betrag ein: ', (betrag) => {
      const betragAlsZahl = parseFloat(betrag);
      //   /^\d+(\.\d+)?$/ überprüft, ob die Eingabe eine positive Ganzzahl oder eine Dezimalzahl ist,
      //   ohne wissenschaftliche Notationen zu akzeptieren.  
      if (isNaN(betragAlsZahl) || !/^\d+(\.\d+)?$/.test(betrag)) {  
        console.log('Das ist kein gültiger Betrag. Möchtest du es erneut versuchen? (ja/nein)');
        readline.question('', (antwort) => {
          if (antwort.toLowerCase() === 'ja') {
            frageNachBetrag();
          } else {
            readline.close();
          }
        });
      } else {
        frageNachWaehrung(betragAlsZahl);
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
