<!-- Ch1 -->
# Kaggle Competition: House Prices - Advanced Regression Techniques

## 🏛️ Problem Statement
The goal of this competition is to predict the final price of a house based on various features from Ames, Iowa. The dataset contains both categorical and numerical features describing properties such as lot size, number of rooms, year built, and more.

Link to competition: [Kaggle - House Prices](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques)

---

## ⚖️ My Approach

### ✏️ Data Understanding and Exploration
- Started with exploratory data analysis (EDA) using `pandas` and `seaborn`
- Investigated distributions of key variables like `SalePrice`, `GrLivArea`, and categorical features
- Used the `data_description.txt` file to extract categorical variable mappings automatically

### 📝 Data Preprocessing
- Filled missing values:
  - Numerical: with `-1`
  - Categorical: with `'NA'`
- Applied one-hot encoding to categorical features using `pd.get_dummies`
- Ensured that all possible dummy columns (from training) are added to test data
- Scaled numerical data using `StandardScaler`

### 🧠 Modeling

Built a deep learning regression model using Keras (TensorFlow backend)

Architecture:
- Dense(32) with L2 regularization and ReLU
- Dense(16) with L2 regularization and ReLU
- Output: Dense(1)
- Loss function: Huber
- Optimizer: Adam

Trained for 7 epochs with batch size 16
  - The figure below shows training over 30 epochs, but the final model was trained for only 7 epochs

#### ⚖️ Evaluation

<figure>
  <img src="./python/trainHistory30epoch.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: Training loss & mae 30 epochs
  </figcaption>
</figure>

<figure>
  <img src="./python/housePricetestTarget.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: Test with split train on 1000 values, test on 430 values
  </figcaption>
</figure>

---

## 📊 Challenges Faced
- Misinterpreting the `sample_submission.csv` as ground truth — important to know it's just a template
- Feature drift between train and test sets — distribution mismatch affected prediction quality

---