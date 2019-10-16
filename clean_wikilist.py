import nltk, re, urllib2, os
from bs4 import BeautifulSoup, SoupStrainer


def clean_wikilist(filename):
    # open saved html file
    html = open(filename).read()

    # collect bulleted items only
    bullets = SoupStrainer("li")

    # make soup out of the bulleted items
    soup = BeautifulSoup(html, 'lxml', parse_only=bullets).prettify()

    # remove html from soup
    raw = nltk.clean_html(soup)

    # remove extra lines
    raw = re.sub(r'\n \n \n \n \n', r'\n', raw)
    raw = re.sub(r'\n \n \n', r'\n', raw)

    # create and clean tokens
    tokens = raw.split('\n')
    tokens = [re.sub(r'^\s+(?=[\S]+)', r'', token) for token in tokens]
    tokens = [token for token in tokens if
              not re.findall(r'\[[0-9]+\]|\([\S\s]+[\(\)]?|^\s+$|^[\s\[\]\(\)0-9]+$', token)]
    tokens = list(set(tokens))

    return tokens


cars = ['bmw', 'chevy', 'benz']