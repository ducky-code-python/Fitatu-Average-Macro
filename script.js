document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    processCSV(text);
  };
  reader.readAsText(file);
}

function processCSV(text) {
  const rows = text.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    return headers.reduce((acc, header, i) => {
      acc[header.trim()] = values[i]?.trim();
      return acc;
    }, {});
  });

  let output = '';

  let bialkaLista = [], tluszczeLista = [], wegleLista = [], kalorieLista = [];
  let bialkaWdniu = [], tluszczeWdniu = [], wegleWdniu = [], kalorieWdniu = [];
  let iloscDni = 0;
  let poprzedniaData = null;

  data.forEach(entry => {
    const dataDnia = entry['Data'];
    const bialka = parseFloat(entry['Białka (g)'] || entry['Białka (g)'] || 0);
    const tluszcze = parseFloat(entry['Tłuszcze (g)'] || entry['Tłuszcze (g)'] || 0);
    const wegle = parseFloat(entry['Węglowodany (g)'] || entry['Węglowodany (g)'] || 0);
    const kalorie = parseFloat(entry['kalorie (kcal)'] || 0);

    if (poprzedniaData && poprzedniaData === dataDnia) {
      bialkaLista.push(bialka);
      tluszczeLista.push(tluszcze);
      wegleLista.push(wegle);
      kalorieLista.push(kalorie);
    } else {
      if (poprzedniaData !== null) {
        output += `DZIEŃ - ${poprzedniaData}\nKALORIE - ${sum(kalorieLista).toFixed(2)} kcal\n` +
                  `BIAŁKA - ${sum(bialkaLista).toFixed(2)} g\nTŁUSZCZE - ${sum(tluszczeLista).toFixed(2)} g\n` +
                  `WĘGLOWODANY - ${sum(wegleLista).toFixed(2)} g\n\n`;

        bialkaWdniu.push(sum(bialkaLista));
        tluszczeWdniu.push(sum(tluszczeLista));
        wegleWdniu.push(sum(wegleLista));
        kalorieWdniu.push(sum(kalorieLista));
        iloscDni++;
      }

      // Reset
      bialkaLista = [bialka];
      tluszczeLista = [tluszcze];
      wegleLista = [wegle];
      kalorieLista = [kalorie];
      poprzedniaData = dataDnia;
    }
  });

  // Ostatni dzień
  if (poprzedniaData) {
    output += `DZIEŃ - ${poprzedniaData}\nKALORIE - ${sum(kalorieLista).toFixed(2)} kcal\n` +
              `BIAŁKA - ${sum(bialkaLista).toFixed(2)} g\nTŁUSZCZE - ${sum(tluszczeLista).toFixed(2)} g\n` +
              `WĘGLOWODANY - ${sum(wegleLista).toFixed(2)} g\n\n`;

    bialkaWdniu.push(sum(bialkaLista));
    tluszczeWdniu.push(sum(tluszczeLista));
    wegleWdniu.push(sum(wegleLista));
    kalorieWdniu.push(sum(kalorieLista));
    iloscDni++;
  }

  output += `Ilość łącznie wczytanych dni: ${iloscDni}\n`;
  output += `Średnia spożytych kalorii: ${(sum(kalorieWdniu) / iloscDni).toFixed(2)} kcal\n`;
  output += `Średnia spożytych białek: ${(sum(bialkaWdniu) / iloscDni).toFixed(2)} g\n`;
  output += `Średnia spożytych tłuszczy: ${(sum(tluszczeWdniu) / iloscDni).toFixed(2)} g\n`;
  output += `Średnia spożytych węglowodanów: ${(sum(wegleWdniu) / iloscDni).toFixed(2)} g\n`;

  document.getElementById('output').textContent = output;
}

function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}
