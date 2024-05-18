from dotenv import load_dotenv
load_dotenv()

from functions.chat import chat

while True:
    message = input("You: ")
    print("THT:", chat(message, False)['msg'])
