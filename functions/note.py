import json


class Note():
    def __init__(self, data = {}):
        self.name = data.get("name") or "Empty"
        self.details = data.get("details") or "Empty"
        self.priority = data.get("priority") or 0