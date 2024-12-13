
from flask import Flask, render_template, request, jsonify
import weaviate
import openai
from weaviate.classes.init import Auth
import json
from flask_cors import CORS
import json
import time
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = Flask(__name__)
CORS(app)
key = "sk-proj-mask-GptMZCjuLqVRwiJ-61k34pbWD_8CmAA"
lm_client = openai.OpenAI(api_key=key)

# Define function to connect to Weaviate
def connect_to_weaviate():
    client = weaviate.connect_to_weaviate_cloud(
        cluster_url="https://airyzxxrtqcwdjverjmpba.c0.us-west3.gcp.weaviate.cloud",
        auth_credentials=Auth.api_key("lKbPFfjlG1BvfMf1OVwxYTya4rdN4aXeOQxU"),
        headers={'X-OpenAI-Api-key': key}
    )
    return client


weaviate_client = connect_to_weaviate()

custom_functions_1 = [
    {
        "name": "return_response",
        "description": "Function to be used to return the response to the question, and a boolean value indicating if the information given was suffieicnet to generate the entire answer.",
        "parameters": {
            "type": "object",
            "properties": {
                "response": {
                    "type": "string",
                    "description": "This should be the answer that was generated from the context, given the question",
                },
                "sufficient": {
                    "type": "boolean",
                    "description": "This should represent wether the information present in the context was sufficent to answer the question. Return True is it was, else False.",
                },
            },
            "required": ["response", "sufficient"],
        },
    }
]

def ask_gpt_fast(question, context):
    user_message = "Question: \n\n" + question + "\n\n\nContext: \n\n" + context
    system_message = "You will be given context from several pdfs, this context is from several chunks, retrived from a vector DB. You will also be given a question. Formulate an answer strictly in the 'language of the Question', Only using the context, and nothing else. {} Return the text response and a boolean value indicating if the information from the context was enough to answer the question. Return true if it was, False if it wasnt. Return the response, which is the answer to the question asked. If the answer cannot be formulated using the context, say that it is not possile. The reader of your response does not have any idea of the 'context' being passed. Do not reference the presence of the context in the final response, just provide the answer directly."

    msg = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message},
    ]
    response = lm_client.chat.completions.create(
        model="gpt-4o",
        messages=msg,
        max_tokens=4000,
        temperature=0.0,
        functions=custom_functions_1,
        function_call={"name": "return_response"},
    )

    reply = json.loads(response.choices[0].message.function_call.arguments)[
        "response"
    ]
    sufficient = json.loads(response.choices[0].message.function_call.arguments)[
        "sufficient"
    ]
    
    return reply, sufficient

def qdb(query, db_client, name, limit=1000):
    context = None
    metadata = []
    try:
        # Perform the query using V4 API
        res = db_client.collections.get(name).query.near_text(
            query=query, 
            limit=limit,
            )
        
        context = ""
        for obj in res.objects:
            context += obj.properties["text"] + "\n\n"

    except Exception as e:
        print("Exception in DB, dude.")
        print(e)
        time.sleep(3)
    return context


def main_pipeline(query):
    context = qdb(query, weaviate_client, "books", 10)
    reply, sufficient = ask_gpt_fast(query, context)
    if not sufficient:
        return 'cant find answer'
    
    return (reply)

@app.route('/')
def home():
    return render_template('chat.html')

@app.route('/search', methods=['POST'])
def search():
    try:
        print("start")
        print("request is",request.json)
        question = request.json.get('question')  

        print(question)
        reply= main_pipeline(question)
        print("Answer is:", reply)
        return jsonify({'answer': reply})
    except Exception as e:
        print(e)
        return jsonify({'answer':"cant find answer due to system error"})

if __name__ == "__main__":

    app.run(host = '127.0.0.1', port = 6022,debug=True)