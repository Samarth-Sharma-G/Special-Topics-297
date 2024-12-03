# n8n Apps Assignment

This project demonstrates the development of three interconnected applications using the n8n platform, inspired by the "Blue Lock" series. The workflow integrates data processing, AI-powered query resolution, and human escalation for a seamless user experience.

## Demo
Go in the below Order:

<a href='https://youtu.be/iss7rd9J4tI'> Part 2 </a> 

<a href='https://youtu.be/qE_KOfM6dpw'> Part 1 </a>

<a href='https://youtu.be/vdMfneIStNs'> Part 3 </a>

## Apps Overview

### 1. Customer Support Chat Application
A chatbot interface that answers user queries about "Blue Lock" by retrieving relevant context from a Vector Store. This ensures quick and engaging interactions for fans of the series.

![image](https://github.com/user-attachments/assets/fb1a67be-99f8-4578-8d98-f406130b0cc1)

### 2. Backend Triggred Data Processing and Vector Store Population
Changes in a drive folder triggers all the upated/new files being processed, vectorized using OpenAI embeddings, and stored in a Vector Store. This forms the backbone of the chatbot's ability to deliver accurate and meaningful responses.

![image](https://github.com/user-attachments/assets/9650a19d-b8e8-4ca2-9533-3ba822bdde4e)


### 3. Human-in-the-Loop (HITL) System
For unresolved or complex queries, the system escalates to a human agent. The query and partial context are sent via email, ensuring accurate responses and maintaining the personal touch.

![image](https://github.com/user-attachments/assets/d4472f02-982a-418b-b7d7-6d58bddc9596)

![image](https://github.com/user-attachments/assets/aa5538f5-0e8f-47cb-9366-c486b8bd4fd0)



## Workflow Progression

1. **Populating the Vector Store**: Data about "Blue Lock" was detected and automatically processed and embedded to create a searchable database.
2. **Responding to Queries**: The chatbot retrieves answers from the Vector Store for user queries.
3. **Escalation to Humans**: If no relevant context is found, the system sends the query to a human agent via email.

## Tools and Technologies

- **n8n**: Workflow automation and API integration.
- **OpenAI**: For vectorizing "Blue Lock" data and Chat Model
- **Vector Store**: For efficient context retrieval.
- **Human-in-the-Loop Workflow**: Ensures unresolved queries are handled by human agents.
- **Email Integration**: Automates escalation to human agents.

---

This project combines automation and human expertise to deliver a personalized and engaging experience for "Blue Lock" fans.
