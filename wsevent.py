from flask import request
from flask_socketio import emit

try:
    from __main__ import sio
except ImportError:
    from server import sio

def logInfo(msg):
    print(f"[sid=SERVER]: {msg}.")

def update_progress(id, val):
    logInfo(f"Progress updated: {id}: {(val*100)}%")
    sio.emit("get-prog", (id, val))

def send_msg(id, sender, msg):
    logInfo(f"Sent response: {id}: {msg}")
    sio.emit("get-msg", (id, sender, msg))
    from server import append_msg
    append_msg(id, sender, msg)