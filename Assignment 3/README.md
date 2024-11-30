# Assignment: LLM Fine-Tuning, Pretraining, and Reward Modeling with Unsloth

### 1. Fine-Tuning Various LLM Models

To ensure faster execution and efficient resource usage, I fine-tuned the following smaller models:

- **Llama 3 (7B):** 
   - **Use case:** Coding task fine-tuning
   - **Input format:** JSON-based dataset of simple coding problems
   - **Dataset:** Small subset of StackOverflow coding dataset

- **Phi-3 (medium, 3B):**
   - **Use case:** Text classification for sentiment analysis
   - **Input format:** Labeled data in CSV format
   - **Dataset:** Small portion of the Sentiment140 dataset

- **Gemma 2 (2B):**
   - **Use case:** Conversational chat model for small talk
   - **Input format:** Text-based conversational logs
   - **Dataset:** A smaller dataset from OpenDialogue

- **TinyLlama (1B):**
   - **Use case:** Language modeling task
   - **Input format:** Text data for simple sentence completion tasks
   - **Dataset:** Small text dataset for sentence generation

Each fine-tuning task focused on quick turnaround and minimal compute requirements by using smaller datasets and compact models.

### 2. Continued Pretraining

I used [Unsloth AI](https://docs.unsloth.ai/basics/continued-pretraining) to perform continued pretraining on **Phi 3** to learn a new language (Gujarati). By keeping the model size small, I ensured fast execution during the pretraining process.

<a href = 'https://youtu.be/npC29msCl1o'> Checkout the Demo on how it turned out </a>

### 3. Chat Templates

I created several chat templates using smaller models:

- **Phi-3 (medium, 3B):** Trained on a classification task for short user queries.
- **TinyLlama (1B):** Used for conversational tasks and extended max context size to handle longer queries with reduced dataset sizes.

### 4. Reward Modeling

For reward modeling, I used [Unsloth’s reward modeling documentation](https://docs.unsloth.ai/basics/reward-modelling-dpo-and-orpo) with smaller models:

- **Gemma 2B:** Fine-tuned using DPO, ORPO to optimize small-scale conversational tasks.

<a href='https://youtu.be/NE9PjRSuS7o'> Checkout the Demo </a> 

### 5. Continued Fine-Tuning from Custom Checkpoints

I fine-tuned the **Gemma 2 (2B)** model from a custom checkpoint to showcase the ability to extend its knowledge for a chatbot use case, keeping the dataset and task size minimal for faster execution.

### 6. Fine-Tuning for Mental Health Chatbot Development

For this task, I fine-tuned **TinyLlama (1B)** on a small dataset of mental health support conversations. This process was streamlined using [this tutorial](https://medium.com/@mauryaanoop3/fine-tuning-microsoft-phi3-with-unsloth-for-mental-health-chatbot-development-ddea4e0c46e7).

### 7. Exporting Fine-Tuned Models to Ollama

After fine-tuning **TinyLlama (1B)**, I exported it to [Ollama](https://docs.unsloth.ai/tutorials/how-to-finetune-llama-3-and-export-to-ollama) for inference deployment. The smaller model size ensured quicker export and faster inference testing.

### 8. Videos of Execution

Each task was recorded, and videos were uploaded to demonstrate:

- **Fine-tuning tasks** for each model.
- **Pretraining a model** in a new language.
- **Chat template creation** and model optimization.
- **Reward modeling** using ORPO and DPO.
- **Exporting a model** to Ollama and running inference.
