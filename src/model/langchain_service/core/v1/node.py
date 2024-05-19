import docx


class Node:
    """
    A node in a paragraph.

    It can be a text, an image, or an inline image.
    """

    def __init__(self):
        self.text: str | None = None
        self.image: str | None = None
        self.inline_image: str | None = None
        self.italic: bool | None = None
        self.bold: bool | None = None
        self.underline: bool | None = None
        self.color: docx.shared.RGBColor | None = None  # type: ignore
        self.super_script: bool | None = None
        self.sub_script: bool | None = None

    def get_json(self):
        if self.text is not None and self.text.strip() != '':
            return self.text
        elif self.image is not None:
            return {'image': self.image}
        elif self.inline_image is not None:
            return {'inline_image': self.inline_image}

    def is_concatable_with(self, other):
        """Check if this node is concatable with the other node."""
        if self.text is None:
            return False

        return self.italic == other.italic and self.bold == other.bold and self.underline == other.underline and self.color == other.color and self.super_script == other.super_script and self.sub_script == other.sub_script

    def count_diff(self, other):
        """Count the number of different styles between this node and the other node."""
        count = 0

        if self.italic != other.italic:
            count += 1

        if self.bold != other.bold:
            count += 1

        if self.underline != other.underline:
            count += 1

        if self.color != other.color:
            count += 1

        return count

    def concat(self, other):
        """Concat the other node to this node."""
        self.text += other.text

    def __str__(self):
        if self.image is not None:
            return "[image:{}]".format(self.image)

        if self.inline_image is not None:
            return "[inline_image:{}]".format(self.inline_image)

        return self.text
