# MWA - Homework 09 - Mongodb 03

## Exercise

This [JSON](http://mumstudents.org/cs572/lecture09/zips.zip) file contains a list of all the zip codes in the US. Import it into your MongoDB (`mongoimport`).

```javascript
{ "_id" : "52556", "city" : "FAIRFIELD", "loc" : [ -91.957611, 41.003943 ], "pop" : 12147, "state" : "IA" }
```

Download data and import `zip.json` to mongodb using commands below:

```bash
cd data
wget http://mumstudents.org/cs572/lecture09/zips.zip && unzip zips.zip
cd ..
mongoimport --db=rich --collection=zips --file=./data/zips.json
```

Use the **Aggregation Framework** to write 4 different queries to:

1. Find all the zip codes in Iowa state.
2. Find all the zip codes with a population less than 10,000.
3. Find all cities that have more than one zip code, sort the results by state and city name.
4. Display the least populated city in each state
