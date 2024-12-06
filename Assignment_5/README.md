# Forecasting and Prediction Project

This repository contains completed Colab notebooks for forecasting and anomaly detection with TimeGPT, synthetic data generation with Tabular, and GNN-based tabular predictions using RelBench. Each notebook is fully executed and includes results for review.

## Project Contents

### 1. TimeGPT

Each notebook in this section demonstrates TimeGPT applied to various time series forecasting tasks:
- **Multivariate Forecasting**: generated some random dummy data which had absolutely no pattern so the model did well by performing badly.
- **Fine-Tuning with Custom Data**: Model fine-tuned on custom airline data timeline vs passangers and some good performance.
- **Anomaly Detection**: Time series anomalies detected and visualized with confidence levels.
- **Energy Demand Forecasting**: Energy demand predictions with accurate results.
- **Ethereum Price Prediction**: Ethereum price forecasting with TimeGPT (Not that great and the creators know it cause time can't be the only factor here and we need an extensive dataset with virtually everyting the price depends on - these can be added as exogenous variables).

Each notebook contains step-by-step explanations of setup, training, and visualization.

### 2. Tabular

- **Synthetic Data Generation**: Successfully generated synthetic data for a real dataset.
- **Zero-Shot Inference**: Demonstrated inference on a Tabular model using zero-shot learning.

These notebooks showcase Tabular's capabilities in generating and inferring data.

### 3. RelBench with RDL

- **GNN-Based Model Training**: Trained a GNN-based model for tabular predictions using RelBench, including performance metrics.

## Results and Documentation

All completed notebooks, including artifacts and outputs, are checked in to this repository. 
## Resources

For more information, refer to the documentation links provided in each notebook for TimeGPT, Tabular, and RelBench.
