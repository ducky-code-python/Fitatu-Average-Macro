const output = document.getElementById("output");

    const toFloat = (value) => {
      if (!value) return 0;
      return parseFloat(value.replace(',', '.').replace(/"/g, '').trim()) || 0;
    };

    document.getElementById("csvFile").addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data;

          const dni = {};
          for (const entry of data) {
            const dataDnia = entry['Data'];
            if (!dni[dataDnia]) {
              dni[dataDnia] = {
                kalorie: 0,
                bialka: 0,
                tluszcze: 0,
                wegle: 0,
              };
            }

            dni[dataDnia].bialka += toFloat(entry['Białka (g)']);
            dni[dataDnia].tluszcze += toFloat(entry['Tłuszcze (g)']);
            dni[dataDnia].wegle += toFloat(entry['Węglowodany (g)']);
            dni[dataDnia].kalorie += toFloat(entry['kalorie (kcal)']);
          }

          let tekst = "";
          let sumaKalorii = 0, sumaBialka = 0, sumaTluszczy = 0, sumaWegli = 0;
          let liczbaDni = 0;

          for (const [data, wartosci] of Object.entries(dni)) {
            tekst += `DZIEŃ - ${data}
KALORIE - ${wartosci.kalorie.toFixed(2)} kcal
BIAŁKA - ${wartosci.bialka.toFixed(2)} g
TŁUSZCZE - ${wartosci.tluszcze.toFixed(2)} g
WĘGLOWODANY - ${wartosci.wegle.toFixed(2)} g

`;

            sumaKalorii += wartosci.kalorie;
            sumaBialka += wartosci.bialka;
            sumaTluszczy += wartosci.tluszcze;
            sumaWegli += wartosci.wegle;
            liczbaDni++;
          }

          if (liczbaDni > 0) {
            tekst += `\nIlość łącznie wczytanych dni: ${liczbaDni}
Średnia spożytych kalorii: ${(sumaKalorii / liczbaDni).toFixed(2)} kcal
Średnia spożytych białek: ${(sumaBialka / liczbaDni).toFixed(2)} g
Średnia spożytych tłuszczy: ${(sumaTluszczy / liczbaDni).toFixed(2)} g
Średnia spożytych węglowodanów: ${(sumaWegli / liczbaDni).toFixed(2)} g`;
          }

          output.textContent = tekst;
        }
      });
    });