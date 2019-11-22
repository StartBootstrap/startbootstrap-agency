# The CRAWCI project. Crime rate, Average wages and Cultural Institutions: what relationship?

Simay Guzel 
Elizaveta Siurina

## 1. Introduction

In modern theoretical approaches, the culture is considered as a value, which is connected to the quality of human’s living.  The  cultural  forms  have  been  and  are  still  used  for accomplishment of wider and bigger aims in the education, building a democratic society of strong individuals, achieving progress in all sheares of life. The presence of cultural institutions enriches and raises the quality of life , provides economic  and spiritual  reproduction.

The culture as a resource for development refers to the way of life, the wealth,  the human relationship  with others, including, for example,  labour relationship and conditions.</p>

If labour market conditions are related in an important way to crime, or individual’s intentions to commit criminal acts are altered by economic situation, then one may see the dependency of wages and crimes. At this point we are making an assumption that the level of cultural education is linked both to labour conditions of an individual as well as crime rates. Hence, our hypothesis is that the presence of cultural institutions influences crime rate and amount of salaries.</p>

## 2. Application scenario

CRAWCI aligns data from different sources in order to gain knowledge about the existence of the cultural institutions throughout italiab regions. The project looks at the relationship between the number of cultural institutions, digitalization, average salary and the number of crime reports by region in Italy.
The project aligns 1) the number of theaters; 2)the percentage of internet usage in families; 3) the number of crime reports; 4)the average salary; 5) The density of cultural institutions per square km. 

**The aims of CRAWCI Project:**
1. Creating a new mashup (final dataset) by aligning acquired datasets.
2. Producing the final dataset as a 5 star Open Data, following the principles of suggested a 5-star deployment scheme:

- Make your data available on the Web under an open license.
- Make it available as structured data (machine readable data) (e.g. Excel)
- Make it available in a non-proprietary open format (CSV)
- Use a single data model to publish data on the Web: RDF 
- Link RDF to provide context

3. Visualising the result by creating explorable and clickable map.

### 2.1 How CRAWCI can contribute to E-Governance

Advertisements and promotions among citizens to make an awareness on the importance of the presence of cultural institutions such as theaters where there are not available that can be deduced from the crime rate can be interesting for the municipalities.

  - Increase awareness
  - Opportunities for information sharing
  - Inspire public participation and collaboration  in a way that enable people to both understand what their governments do and to influence its decisions
  - Greater transparency and accountability
  - Support innovation  in processes of governance
  - Bring the delivery of public services to a new level


### 3. Original datasets and mushup dataset

### D1

I.Stat, Reddito netto: Regioni e tipo di comune, viewed 14 November 2019, http://dati.istat.it/Index.aspx?QueryId=22919

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: The dataset provides data about average annual income of families in eur per region.

### D2

I.Stat, Delitti denunciati dalle forze di polizia all'autorità giudiziaria, viewed 14 November 2019,  
http://dati.istat.it/Index.aspx?DataSetCode=DCCV_DELITTIPS

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: The datasets provides information on number of  crimes reported by the police to the judicial authority.

### D3

MiBACT, Luoghi della cultura, electronic dataset, Gli Open Data, viewed 14 November 2019, http://dati.beniculturali.it/lodview/resource/datasetLuoghiDellaCultura.html 

License: https://creativecommons.org/licenses/by/3.0/

Content description: This dataset lists cultural institutions in Italy providing information about their location, identification and services.

