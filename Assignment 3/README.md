# Assignment: LLM Fine-Tuning, Pretraining, and Reward Modeling with Unsloth

### 1. Fine-Tuning Various LLM Models

To ensure faster execution and efficient resource usage, I fine-tuned the following smaller models:

- **Qwen 3 (7B):** 
   - **Use case:** Coding task fine-tuning
   - **Input format:** JSON-based dataset of simple coding problems
   - **Dataset:** code_x_glue_cc_code_completion_token dataset

- **Phi-3 (medium, 3B):**
   - **Use case:** Text classification for sentiment analysis
   - **Input format:** Labeled data in CSV format
   - **Dataset:** IMDB sentiment data

- **Gemma 2 (2B):**
   - **Use case:** Conversational chat model for small talk
   - **Input format:** Text-based conversational logs
   - **Dataset:** Daily Dialogue Dataset

- **Mistral Nemo (12B):**
   - **Use case:** Medical Advisor
   - **Input format:** Textual Question From Patient
   - **Dataset:** Medical Questions Pairs 

Each fine-tuning task focused on quick turnaround and minimal compute requirements by using smaller datasets and compact models.

<a href='https://youtu.be/4ODW7AhOlGg'> checkout the demo here </a>

### 2. Continued Pretraining

I used [Unsloth AI](https://docs.unsloth.ai/basics/continued-pretraining) to perform continued pretraining on **Phi 3** to learn a new language (Gujarati). By keeping the model size small, I ensured fast execution during the pretraining process.

<a href = 'https://youtu.be/npC29msCl1o'> Checkout the Demo on how it turned out </a>

### 3. Chat Templates

I created several chat templates using smaller models:

Covered in the finetuning (1) (all 4 usecases have custom templates) and continued pretraining (2). All the chat templates are custom.

### 4. Reward Modeling

For reward modeling, I used [Unsloth’s reward modeling documentation](https://docs.unsloth.ai/basics/reward-modelling-dpo-and-orpo) with smaller models:

- **Gemma 2B:** Fine-tuned using DPO, ORPO to optimize small-scale conversational tasks.

<a href='https://youtu.be/NE9PjRSuS7o'> Checkout the Demo </a> 

### 5. Continued Fine-Tuning from Custom Checkpoints

I continued fine-tuning the **Mistral Nemo** model from a custom checkpoint to run some more steps for the Medical Advisor Usecase.

<a href='https://youtu.be/E0SaalWoaR0'> Demo Link </a>

### 6. Fine-Tuning for Mental Health Chatbot Development

For this task, I fine-tuned **Mistral Nemo** on a small dataset (Medical Questions Pairs) of mental health support conversations. This process was streamlined using [this tutorial](https://medium.com/@mauryaanoop3/fine-tuning-microsoft-phi3-with-unsloth-for-mental-health-chatbot-development-ddea4e0c46e7).

<a href='https://youtu.be/4ODW7AhOlGg'> checkout the demo here (last usecase) </a>

### 7. Exporting Fine-Tuned Models to Ollama

After fine-tuning **TinyLlama (1B)**, I exported it to [Ollama](https://docs.unsloth.ai/tutorials/how-to-finetune-llama-3-and-export-to-ollama) for inference deployment. The smaller model size ensured quicker export and faster inference testing.

