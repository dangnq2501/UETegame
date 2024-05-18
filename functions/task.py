import json


class Task():
    def __init__(self, data = {}):
        self.name = data.get("name") or "Empty"
        self.details = data.get("details") or "Empty"
        self.type = data.get("type") or "Task"
        self.time = data.get("time") or 0
        self.priority = data.get("priority") or 0