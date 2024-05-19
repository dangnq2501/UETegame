QUIZ2QUIZ_TEMPLATE = """Your job is extracting and generating quiz questions from text.
Questions must have 4 choices. Otherwise, skip the question.
If no question can be generated, respond with "<empty>".
Correct choice can have different styles from other choices.
_text_ is italicized
~text~ is underlined
*text* is bolded

Text 1:
<Begin Document>
Question 23: Fill in the blank: I am a __________.
_a_. student b. teacher c. doctor d. engineer

Question 46: In their ~pioneering~ research, they found that the learning needs of the two groups
of learners were quite ~distinctive~ from each other, and the  ~control~ group whose learning needs were
stronger performed better than the ~comparative~ group.
<End Document>
Result 1:
<question>
23
Fill in the blank: I am a __________.
A. student
B. teacher
C. doctor
D. engineer
Answer: A
<question>
46
In their ~pioneering~ research, they found that the learning needs of the two groups of learners were quite ~distinctive~ from each other, and the ~control~ group whose learning needs were stronger performed better than the ~comparative~ group.
A. pioneering
B. distinctive
C. control
D. comparative
Answer: None

Text 2:
<Begin Document>
{document}
<End Document>
Result 2:
"""

DOC2QUIZ_TEMPLATE = """You are a teacher and you want to generate quiz questions from a document.
A quiz question has 4 choices and 1 correct answer.
Easy questions should be directly stated in the document.
Medium questions should be based on the information in the current document but not directly stated.
Hard questions should be based on the information in the document but not directly stated and require some reasoning and inference.
If no question can be generated, respond with "<empty>"
Generate atleast 3 easy questions, 1 medium questions.

Document 1:
<Begin Document>
Hà Nội là thủ đô của Việt Nam. Hà Nội nằm ở phía Bắc Việt Nam.
<End Document>
Result 1:
<question>
1
Thành phố nào là thủ đô của Việt Nam?
A. Hà Nội
B. Hồ Chí Minh
C. Đà Nẵng
D. Hải Phòng
Answer: A
Difficulty: easy
<question>
2
Hà Nội năm ở đâu?
A. Phía Bắc Việt Nam
B. Phía Nam Việt Nam
C. Phía Đông Việt Nam
D. Phía Tây Việt Nam
Answer: A
Difficulty: easy

Document 2:
<Begin Document>
Washington, D.C., formally the District of Columbia and also known as D.C. or Washington, is the capital city of the United States of America.
<End Document>
Result 2:
<question>
1
What is the capital city of the United States of America?
A. Washington, D.C.
B. New York
C. Los Angeles
D. Chicago
Answer: A
Difficulty: easy
<question>
2
What is the full name of Washington, D.C.?
A. District of Columbia
B. Washington
C. Washington, D.C.
D. United States of America
Answer: A
Difficulty: easy

Document 3:
<Begin Document>
{document}
<End Document>
Result 3:
"""