In order to extract the data we used the [SPARQL endpoint](http://dati.beniculturali.it/sparql) of dati.beniculturali.it by running the following query:

```sparql
select * where {

 select distinct ?s as ?subject

 ?Nome_Istituzionale
 ?Descrizione
 ?Identifier
 ?Latitudine
 ?Longitudine
 ?Disciplina
 ?Indirizzo
 ?Codice_postale
 ?Comune
 ?Provincia
 ?Prenotazioni
 ?Orari_di_apertura
 ?Telefono
 ?Fax
 ?Email
 ?WebSite
 str(?Biglietti) as ?Biglietti
 ?Servizi

 where {

  graph <http://dati.beniculturali.it/mibact/luoghi> {

   ?s rdf:type cis:CulturalInstituteOrSite ;
      cis:institutionalCISName ?Nome_Istituzionale .
   optional { ?s l0:description ?Descrizione }
   optional { ?s l0:identifier ?Identifier }
   optional { ?s geo:lat ?Latitudine }
   optional { ?s geo:long ?Longitudine }
   optional { ?s cis:hasDiscipline [l0:name ?Disciplina] }
   optional {
    ?s cis:hasSite [cis:siteAddress ?address ] .
    optional { ?address clvapit:fullAddress ?Indirizzo }
    optional { ?address clvapit:postCode ?Codice_postale }
    optional { ?address clvapit:hasCity [rdfs:label ?Comune] }
    optional { ?address clvapit:hasProvince [rdfs:label ?Provincia] }
   }
   optional {?s accessCondition:hasAccessCondition [rdf:type accessCondition:Booking ;
                                                    rdfs:label ?Prenotazioni] }
   optional {?s accessCondition:hasAccessCondition [rdf:type accessCondition:OpeningHoursSpecification ;
                                                    l0:description ?Orari_di_apertura ] }
   optional {
    ?s smapit:hasOnlineContactPoint ?contactPoint .
    optional { ?contactPoint smapit:hasTelephone [smapit:hasTelephoneType <https://w3id.org/italia/controlled-vocabulary/classifications-for-public-services/channel/031> ;
                                                  smapit:telephoneNumber ?Telefono] }
    optional { ?contactPoint smapit:hasTelephone [smapit:hasTelephoneType <https://w3id.org/italia/controlled-vocabulary/classifications-for-public-services/channel/033> ;
                                                  smapit:telephoneNumber ?Fax] }
    optional { ?contactPoint smapit:hasEmail [smapit:emailAddress ?Email] }
    optional { ?contactPoint smapit:hasWebSite [smapit:URL ?WebSite] }    
   }   
   optional {
    ?s potapit:hasTicket ?ticket .
    ?offer potapit:includes ?ticket ;
           potapit:hasPriceSpecification [potapit:hasCurrencyValue ?Biglietti]
   }
   optional { ?s cis:providesService [l0:name ?Servizi] }
  }
 }
 order by ?s

}
limit 100
offset 0
```

### D4
  
I.Stat,Internet: access and type of use, viewed 14 November 2019
http://dati.istat.it/Index.aspx?QueryId=22994&lang=en

License: Creative Commons License – Attribution – 3.0 https://www.istat.it/it/note-legali

Content description: This dataset shows percentage of internet use in families by regions

### D5

DatiOpen.it, Mappa dei teatri in Italia, viewed 14 November 2019
http://www.datiopen.it/it/opendata/Mappa_dei_teatri_in_Italia

License: Open Database License https://opendatacommons.org/licenses/odbl/

Content description: This dataset shows the number of theaters region by region in Italy.

### D6 (Mashup)

CRAWCI Project, The final dataset, created 15 November 2019
CSV: https://github.com/simayguzel/crawci/blob/master/dataset/crawciopendata.csv
RDF: https://github.com/simayguzel/crawci/blob/master/dataset/dataset.rdf

License: 

Content description: This dataset includes1) the number of theaters; 2)the percentage of internet usage in families; 3) the number of crime reports; 4)the average salary; 5) The density of cultural institutions per square km.  The result will be a presented as an explorable map which allows users to visualize all the data about regions. 

Methodology: The mashup of datasets D1, D2, D4, D5 was done semi-automatically using Python scripts and the library Pandas, which required a CSV version of the datasets as an input. The developed script firstly dropped the unnecessary columns and then the datasets are aligned through the properties "Theaters", "AvarageIncome", "DifuseofInternet", "CriminalReports" and "CulturalInstitutions".

Here is the Python script developed to drop the columns(an example for one of the datasets):

```
import pandas as pd
import numpy as np
import csv
df = pd.read_csv('dataset1.csv')
df.head()
to_drop = ['PRAF',
           'RDPR',
           'Data e ora inserimento']
df.drop(to_drop, inplace=True, axis=1)

df.to_csv(r'cleaned-data1.csv', index=False)



```
Here is the Python script developed to align the datasets:
```
import pandas as pd


def Aligner(cleaned-data1,cleaned-data2,outputdata,area):
    a = pd.read_csv(cleaned-data1,encoding='utf-8')
    b = pd.read_csv(cleaned-data2,encoding='utf-8')
    aligned = a.merge(b, on=area)
    aligned.to_csv(outputdata,index=False)
```
### 4. Quality analysis of the datasets 

