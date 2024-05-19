from flask_cors import CORS
from core.v2.scanner import DocxScanner
from core.v2.quiz2quiz_converter import Quiz2QuizConverter
from core.v2.doc2quiz_converter import Doc2QuizConverter
from flask import request
import flask
import json
import os
from time import sleep
from threading import Thread
from queue import Queue, Empty
from random import shuffle

tasks = Queue()

app = flask.Flask(__name__)
CORS(app)

shit = {}


def loop():
    while True:
        try:
            task = tasks.get_nowait()
            task()
        except Empty:
            pass

        sleep(1)


Thread(target=loop, daemon=True).start()


@app.post('/api/quiz2quiz')
def quiz2quiz():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == None:
        return 'No file selected'

    # only accept docx
    if file.filename.split('.')[-1] != 'docx':
        return 'File extension not allowed'

    # convert docx to JSON
    scanner = DocxScanner(file)
    scanner.scan_elements()

    full_text = scanner.text()

    quiz_converter = Quiz2QuizConverter(full_text, scanner.doc)

    shit[quiz_converter.id] = quiz_converter

    def convert():

        quiz_converter.convert()

        json_data = quiz_converter.questions

        path = f'data/{quiz_converter.id}'
        os.makedirs(path)

        with open(f'data/{quiz_converter.id}/questions.json', 'w', encoding='utf8') as f:
            json_questions = {
                'questions': []
            }

            for question in json_data.values():

                json_questions['questions'].append({
                    'content': question['content'],
                    'choices': question['choices']
                })

            json.dump(json_questions, f, ensure_ascii=False)

        with open(f'data/{quiz_converter.id}/answers.json', 'w', encoding='utf8') as f:
            json_answers = {
                'answers': []
            }

            for question in json_data.values():
                json_answers['answers'].append(question['answer'])

            json.dump(json_answers, f, ensure_ascii=False)

    tasks.put(convert)

    return {
        'testid': quiz_converter.id,
    }


@app.post('/api/doc2quiz')
def doc2quiz():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']

    if file.filename == None:
        return 'No file selected'

    # only accept docx
    if file.filename.split('.')[-1] != 'docx':
        return 'File extension not allowed'

    # convert docx to JSON
    scanner = DocxScanner(file)

    full_text = scanner.raw_text()

    quiz_converter = Doc2QuizConverter(full_text)

    shit[quiz_converter.id] = quiz_converter

    max_questions = int(request.args.get('num'))

    def convert():

        quiz_converter.convert()

        json_data = quiz_converter.questions

        shuffle(json_data)

        if (max_questions < len(json_data)):
            json_data = json_data[:max_questions]

        path = f'data/{quiz_converter.id}'
        os.makedirs(path)

        with open(f'data/{quiz_converter.id}/questions.json', 'w', encoding='utf8') as f:
            json_questions = {
                'questions': []
            }

            for question in json_data:

                json_questions['questions'].append({
                    'content': question['content'],
                    'choices': question['choices']
                })

            json.dump(json_questions, f, ensure_ascii=False)

        with open(f'data/{quiz_converter.id}/answers.json', 'w', encoding='utf8') as f:
            json_answers = {
                'answers': []
            }

            for question in json_data:
                json_answers['answers'].append(question['answer'])

            json.dump(json_answers, f, ensure_ascii=False)

    tasks.put(convert)

    return {
        'testid': quiz_converter.id,
    }


@app.get('/data/<id>/progress')
def progress(id):
    return {
        "value": shit[id].progress
    }


@app.get('/data/<id>/questions')
def questions(id):
    return flask.send_from_directory(f'data/{id}', 'questions.json')


@app.get('/data/<id>/answers')
def answers(id):
    return flask.send_from_directory(f'data/{id}', 'answers.json')


@app.get('/data/<id>/media/<filename>')
def media(id, filename):
    return flask.send_from_directory(f'data/{id}/word/media', filename)


app.run(port=8000, host="0.0.0.0")
# app.run(port=8000, host="0.0.0.0", ssl_context=('/etc/letsencrypt/live/iaihackathon.engineer/fullchain.pem',
#         '/etc/letsencrypt/live/iaihackathon.engineer/privkey.pem'))
