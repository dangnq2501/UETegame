from dotenv import load_dotenv

load_dotenv()

import json
import os
import pickle

from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from pydantic import BaseModel, conlist
from typing import List, Optional
import pandas as pd
from functions.recommendation import Person

app = Flask(__name__)
CORS(app)

sio = SocketIO(app, cors_allowed_origins='*')

import wsevent

from time import sleep
from threading import Thread
from queue import Queue, Empty
from functions.pdf_processing import pdfUpload
from functions.yt_processing import ytUpload

from functions.document import DocumentAbout, DocumentModel
from functions.task import Task
from functions.note import Note
from functions.chat import chat

tasks = Queue()
docu_cache: dict[str, DocumentModel] = {}
docu_list = []
msg_cache: dict[str, list()] = {}
task_cache = []
note_cache = []
pp_time = False

try:
    os.mkdir("data")
except FileExistsError:
    pass

def loop():
    while True:
        try:
            task = tasks.get_nowait()
            print("New task!")
            task()
        except Empty:
            pass

        sleep(1)

Thread(target=loop, daemon=True).start()

def logInfo(msg):
    print(f"[sid={request.sid}]: {msg}.")

@app.route('/')
def index():
    return "Hi THT i'm alive so pls give me Điểm rèn luyện or else i'll not function as intended pls"



# ================
def load_doc_list():
    global docu_list
    docu_list = []
    if os.path.exists(f"data/doc_list.pkl"):
        with open(f"data/doc_list.pkl", 'rb') as fr:
            try:
                while True:
                    docu_list.append(pickle.load(fr))
            except EOFError:
                pass
    else:
        with open(f"data/doc_list.pkl", 'wb') as fp:
            pass

@app.post('/doc/read')
def doc_list_read():
    load_doc_list()
    global docu_list
    for (i, docu) in enumerate(docu_list):
        if docu.type == "topic":
            if os.path.exists(f"data/{docu.id}.md"):
                docu_list[i].processing_status = 1
            else:
                docu_list[i].processing_status = 0
        else:
            load_docu(docu.id)
            docu_list[i].processing_status = docu_cache[docu.id].processing_status
    return {
        "msg": "ok",
        "data": json.loads(json.dumps(docu_list, default=vars))
    }

@app.post('/doc/md')
def doc_md_read():
    id = request.form.get("id")
    if os.path.exists(f"data/{id}.md"):
        with open(f"data/{id}.md", 'r', encoding="utf-8") as fr:
            outp = fr.read()
        return {
            "msg": "ok",
            "data": outp
        }
    else:
        return {
            "msg": "err",
            "data": "no data"
        }

def append_docu_task(docu):
    load_doc_list()
    with open(f"data/doc_list.pkl", 'ab') as fp:
        pickle.dump(docu, fp)

def create_docu_task(data):
    global docu_cache
    docu_cache[data["id"]] = DocumentModel(data)
    
    def execute():
        docu_cache[data["id"]].process()

    tasks.put(execute)

    if docu_cache[data["id"]].status == None:
        append_docu_task(DocumentAbout(data))

def load_docu(id):
    global docu_cache
    if docu_cache.get(id) == None:
        docu_cache[id] = DocumentModel({"id": id, "type": "query"})
        docu_cache[id].process()


@sio.on("post-prog")
def check_progress(task_id):
    load_docu(task_id)
    emit("get-prog", (task_id, docu_cache[task_id].processing_status))

@app.post('/upload/<type>')
def onUpload(type):
    if type == "pdf":
        data = pdfUpload(request)
    elif type == "yt":
        data = ytUpload(request)
    if data == None:
        return "An error occured"

    create_docu_task(data)
    
    return {
        "id": data["id"],
        "text": data["text"]
    }


# ================
def load_task():
    global task_cache
    task_cache = []
    if os.path.exists(f"data/task.pkl"):
        with open(f"data/task.pkl", 'rb') as fr:
            try:
                while True:
                    task_cache.append(pickle.load(fr))
            except EOFError:
                pass
    else:
        with open(f"data/task.pkl", 'wb') as fp:
            pass


@app.post('/task/create')
def task_create():
    task = Task(request.form)
    load_task()
    with open(f"data/task.pkl", 'ab') as fp:
        pickle.dump(task, fp)
    return {
        "msg": "ok"
    }


@app.post('/task/read')
def task_read():
    load_task()
    return {
        "msg": "ok",
        "data": json.loads(json.dumps(task_cache, default=vars))
    }


