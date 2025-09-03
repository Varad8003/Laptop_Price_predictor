# Laptop Price Prediction

## Project Overview
The Laptop Price Prediction project is a **machine learning-based application** that predicts the price of a laptop based on its specifications. The system uses real-world features like brand, RAM, storage, screen size, processor, and GPU to estimate the price accurately.  

This project demonstrates **data preprocessing, feature engineering, and deployment** using a **Flask backend API**.

---

## Features
- Predicts laptop prices based on specifications.
- Handles categorical and numerical features using preprocessing pipelines.
- Converts log-transformed prices back to the original scale.
- REST API implemented using Flask for easy integration.
- CORS enabled to allow requests from any frontend.

---

## Dataset
The dataset contains information about laptops from multiple brands:

| Feature        | Description                                      |
|----------------|--------------------------------------------------|
| Company        | Brand of the laptop (Dell, HP, Asus, etc.)      |
| TypeName       | Type of laptop (Notebook, Ultrabook, etc.)      |
| Ram            | RAM size in GB                                   |
| Weight         | Weight in kilograms                              |
| TouchScreen    | Whether it has a touchscreen (1 = Yes, 0 = No)  |
| IPS            | IPS display (1 = Yes, 0 = No)                   |
| ppi            | Pixel per inch of the display                    |
| Cpu brand      | CPU manufacturer (Intel, AMD, etc.)             |
| HDD            | Hard disk size in GB                             |
| SSD            | SSD size in GB                                   |
| Gpu brand      | GPU brand                                        |
| os             | Operating system                                 |
| Price          | Target variable (Laptop price in INR)           |

> Note: The price column is log-transformed in the model for better prediction accuracy.

---

## Tech Stack
- **Backend:** Python, Flask, Flask-CORS
- **Machine Learning:** scikit-learn, pandas, numpy
- **Data Storage:** Pickled model (`pipe.pkl`) and dataset reference (`df.pkl`)

---

## Installation
1. Clone the repository:

```bash
git clone https://github.com/Varad8003/Laptop_Price_predictor.git
cd Laptop_Price_predictor
