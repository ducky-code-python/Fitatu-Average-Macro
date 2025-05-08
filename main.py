import csv

bialkaLista = []
tluszczeLista = []
wegleLista = []
kalorieLista = []
iloscDni = 0

bialkaWdniu = []
tluszczeWdniu = []
wegleWdniu = []
kalorieWdniu = []

with open('macro.csv', mode ='r') as file:    
     csvFile = csv.DictReader(file)
     poprzedniaPotrawa = None  # Dodano inicjalizację zmiennej
     for dict in csvFile:
          
          if poprzedniaPotrawa and poprzedniaPotrawa['Data'] == dict['Data']:
               bialkaLista.append(float(dict['BiaĹ‚ka (g)']))
               tluszczeLista.append(float(dict['TĹ‚uszcze (g)']))
               wegleLista.append(float(dict['WÄ™glowodany (g)']))
               kalorieLista.append(float(dict['kalorie (kcal)']))
          else:
               if poprzedniaPotrawa:  # Sprawdzenie, czy poprzedniaPotrawa istnieje
                    print(f"""DZIEŃ - {poprzedniaPotrawa['Data']}
KALORIE - {sum(kalorieLista):.2f} kcal
BIAŁKA - {sum(bialkaLista):.2f} g
TŁUSZCZE - {sum(tluszczeLista):.2f} g
WĘGLOWODANY - {sum(wegleLista):.2f} g
""")
                    iloscDni += 1

                    bialkaWdniu.append(sum(bialkaLista))
                    tluszczeWdniu.append(sum(tluszczeLista))
                    wegleWdniu.append(sum(wegleLista))
                    kalorieWdniu.append(sum(kalorieLista))

               bialkaLista = [] 
               tluszczeLista = []
               wegleLista = []
               kalorieLista = []
               
               poprzedniaPotrawa = dict
               bialkaLista.append(float(dict['BiaĹ‚ka (g)']))
               tluszczeLista.append(float(dict['TĹ‚uszcze (g)']))
               wegleLista.append(float(dict['WÄ™glowodany (g)']))
               kalorieLista.append(float(dict['kalorie (kcal)']))

     # Obsługa ostatniego dnia po zakończeniu pętli
     if poprzedniaPotrawa:
          print(f"""DZIEŃ - {poprzedniaPotrawa['Data']}
KALORIE - {sum(kalorieLista):.2f} kcal
BIAŁKA - {sum(bialkaLista):.2f} g
TŁUSZCZE - {sum(tluszczeLista):.2f} g
WĘGLOWODANY - {sum(wegleLista):.2f} g
""")
          iloscDni += 1

          bialkaWdniu.append(sum(bialkaLista))
          tluszczeWdniu.append(sum(tluszczeLista))
          wegleWdniu.append(sum(wegleLista))
          kalorieWdniu.append(sum(kalorieLista))

print(f"Ilość łącznie wczytanych dni: {iloscDni}")
print(f"Średnia spożytych kalorii: {sum(kalorieWdniu)/iloscDni:.2f} kcal")
print(f"Średnia spożytych białek: {sum(bialkaWdniu)/iloscDni:.2f} g")
print(f"Średnia spożytych tłuszczy: {sum(tluszczeWdniu)/iloscDni:.2f} g")
print(f"Średnia spożytych węglowodanów: {sum(wegleWdniu)/iloscDni:.2f} g")