This section considers the necessary requirements, established according to the "Linee guida per la valorizzazione del patrimonio informativo pubblico" by AGID https://docs.italia.it/italia/daf/lg-patrimonio-pubblico/it/bozza/aspettiorg.html#qualita-dei-dati). The four characteristics to control the level of information quality are:

**accuracy** (syntactic and semantic) - the data, and its attributes, correctly represent the real value of the concept or event to which it refers;
**coherence** - the data, and its attributes, is not contradictory to other data regarding the context of use of the owner administration;
**completeness** - the data is exhaustive for all its expected values and with respect to the relative entities (sources) that contribute to the definition of the procedure;
**currentness** (or timeliness of updating) - the data, and its attributes, is of the "right time" (it is updated) with respect to the procedure to which it refers.

<table>      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<col width="20%" />      
<tbody>      
<tr class="odd">      
<td align="left"><p></p></td>      
<td align="left"><p>Accuracy</p></td>      
<td align="left"><p>Completeness</p></td>      
<td align="left"><p>Coerenza</p></td>      
<td align="left"><p>Curentness</p></td>      
</tr>      
<tr class="even">      
<td align="left"><p>D1</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 1</p></td>      
<td align="left"><p>YES</p></td>      
</tr>      
<tr class="odd">      
<td align="left"><p>D2</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 2</p></td>      
<td align="left"><p>YES</p></td>      
</tr>      
<tr class="even">      
<td align="left"><p>D3</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 3</p></td>      
</tr>
<tr class="even">      
<td align="left"><p>D4</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 4</p></td>      
<td align="left"><p>YES</p></td>      
</tr>
</tr>
<tr class="even">      
<td align="left"><p>D5</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>YES</p></td>      
<td align="left"><p>No See Point 5</p></td>      
<td align="left"><p>YES</p></td>      
</tr>        
</tbody>      
</table>      

1. D1 makes arbitrary use of uppercase and lowercase.

2. D2 makes arbitrary use of uppercase and lowercase; unclear semantic("CRIMEN", "TERRORHOM")
3. D3 does not feature up-to-date information regarding Sardinia provinces, which changed in 2016 going from a total of 8 to a total of 4 (see Legge Regionale 4 Febbraio 2016 n.2). 
4. D4 makes arbitrary use of uppercase and lowercase, unclear semantic FAM_INT_YES, FAM_NO_ELSE, FAM_NO_USE, FAM_NO_EQUI, FAM_NO_COST, FAM_NO_SKIL, FAM_NO_SEC, FAM_NO_BROAD, FAM_NO_OTH

5. D5 makes use of integer values for indicating Comune, Provincia, Regione without a complementary explanation. 

### 5. Ethical-legal analysis
## Legal checklist

Legal analysis is necessary to ensure sustainability of the data production and publication process over time and to create a balanced service that respects the public function and the rights of individuals. 

| | To check | D.1|  D.2 | D.3 | D4 | D5 | D6 | 
| ----------- | --------| ------|--------|-------|---------|---------|---------|
| **Privacy issues** | 1.1 Is the dataset free of any personal data as defined in the Regulation (EU) 2016/679? |yes |yes| yes | yes| yes| yes|
| | 1.2 Is the dataset free of any indirect personal data that could be used for identifying the natural person? If so, is there a law that authorize the PA to release them? Or any other legal basis? Identify the legal basis. |yes |yes|yes  |yes | yes| yes|
| | 1.3 Is the dataset free of any particular personal data (art. 9 GDPR)? If so is there a law that authorize the PA to release them ? |yes |yes|yes  |yes | yes| yes|
| | 1.4 Is the dataset free of any information that combined with common data available in the web, could identify the person? If so, is there a law that authorize the PA to release them?  |yes |yes|yes  |yes | yes| yes|
| | 1.5 Is the dataset free of any information related to human rights (e.g. refugees, witness protection, etc.)? |yes |yes|yes  |yes | yes| yes|
| | 1.6 Do you use a tool for calculating the range of the risk of deanonymization? Do you anonymize the dataset? With which technique? Did you check the three mandatory parameters: singling out, linking out, inference out?  |/ |/|/|/|/|/|
| | 1.7 Are you using geolocalization capabilities ? Do you check that the geolocalization process can’t identify single individuals in some circumstances? | no|no|no|no|no|no|
| |1.8 Did you check that the open data platform respect all the privacy regulations (registration of the end-user, profiling, cookies, analytics, etc.)? | yes|yes|yes|yes|yes|yes|
| |1.9 Do you know who are in your open data platform the Controller and Processor of the privacy data of the system?  |/ |/|/|/|/|/|
| |1.10 Where the datasets are physically stored (country and jurisdiction)? Do you have a cloud computing platform? Do you have checked the privacy regulation of the country where the dataset are physically stored? (territoriality) |/ |/|/|/|/|/|
| **Intellectual Property Rights of the dataset** | | |
| | 2.1 Do you have created and generated the dataset ? | yes| yes| yes |yes|yes|
| | 2.2 Are you the owner of the dataset? Who is the owner? |/ |/|/|/|/|yes|
| | 2.3 Are you sure to not use third party data without the proper authorization and license ? Are the dataset free from third party licenses or patents? | yes |yes| yes| yes|yes|yes|
| | 2.4 Do you have checked if there are some limitations in your national legal system for releasing some kind of datasets with open license? | yes |yes| yes| yes|yes|yes|
| **License** | | |
| | 3.1 Do you release the dataset with an open data license ? In case of the use of CC0 do you check that you have all the right necessary for this particular kind of license (e.g., jurisdiction)?| yes |yes| yes| yes|yes|yes|
| | 3.2 Do you include the clause: "In any case the dataset can’t be used for re-identifying the person" ?| no|no|no|no|no|yes|
 | | 3.3 Do you release the API (in case you have) with an open source license ? |? |?|?|?|?|no|