# ================
def load_note():
    global note_cache
    note_cache = []
    if os.path.exists(f"data/note.pkl"):
        with open(f"data/note.pkl", 'rb') as fr:
            try:
                while True:
                    note_cache.append(pickle.load(fr))
            except EOFError:
                pass
    else:
        with open(f"data/note.pkl", 'wb') as fp:
            pass


@app.post('/note/create')
def note_create():
    note = Note(request.form)
    load_note()
    with open(f"data/note.pkl", 'ab') as fp:
        pickle.dump(note, fp)
    return {
        "msg": "ok"
    }


@app.post('/note/read')
def note_read():
    load_note()
    return {
        "msg": "ok",
        "data": json.loads(json.dumps(note_cache, default=vars))
    }


dataset = pd.read_csv('dataset/dataset.csv', compression='gzip')


class params(BaseModel):
    n_neighbors: int = 5
    return_distance: bool = False

@app.post('/recommend')
def get_recommend():
    input_form = request.form
    meals_calories_perc = {'breakfast': 0.35, 'lunch': 0.40, 'dinner': 0.25}
    plans = ["Maintain weight", "Mild weight loss", "Weight loss", "Extreme weight loss"]
    losses = [1, 0.9, 0.8, 0.6]
    weight_plan = input_form['weight_plan']
    weight_loss = losses[plans.index(weight_plan)]
    person = Person(age=float(input_form['age']),
                    height=float(input_form['height']),
                    weight=float(input_form['weight']),
                    gender=input_form['gender'],
                    activity=input_form['activity'],
                    meals_calories_perc=meals_calories_perc,
                    weight_loss=weight_loss)
    output = person.generate_recommendations()
    calculator = {}
    maintain_calories = person.calories_calculator()
    loss_per_week = ['0 kg', '0.25 kg', '0.5 kg', '1 kg']
    for plan,loss,lpw in zip(plans,losses, loss_per_week):
        calculator[plan] = {
            'calories_per_week': round(maintain_calories * loss),
            'loss_per_week': lpw
        }
    if output is None:
        return {"output": None}
    else:
        return {
            "bmi": person.calculate_bmi(),
            "status": person.display_result(),
            "diet": output,
            "calories_calculator": calculator
        }

# ================
def load_msg(id):
    global msg_cache
    msg_cache[id] = []
    if os.path.exists(f"data/chat_{id}.pkl"):
        with open(f"data/chat_{id}.pkl", 'rb') as fr:
            try:
                while True:
                    msg_cache[id].append(pickle.load(fr))
            except EOFError:
                pass
    else:
        with open(f"data/chat_{id}.pkl", 'wb') as fp:
            pass


def append_msg(id: str, sender, msg):
    load_msg(id)
    with open(f"data/chat_{id}.pkl", 'ab') as fp:
        pickle.dump([sender, msg], fp)


@app.post('/msg/read')
def on_load_past_msg():
    req = request.form
    id = req.get("id")
    load_msg(id)
    global msg_cache
    return {
        "msg": "ok",
        "data": json.loads(json.dumps(msg_cache[id][-int(req.get("num")):], default=vars))
    }


@sio.on("post-msg")
def on_msg_received(id: str, msg: str):
    logInfo(f"Received msg: {id}: {msg}")
    append_msg(id, 1, {
        "msg": msg,
        "type": "normal",
        "data": ""
    })
    if id == "chat":
        global pp_time
        res = chat(msg, pp_time)
        if res.get("type") == "ignore":
            return
    else:
        load_docu(id)
        res = {
            "msg": docu_cache[id].query(msg),
            "type": "normal",
            "data": ""
        }
    append_msg(id, 0, res)
    logInfo(f"Sent response: {id}: {res}")
    emit("get-msg", (id, 0, res))


# ================
@sio.on("connect")
def onConnect():
    emit("get-join", "connected")
    logInfo("connected, test data sent")


@sio.on("disconnect")
def onDisconnect():
    logInfo("disconnected")


# ================[LMAO]================
@app.get('/pp')
def pp():
    global pp_time
    if pp_time:
        pp_time = False
        print("Switched to normal mode")
        return "Switched to normal mode"
    else:
        pp_time = True
        print("Switched to knowledge graph mode")
        return "Switched to knowledge graph mode"

if __name__ == '__main__':
    sio.run(app, host="0.0.0.0", port=8000, debug=True)
