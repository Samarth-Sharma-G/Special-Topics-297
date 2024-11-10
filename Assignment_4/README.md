# n8n Apps Assignment

This project demonstrates the development of three distinct applications using the n8n platform. Each application showcases the versatile capabilities of n8n for workflow automation and integration with external systems.

## Apps Overview

### 1. Customer Support Chat Application
A chatbot frontend is created to simulate customer support interactions. This application handles common customer queries and provides automated responses, improving user experience and reducing response time.

### 2. Backend-Triggered Email System
This app is designed to be triggered by backend events, such as Kafka messages. Upon receiving an event, the system automatically sends out an email to relevant stakeholders, streamlining communication within the workflow.

### 3. Human-in-the-Loop (HITL) System
An AI-powered system is integrated with a human escalation process. When the AI cannot resolve a query or action, the system automatically escalates the task to a human agent for intervention, ensuring seamless workflow continuity and enhanced decision-making.

## Tools and Technologies Used
- **n8n**: A low-code platform for automating workflows and integrating various APIs and services.
- **Kafka**: Used for triggering backend processes in the email system.
- **Human-in-the-Loop Workflow**: Integration of human agents when AI cannot process a request.
