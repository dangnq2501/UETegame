class Element:

    def __init__(self):
        self.text = ""
        self.image = None
        self.inline_image = None
        self.italic = False
        self.bold = False
        self.underline = False
        self.color = None

    def is_concatable_with(self, element):
        if self.image != None or element.image != None:
            return False
        return self.italic == element.italic and self.bold == element.bold and self.underline == element.underline and self.color == element.color

    def concat(self, element):
        self.text += element.text

    def __eq__(self, other):
        return self.text == other.text and self.image == other.image and self.inline_image == other.inline_image and self.italic == other.italic and self.bold == other.bold and self.underline == other.underline and self.color == other.color

    def __str__(self):
        if self.image != None:
            return f"[image: {self.image}]"

        if self.inline_image != None:
            return f"[inline image: {self.inline_image}]"

        text = self.text

        if self.italic:
            text = "_" + text + "_"
        if self.bold:
            text = "*" + text + "*"
        if self.underline:
            text = "~" + text + "~"

        return text
