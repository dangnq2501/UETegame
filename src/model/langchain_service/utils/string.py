import re

def is_index_number(text):
  """Checks if the given text is an index number."""

  return re.match(r"^\d+[,.:);/]?$", text.strip()) is not None

def is_index_letter(text):
  """Checks if the given text is an index letter."""

  return re.match(r"^[A-D][,.:);/]?$", text.strip()) is not None

def extract_index_number(text):
  """Extracts the index number from the given text."""

  return re.match(r"\d+", text.strip()).group(0)

def extract_index_letter(text):
  """Extracts the index letter from the given text."""

  return re.match(r"[A-D]", text.strip()).group(0)