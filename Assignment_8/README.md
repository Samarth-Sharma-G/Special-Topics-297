# End-to-End RAG-based Book Querying GenAI Application

## Overview
This project demonstrates the development of a Retrieval-Augmented Generation (RAG)-based GenAI application designed to answer user queries related to a collection of books. The application integrates an efficient retrieval mechanism using Weaviate for storing book data in chunks and employs OpenAI's GPT models for generating context-aware answers.

## Features
- **Retrieval-Augmented Generation (RAG):** Combines knowledge retrieval from stored book chunks with generative AI to produce accurate, contextually relevant answers.
- **Efficient Query Handling:** Uses Weaviate for fast vector search to retrieve relevant chunks of book data.
- **Flask Web Application:** A user-friendly interface built with Flask for seamless interactions with the GenAI system.
- **OpenAI Function Calling:** Leverages OpenAI models to generate responses based on the retrieved book content.
- **Scalable and Reliable:** Built with scalability in mind, supporting seamless querying even as the database grows.

## Tech Stack
- **Programming Languages:** Python
- **Web Framework:** Flask
- **LLM:** OpenAI GPT (or other fine-tuned models)
- **Database:** Weaviate for vector search (storing book data in chunks)
- **Deployment:** AWS EC2

## Architecture
1. **Data Storage (Weaviate):** Books are stored as chunks in Weaviate, which allows efficient retrieval based on semantic search.
2. **RAG Pipeline:**
   - User queries are processed and matched with relevant book chunks in Weaviate using vector search.
   - Relevant chunks are retrieved and combined with the query for context and sent to OpenAI for generating responses.
3. **Flask Web Application:** The user interacts with the system through a Flask-based web interface, where queries are submitted, and answers are displayed.
4. **OpenAI Function Calling:** The application uses OpenAI’s function calling mechanism to generate responses based on the retrieved data.
5. **Deployment:** The application is containerized using Docker and deployed on AWS EC2 for scalability and availability.

## Workflow
1. **Query Submission:** Users submit questions via the Flask interface.
2. **Search and Retrieval:** The system queries Weaviate to retrieve the most relevant book chunks based on semantic similarity.
3. **Answer Generation:** The retrieved chunks are passed to OpenAI’s GPT model, which generates a coherent response that combines the query and relevant book data.
4. **Response Delivery:** The generated response is displayed to the user in the Flask interface.

## How It Works
- **Weaviate Integration:** Books are preprocessed and stored in chunks in Weaviate. Each chunk is vectorized for efficient semantic search.
- **OpenAI Function Calls:** The system makes OpenAI function calls to generate responses using the context retrieved from Weaviate.
- **Flask API:** A simple Flask-based API handles incoming user queries, retrieves relevant data, and returns the response from the model.

## Deployment
1. **AWS EC2 Deployment:** The app is hosted on AWS EC2 for high availability and scalability.


