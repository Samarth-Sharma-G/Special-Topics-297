import weaviate
import pdf2txt
import os
import glob
from weaviate.classes.init import Auth
import weaviate.classes as wvc
import json
import openai
from PyPDF2 import PdfReader
from io import StringIO
import time

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

def load_documents(directory):
    documents = []
    file_paths = glob.glob(os.path.join(directory, "*.pdf"))
    
    for fp in file_paths:
        try:
            reader = PdfReader(fp)
            text = ""
            for page in reader.pages:
                text += page.extract_text()  # Combine all pages into a single string
            
            documents.append((text, os.path.basename(fp)))  # Add file name to metadata
        except Exception as e:
            print(f"Warning: The file {fp} could not be processed. Error: {e}")
    
    return documents

# Function to split text into overlapping chunks
def split_text_into_chunks(text, chunk_size=200, overlap=40):
    chunks = []
    start = 0
    while start < len(text):
        if start + chunk_size > len(text):
            chunks.append(text[start:len(text)])
        else:
            chunks.append(text[start:start+chunk_size])
        start += chunk_size - overlap  # Apply overlap
    return chunks

# Function to upsert chunks into Weaviate
def upsert_to_weaviate(client, class_name, chunks):

    if not client.collections.exists(class_name):
        try:
            books = client.collections.create(
                name=class_name,
                vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(  # Configure vectorizer
                    model="ada", 
                    model_version="002",
                    vectorize_collection_name = False
                ),
                properties=[
                    wvc.config.Property(
                        name="text",
                        data_type=wvc.config.DataType.TEXT,  # Set property type to TEXT
                        vectorize_property_name=True  # Vectorize property name ("text")
                    )
                ]
            )
        finally:
            client.close()

    client = connect_to_weaviate()

    collection = client.collections.get(class_name)
    data_objs = [{"text": chunk} for chunk in chunks]
    
    # Insert objects in batches
    collection.data.insert_many(data_objs)

# Main logic
def process_documents(directory, class_name="books"):
    documents = load_documents(directory)
    client = connect_to_weaviate()

    for doc_text, file_name in documents:
        print(f"Processing {file_name}")
        
        # Split the document text into chunks with overlap
        chunks = split_text_into_chunks(doc_text)
        print(f"Splitting {file_name} into {len(chunks)} chunks")
        
        # Upsert the chunks into Weaviate
        upsert_to_weaviate(client, class_name, chunks)
        print(f"Upserted {file_name} into Weaviate.")
        
        # Clear memory after processing each document
        del doc_text
        del chunks

    client.close()

# Directory containing your PDF documents
directory = "docs"
process_documents(directory)




























