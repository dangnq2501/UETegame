import flask
import re
import hashlib
from pypdf import PdfReader

def pdfUpload(request: flask.Request):
    if 'file' not in request.files:
        return None

    file = request.files['file']

    if file.filename == None:
        return None

    # only accept pdf
    if file.filename.split('.')[-1] != 'pdf':
        return None
    
    # extract text from pdf file
    pdf_reader = PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    
    # cleanup
    text = re.sub(' +', ' ', text)
    text = re.sub(r' \n+', '\n', text)
    text = re.sub(r'\n', ' \n ', text)

    # save the id as a blake2 hash (only take the first 32 char)
    file_hash = hashlib.blake2b()
    while chunk := file.stream.read(8192):
        file_hash.update(chunk)

    return {
        "id": f"pdf_{file_hash.hexdigest()[:32]}",
        "text": text,
        "name": file.filename,
        "type": "pdf"
    }