| **Limitations on public access** | | |
| | 4.1 Do you check that the dataset concerns your institutional competences, scope and finality? Do you check if the dataset concerns other public administration competences? |/|/|/|/|/|yes|
| | 4.2 Do you check the limitations for the publication stated by your national legislation or by the EU directives ? |/|/|/|/|/|yes|
| |4.3 Do you check if there are some limitations connected to the international relations, public security or national defence ?|/|/|/|/|/|yes|
| |4.4 Do you check if there are some limitations concerning the public interest ?|/|/|/|/|/|yes|
| |4.5 Do you check the international law limitations ?|/|/|/|/|/|yes|
| |4.6 Do you check the INSPIRE law limitations for the spatial data?|/|/|/|/|/|yes|
| **Economical Conditions** | | |
| | 5.1 Do you check that the dataset could be released for free ? |yes|yes|yes|yes|yes|yes|
| | 5.2 Do you check if there are some agreements with some other partners in order to release the dataset with a reasonable price ? | |yes|yes|yes|yes|yes|yes|
| |5.3 Do you check if the open data platform terms of service include a clause of “non liability agreement” regarding the dataset and API provided ? |/|/|/|/|/|/|
| |5.4 In case you decide to release the dataset to a reasonable price do you check if the limitation imposed by the new directive 2019/1024/EU are respected ? Are you able to calculate the “marginal cost”? Are you able to justify the “reasonable return on investment” limited to cover the costs of collection, production, reproduction, dissemination, preservation and rights clearance? There is a national law that justify your public administration to apply the “reasonable return of investment”?|yes|yes|yes|yes|yes|yes|
| | 5.5 In case you decide to release the dataset to a reasonable price do you check the e-Commerce directive1 and regulation?|/|/|/|/|/|/|
| **Temporary aspects** | | |
| |6.1 Do you have a temporary policy for updating the dataset ? |?/ non viene infranta |?/ non viene infranta |?/ non viene infranta |/|/|/|/|/|/|
| | 6.2 Do you have some mechanism for informing the end-user that the dataset is updated at a given time to avoid mis-usage and so potential risk of damage ?|/|/|/|/|/|/|
| | 6.3 Did you check if the dataset for some reason can’t be indexed by the research engines (e.g. Google, Yahoo, etc.) ?|/|/|/|/|/|/|
| |6.4 In case of personal data, do you have a reasonable technical mechanism for collecting request of deletion (e.g. right to be forgotten)?|/|/|/|/|/|/|


#### Licenses

