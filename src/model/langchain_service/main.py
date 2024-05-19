from core.v2.doc2quiz_converter import Doc2QuizConverter
from core.v2.scanner import DocxScanner

scanner = DocxScanner('assets/iaihackathon.docx')
scanner.scan_elements()

full_text = scanner.text()

converter = Doc2QuizConverter(full_text)
converter.convert()

for question in converter.questions:
    print(question["content"], question["difficulty"])
