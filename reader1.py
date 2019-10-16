import csv
from progress.bar import Bar
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
#from textblob import TextBlob
from collections import Counter
from collections import OrderedDict

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyser = SentimentIntensityAnalyzer()

def sentiment_analyzer_scores(sentence):
    score = analyser.polarity_scores(sentence)
    return "{:-<40} {}".format(sentence, str(score))

stop_words = set(stopwords.words('english'))

cars = {}
sentiment = {}

with open('hellacars.csv', newline='') as csvfile:
    carsreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in carsreader:
        cars[row[0].lower().strip()] = {}


hiphopsongs = []
already_found = set()

with open('lyrics.csv', newline='') as csvfile:
    lyricsreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(lyricsreader)
    progress_bar = Bar('Tokenizing lyrics.csv...', max=24850)
    for row in lyricsreader:
        artist = row[3].lower().replace('-', ' ')
        year = row[2]
        song = row[1].lower().replace('-', ' ')
        genre = row[4].lower()
        lyrics = row[5].lower()
        if genre != 'hip-hop' or len(lyrics) == 0:
            continue

        already_found.add(artist + song)
        hiphopsongs.append({
            'artist': artist,
            'song': song,
            'year': year,
            'lyrics': lyrics,
            'words': [w for w in word_tokenize(lyrics) if w not in stop_words]
        })

        progress_bar.next()
    progress_bar.finish()

with open('lyrics_whole.csv', newline='') as csvfile:
    lyricsreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(lyricsreader)

    progress_bar = Bar('Tokenizing lyrics_whole.csv...', max=9579)
    for row in lyricsreader:
        artist = row[4].lower().replace('_', ' ')
        year = row[5]
        song = row[2].lower()
        lyrics = row[6].lower()

        if (artist + song) in already_found or len(lyrics) == 0:
            continue

        hiphopsongs.append({
            'artist': artist,
            'song': song,
            'year': year,
            'lyrics': lyrics,
            'words': [w for w in word_tokenize(lyrics) if w not in stop_words]
        })

        progress_bar.next()
    progress_bar.finish()

car_songs = {}

progress_bar = Bar('Analysing songs...', max=len(hiphopsongs))
for song in hiphopsongs:
    artist = song['artist']
    songKey = song['song'] + song['artist'] + song['year']

    for w in song['words']:
        if w in cars:
            if artist in cars[w]:
                cars[w][artist] += 1
            else:
                cars[w][artist] = 1

            if songKey not in car_songs:
                car_songs[songKey] = {'song': song, 'cars': set([w]), 'sentiment_scores': analyser.polarity_scores(song['lyrics'])}
            else:
                car_songs[songKey]['cars'].add(w)

    progress_bar.next()

progress_bar.finish()

for car in cars:
    total=0
    for artist in cars[car]:
        total+=cars[car][artist]
    print('car ', car, 'has been mentioned ', total, ' times')

#for song in hiphopsongs:
    #lyric = song['lyrics']
    #for lyric in song:
       # blobsong = song['lyrics']
       # blob = TextBlob(blobsong)
      #  print(blobsong)
       # print(blob.sentiment.polarity, blob.sentiment.subjectivity)

#def sentiment_analyzer_scores(sentence):
    #score = analyser.polarity_scores(sentence)
   # print("{:-<40} {}".format(sentence, str(score)))

progress_bar = Bar('Saving results to sentiment_results.csv...', max=len(car_songs))
with open('sentiment_results.csv', 'w', newline='') as output_csv:
    results_writer = csv.writer(output_csv, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    results_writer.writerow(['cars', 'negative', 'neutral', 'positive', 'compound', 'song', 'artist', 'year', 'lyrics'])
    for analysed_song in car_songs.values():
        song = analysed_song['song']

        cars = ','.join(list(analysed_song['cars']))
        neg = str(analysed_song['sentiment_scores']['neg'])
        neu = str(analysed_song['sentiment_scores']['neu'])
        pos = str(analysed_song['sentiment_scores']['pos'])
        compound = str(analysed_song['sentiment_scores']['compound'])
        results_writer.writerow([cars, neg, neu, pos, compound, song['song'], song['artist'], song['year'], song['lyrics']])

        progress_bar.next()

    progress_bar.finish()

#the example of Sentiment analysis

#sentiment_analyzer_scores("I want you!")
