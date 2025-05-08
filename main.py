import csv

with open('macro.csv', mode ='r') as file:    
       csvFile = csv.DictReader(file)
       for dict in csvFile:
           print(dict)