D1, D2, D3 and D4 are licensed under Creative Commons License(https://creativecommons.org/licenses/by/3.0/) – Attribution – 3.0 and D5 is licensed under the Open Data License (ODL) v2.0(https://opendatacommons.org/licenses/odbl/), which is very similar to a CC-BY 4.0. Each dataset is accompanied by a clear license declaration.The content of the website is covered by a "All rights reserved" copyright statement. 

Our final dataset has an open licence which allows others to republish the content or data on their own website, to derive new content or data from yours, to make money by selling products that use your content or data, to republish the content or data while charging a fee for access as long as the reusers give attribution or share-alike). Our creative work has Open Data License v2.0(https://www.dati.gov.it/content/italian-open-data-license-v20">Italian). 

### 4.3 Technical analysis (formats, metadata, URIs, provenance)

1. All MIUR datasets taken into consideration (D1, D2, D4.1 and D4.2) use the following date format: full year plus second half of following year with no white spaces or slashes between the two (e.g. 201617). This makes it difficult for machines as well as humans to clearly identify the nature of these particular pieces of data (i.e. the fact that they represent consecutive years and not year plus month if last two digits go from 1 to 12). Furthermore the datasets cover an academic year, meaning that the data do not cover the period going from e.g. January 2016 to December 2017.  
Durations in CSV could be specified as a time interval according to the standard ISO_8601: YYYY-MM-DD/YYYY-MM-DD (e.g. 2016-09-01/2017-08-31).

2. D1 features text in Slovenian (Slovenian schools in Friuli Venezia Giulia express their self-evaluation in Slovenian rather than Italian). Languages should be declared at least in the XML/RDF dataset as shown below.

```xml
<MIUR:MOTIVAZIONEPUNTEGGIOSCUOLA xml:lang="sl">
	[description in Slovenian]
</MIUR:MOTIVAZIONEPUNTEGGIOSCUOLA>
```

3. The XML/RDF version of D1 and D2 makes an incorrect use of namespaces and ontologies, which are declared but not used.

4. In the MIUR page of the csv D1 dataset there is no indication about the encoding of the file (if it's ASCII, ISO-8859-1), despite this is encouraged by the ["Linee guida per la valorizzazione del patrimonio informativo pubblico" by AGID](https://www.agid.gov.it/it/agenzia/stampa-e-comunicazione/notizie/2017/08/03/open-data-online-linee-guida-valorizzazione-del-patrimonio-informativo-pubblico). This problem can create various problems in the automatic computation of the data. In fact, a wrong encoding declaration during the analysis may create incorrect data results (some cells may be skipped for example). After trying multiple encodings, the only one that seemed to work without corrupting, using Python library "csv", was "utf-8-sig" ([see Python documentation about it here](https://docs.python.org/2/library/codecs.html#encodings-and-unicode)). An example of a script using that encoding can be seen in [section 5.1](https://github.com/sebucci/sebucci.github.io/blob/master/readme.md#51-data-processing)

### 4.4 Updating the dataset over time

We do not plan to update SEBuCCI as it takes a picture of a specific school year, namely 2016-2017. However, it would be interesting to create new datasets for the following school years to be able to make comparisons between datasets.

### 4.5 Summary

| Id | Problem description | Severity (1-3) | Type (Syntax/Semantics) | Proposed solution |
|-------------------------------|----------------------------|----------------|-------------------------|----------------------------|
| D1, D2, D4.1, D4.2 / Column A | Ambiguous date format used | 1.5 | Syntax | Adopt ISO 8601 date format |
| D1 | Indirect information about individuals | 3 | Semantics, Privacy | Remove information |
| D3, D4.3 | Incorrect information about Sardinia's provinces | 2.5 | Outdated content | Combination of manual and automatic methods to redistribute data in the correct provinces |
| D1 | Encoding of the dataset not specified | 2 | Technical | Include a note on the download page of the dataset stating its encoding |
| D1 | Ambiguity between title and content (school/institutes ID)| 2 | Semantics | Disambiguation through alignment scripts with other datasets |
| D2 | Ambiguity with the content of the cells (-, "Non richiesto") | 2 | Semantics | Our solution was to consider them both as "NO" | 

## 5. Visualization

### 5.1 Data processing

Although the final dataset has been released in RDF format, the CSV has also been made available on the project GitHub repository as it was used to extract the data needed in order to produce the visualization. 

Python was used to process the CSV dataset. Each row of the CSV was converted into a list of dictionaries with the help of the "CSV" library:

```python
def process_data(source_csv_file_path):
    import csv
    data = list()
    with open(source_csv_file_path, 'r', encoding='utf-8-sig') as test:  #Notice the utf-8-sig
        processed_data = csv.DictReader(test, delimiter=',')
        for x in processed_data:
            x = dict(x)
            data.append(x)
    return data
 ```
We then developed algorithms to calculate percentages and extract data specifically useful for the final visualization.
Once the final sub-datasets that were used for computation were acquired, we used the JSON Python library to convert them into a json format as it was one of the inputs requested by the visualization library.

```python
import json
def jsonize(data,nome):
    risultatojson = open(nome+".json", "w+")  #automatically creates a json file with the name specified in the input
    json_data = json.dumps(data)  #converts the data into json format
    risultatojson.write(json_data) #writes on the new file the converted data
```
*\*_All the other scripts can be seen in the [Script Directory](https://github.com/sebucci/sebucci.github.io/blob/master/script/)_*

#### 5.1.1 Get school coordinates from address:

In order to get the latitude and longitude of schools knowing their addresses, we employed the following script: [address2latlon.py](https://github.com/sebucci/sebucci.github.io/blob/master/script/address2latlon.py).

It uses the library [GeoPy](https://geopy.readthedocs.io/en/stable/), which is a client for several popular geocoding web services (under [MIT license](https://github.com/geopy/geopy/blob/master/LICENSE)). Using this library we were able to retrieve geographical coordinates of schools, but only for the province of Bologna, because it has a limiter in usage, so we decided to reduce the set of schools (sebucci is still a demo).

We faced another problem here: according to our dataset we should have 430 schools, but we were able to retrieve only 298 of them. Their addresses are difficult to parse, because they are not well formed.

### 5.2 Handling the visualization (technical description)

In order to visualize the data the following libraries were used:

* **Leaflet.js**: An open-source JavaScript library for mobile-friendly interactive maps.
* **Chart.js**: Simple yet flexible JavaScript charting for designers and developers.
* **Bootstrap**: Build responsive, mobile-first projects on the web with the world's most popular front-end component library.

#### 5.2.1 Further information and licenses

**Leaflet.js**

* Code &copy; [BSD](https://github.com/Leaflet/Leaflet/blob/master/LICENSE)
* Data &copy; [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) 

* In making use of [Wikimedia Tile](https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use) we comply with [OpenStreetMap copyright policy](https://www.openstreetmap.org/copyright).

**OpenStreetMap** 

Both **Wikimedia Tile** and **Leaflet** use data from **OpenStreetMap**.

* Data &copy; [ODbL](https://www.openstreetmap.org/copyright)

**GEOJSON**: Leaflet makes it possible to draw polygons directly from geojson files:

* Regions: To help us draw regions, data from [Stefano Cudini's repository](https://github.com/stefanocudini/leaflet-geojson-selector/blob/master/examples/italy-regions.json) were used.

* Provinces: To help us draw provinces, data from [Dataninja repository](https://github.com/Dataninja/geo-shapes/tree/master/italy/regions) were used.
**N.B.** Each region is contained in a single json file, except for Sardegna provinces which were not updated to 2017. In order to handle this problem, we retrieved additional data from the ISTAT archive [CONFINI DELLE UNITÀ AMMINISTRATIVE A FINI STATISTICI AL 1 GENNAIO 2018](https://www.istat.it/it/archivio/222527), [CC BY 3.0](https://www.istat.it/it/note-legali).

**Chart.js**
For the visualization of school self-evaluation a specific bar chart was chosen ([MIT license](https://www.chartjs.org/docs/latest/notes/license.html)).

**Bootstrap**
v4.1.3., Code &copy; MIT, Docs CC BY 3.0.

### 5.3 Behind the icons (light bulbs and museum buildings)
The visualization makes use of visual metaphors to synthetically represent the data. 

#### 5.3.1 Cultural institutions
N. of cultural institutions divided by Km^2.

For Italy, each region, each province we established the following threshold:

-one museum icon if < 0.0224 (Italian average presence of cultural institutions/Km^2);
-two museum icons if >= 0.0224 and < 0.0448;
-three museum icons if >= 0.0448.

#### 5.3.2 School building safety certificates
For each school building we calculated the percentage of available certificates (for example if 4 of 8 certificates are available, then the percentage is 50%). 
For each school we calculated the average of percentages of available certificates (for example if a school has two buildings, with 25% and 50% of available certificates respectively, then the final percentage is 37.5%).

For Italy, each region, each province, each school we established the following threshold:

-red light bulb <= 33%;
-yellow light bulb > 33% and <=66%;
-green light bulb > 66%.

## 6. Final considerations

### 6.1 School safety certificates

According to statistics, **Prato** is the only Italian province with a green light as concerns building certificates (>66%). Alongside with Prato, the top **16** provinces of Italy are:

1.	Prato (**best**)
2.	Ancona
3.	Mantova
4.	Livorno
5.	Ravenna
6.	Pistoia
7.	Monza E Della Brianza
8.	Torino
9.	Lodi
10.	Savona
11.	Rimini
12.	Biella
13.	Venezia
14.	Bari
15.	Udine
16.	Como

On the opposite side, the following provinces get a red light (<33%):

1.	Pescara (**worst**)
2.	Nuoro 
3.	Reggio Calabria
4.	Vibo Valentia
5.	L'aquila
6.	Crotone
7.	Foggia 
8.	Catanzaro 
9.	Teramo
10.	Chieti
11.	Trieste
12.	Roma
13.	Isernia
14.	Caserta
15.	Frosinone
16.	Rieti

### 6.2 Cultural institutions

The Italian provinces with double the number of cultural institutions compared to the Italian average per square kilometre are 14. The top 16 are:

1.	Trieste (**best**)
2.	Napoli
3.	Genova
4.	Roma
5.	Prato
6.	Firenze
7.	Milano
8.	Imperia
9.	Pistoia
10.	Varese
11.	Rimini
12.	Ascoli Piceno
13.	Macerata
14.	Gorizia
15.	Ancona
16.	Livorno


On the other hand, the provinces with the lowest values (<0.022) are **57**, among which the worst 16 are: 

1.	Belluno (**worst**)
2.	Caltanissetta
3.	Enna
4.	Rovigo
5.	Foggia
6.	Potenza
7.	Rieti
8.	Agrigento
9.	Sondrio
10.	Matera
11.	Taranto
12.	Sassari
13.	Treviso
14.	Crotone
15.	Nuoro
16.	Sud Sardegna 


### 6.3 School self-evaluation

As regards school self-evaluation results (sum of percentage of 5,6 and 7 minus sum of percentage of 1,2,3 and 4), the top 16 Italian provinces are:

1.	Isernia (**best**)
2.	Terni
3.	Verbano-Cusio-Ossola
4.	Benevento
5.	Cremona
6.	Ascoli Piceno
7.	Campobasso
8.	Udine
9.	Alessandria
10.	Catanzaro
11.	Rimini
12.	Pordenone
13.	Arezzo
14.	Barletta-Andria-Trani
15.	Vibo Valentia
16.	Perugia.

On the other hand, the worst 16 are:

1.	Rovigo (**worst**)
2.	Sassari
3.	Cagliari
4.	Sud Sardegna
5.	Novara
6.	Nuoro
7.	Pistoia
8.	Imperia
9.	Biella
10.	Napoli
11.	Pavia
12.	Parma
13.	Trieste
14.	Modena
15.	Chieti
16.	Catania

### 6.4 What about our initial questions? 

1. Does the presence of libraries, museums and other cultural institutions in school surroundings impact how schools evaluate their teaching performance? 
2. Do building certifications also play a role in school self-evaluation? 

#### Cultural institutions

By looking at the best provinces for school self-evaluation and cultural institutions per Km^2, we see that only **Rimini** and **Ascoli Piceno** appear on both lists. On this basis, we can state that **having a high number of cultural institutions nearby the school has no apparent relation with student performance**.


In the same way, by looking at the worst provinces for school self-evaluation and cultural institutions per Km^2, we see that only **Rovigo**, **Sassari**, **Nuoro** and **Sud Sardegna** appear on both lists. On this basis, we can state that **having a low number of cultural institutions nearby the school may slightly have a negative influence on student performance**.

In conclusion, **the number of cultural institutions nearby the school very slightly influence student performance**.

#### School safety certificates

By looking at the best provinces on both school self-evaluation and school safety certificates, **Rimini** and **Pordenone** are the only provinces on both lists. We can conclude that, according to our data, **having a good percentage of school safety certificates has no apparent relation with student performance**.

In the same way, by looking at the provinces having the lowest percentage of school safety certificates and the lowest school self-evaluation results, we can see that only **Nuoro**, **Trieste** and **Chieti** are included in both lists. From this, we can state that **having a bad percentage of school safety certificates has no apparent relation with student performance**.

In conclusion, **the percentage of school safety certificates do not have an apparent relation with student performance**.



