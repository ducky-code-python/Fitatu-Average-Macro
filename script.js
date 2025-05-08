const srednia = document.getElementById("srednia");
function myFunction() {
   document.getElementById("myDropdown").classList.toggle("show");
 }
 let szczegolneDni = []
 function znajdzDzien(dzien) {
   console.log('test')
   szczegolneDni.forEach((dict) => {
     console.log(dict.dzien)
      if (dict.dzien == dzien) {
       document.getElementById("szczegoly").textContent = `DZIEŃ: ${dict.dzien}\n
                                                           KALORIE: ${dict.kalorie}\n
                                                           BIAŁKO: ${dict.bialka}\n
                                                           TŁUSZCZE: ${dict.tluszcze}\n
                                                           WĘGLOWODANY: ${dict.weglowodany}\n`;
     }
   });
 }

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

          let szczegolneDni = [];
          let sredniaText = ""
          let sumaKalorii = 0, sumaBialka = 0, sumaTluszczy = 0, sumaWegli = 0;
          let liczbaDni = 0;

          for (const [data, wartosci] of Object.entries(dni)) {
            szczegolneDni.push({
              dzien: `${data}`,
              kalorie: `${wartosci.kalorie.toFixed(2)} kcal`,
              bialka: `${wartosci.bialka.toFixed(2)} g`,
              tluszcze: `${wartosci.tluszcze.toFixed(2)} g`,
              weglowodany: `${wartosci.wegle.toFixed(2)} g`
            });

            sumaKalorii += wartosci.kalorie;
            sumaBialka += wartosci.bialka;
            sumaTluszczy += wartosci.tluszcze;
            sumaWegli += wartosci.wegle;
            liczbaDni++;
          }

          if (liczbaDni > 0) {
            sredniaText = `Ilość łącznie wczytanych dni: ${liczbaDni}
Średnia spożytych kalorii: ${(sumaKalorii / liczbaDni).toFixed(2)} kcal
Średnia spożytych białek: ${(sumaBialka / liczbaDni).toFixed(2)} g
Średnia spożytych tłuszczy: ${(sumaTluszczy / liczbaDni).toFixed(2)} g
Średnia spożytych węglowodanów: ${(sumaWegli / liczbaDni).toFixed(2)} g`;
          }

          
          srednia.textContent = sredniaText;
        szczegolneDni.forEach((dict) => {
          let linkElement = document.createElement("a");
          linkElement.setAttribute("onclick", `znajdzDzien('${dict.dzien}')`);
          linkElement.textContent = `${dict.dzien}`;
          document.getElementById('dni').appendChild(linkElement);
        });
          

        }
      });
   });