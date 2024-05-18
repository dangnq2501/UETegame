import flask
import re
from youtube_transcript_api import YouTubeTranscriptApi
import requests
from bs4 import BeautifulSoup

def yt_transcript(id: str):
    # extract transcript from video id
    transcript_list = YouTubeTranscriptApi.list_transcripts(id)
    try:
        transcript_info = transcript_list.find_transcript(['en', 'vi', 'fr', 'de', 'ja'])
    except:
        return None
    if transcript_info.language_code != "en" or transcript_info.language_code != "vi":
        transcript_info = transcript_info.translate('en')

    transcript = transcript_info.fetch()
    text = ""
    for obj in transcript:
        text += obj["text"] + " "

    # tags removal
    text_filter = ""
    remove_mode = 0
    for c in text:
        if c == '[':
            remove_mode = 1
        elif c == ']':
            remove_mode = 0
            continue
        if remove_mode == 0:
            text_filter += c

    text = text_filter

    # cleanup
    text = re.sub(' +', ' ', text)
    text = re.sub(r' \n+', '\n', text)
    text = re.sub(r'\n', ' ', text)
    
    # title crawler
    r = requests.get(f"https://www.youtube.com/watch?v={id}")
    soup = BeautifulSoup(r.text)

    link = soup.find_all(name="title")[0]
    title = link.text

    return {
        "id": f"yt_{id}",
        "text": text,
        "name": f"{title}",
        "type": "yt"
    }

def ytUpload(request: flask.Request):
    id = request.form["id"]

    # check if invalid request
    if id == None:
        return None

    return yt_transcript(id)

