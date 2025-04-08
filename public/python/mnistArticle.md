<!-- Ch1 -->
# 🧠 MNIST Digit Classification MLP vs CNN

This article shows the difference between two neural networks a simple fully connected network (MLP) and a convolutional neural network (CNN), in the task of classifying handwritten digits from the MNIST dataset.

- MLP - Multiplayer Perceptron
```python
Model: "sequential_MLP"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_12 (Dense)            (None, 32)                25120     
                                                                 
 batch_normalization_2 (Bat  (None, 32)                128       
 chNormalization)                                                
                                                                 
 dropout_5 (Dropout)         (None, 32)                0         
                                                                 
 dense_13 (Dense)            (None, 16)                528       
                                                                 
 dense_14 (Dense)            (None, 10)                170       
                                                                 
=================================================================
Total params: 25946 (101.35 KB)
Trainable params: 25882 (101.10 KB)
Non-trainable params: 64 (256.00 Byte)
```
- CNN - Convolutional Neural Net 
```python
Model: "sequential_CNN"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 reshape_5 (Reshape)         (None, 28, 28, 1)         0         
                                                                 
 conv2d_9 (Conv2D)           (None, 26, 26, 32)        320       
                                                                 
 max_pooling2d_8 (MaxPoolin  (None, 13, 13, 32)        0         
 g2D)                                                            
                                                                 
 conv2d_10 (Conv2D)          (None, 11, 11, 64)        18496     
                                                                 
 max_pooling2d_9 (MaxPoolin  (None, 5, 5, 64)          0         
 g2D)                                                            
                                                                 
 flatten_4 (Flatten)         (None, 1600)              0         
                                                                 
 dense_17 (Dense)            (None, 64)                102464    
                                                                 
 dropout_7 (Dropout)         (None, 64)                0         
                                                                 
 dense_18 (Dense)            (None, 10)                650       
                                                                 
=================================================================
Total params: 121930 (476.29 KB)
Trainable params: 121930 (476.29 KB)
Non-trainable params: 0 (0.00 Byte)
```

<!-- Ch2 -->
# Results
The following image compares the results.
Each digit is accompanied by:
- `MLP Pred`: prediction made by the fully connected network
- `CNN Pred`: prediction made by the convolutional network
- `True`: the ground truth label

#### ✅ Comparison of Correct Predictions
First image shows correct prediction on numbers 
<figure>
  <img src="./python/mnistBothTrue.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: MLP & CNN correct predictions
  </figcaption>
</figure>

#### 🔍 CNN Correct, MLP Incorrect and vica verse
Many of the digits shown have:
- Irregular strokes
- Missing or broken parts
- Unconventional slant or curvature
- Stroke overlaps or incomplete loops

These visual distortions lead to confusion, but **CNNs often succeed where MLPs fail**, thanks to their ability to:
- Focus on **local pixel patterns**
- Detect **edges, corners, and shapes** in a spatial context
- Ignore noise and irrelevant pixel information better than MLPs

However, some digits are so ambiguous (e.g. 2 vs 7, 4 vs 9, 5 vs 3) that both networks struggle.


<figure>
  <img src="./python/mnistMlpFalse.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: MLP incorrect predictions
  </figcaption>
</figure>
<figure>
  <img src="./python/mnistCnnFalse.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px;">
    Figure: CNN incorrect predictions
  </figcaption>
</figure>

#### ⚠️ Cases Where Both Models Failed

text about false values
<figure>
  <img src="./python/mnistBothFalse.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: MLP & CNN incorrect predictions
  </figcaption>
</figure>

While both models perform well on the 1/12 MNIST dataset, **CNNs significantly outperform MLPs** in complex or ambiguous cases due to their hierarchical feature extraction capabilities.

<!-- Ch3 -->
# 🐍 Python script description

## 1. **Loads and normalizes the MNIST dataset (pixel values scaled to [0, 1])**
```python
(x_train_origin, y_train_origin), (x_test_origin, y_test_origin) = (
    keras.datasets.mnist.load_data()
)

x_train_origin = x_train_origin.astype("float32") / 255.0
x_test_origin = x_test_origin.astype("float32") / 255.0
```


## 2. **Splitting Training Data**
```python
train_data, val_data, train_targets, val_targets = train_test_split(...)
```
- Use 5 000 samples from 60,000 database of pictures.
- From 5000 samples 80% for training, 20% for validation.
- Images are flattened from 28×28 into 1D vectors (784) for MLP.


## 3. **Model 1 – Fully Connected Network (MLP)**
```python
network_1 = Sequential([...])
```
- Architecture:
  - `Dense(32)` → `BatchNormalization` → `Dropout(0.2)`
  - `Dense(16)`
  - Output: `Dense(10)` with `softmax`
- Uses **L2 regularization** to prevent overfitting.

```python
network_1.compile(...)  # Adam + sparse_categorical_crossentropy
network_1.fit(...)      # 7 epochs, batch_size=16
```


## 4. **Model 2 – Convolutional Neural Network (CNN)**
```python
network_cnn = Sequential([...])
```
- Architecture:
  - `Conv2D(32)` → `MaxPooling2D`
  - `Conv2D(64)` → `MaxPooling2D`
  - `Flatten()` → `Dense(64)` → `Dropout(0.5)`
  - Output: `Dense(10)` with `softmax`
- Uses 2D input shape: reshapes data to (28, 28, 1).
- Trained for 20 epochs with batch size 32.




## 📊 Final Accuracy Summary

<!-- Comparison Table of Models -->
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; text-align: center;">
  <thead style="background-color: #f2f2f2;">
    <tr>
      <th style="padding: 8px 12px;">Model</th>
      <th style="padding: 8px 12px;">Accuracy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px 12px;">Network 1 (MLP)</td>
      <td style="padding: 8px 12px;">86.7 %</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px;">Network 2 (CNN)</td>
      <td style="padding: 8px 12px;">96.5 %</td>
    </tr>
  </tbody>
</table>



---

## 💡 Key Takeaways
- The simple MLP model performs reasonably well, but CNN significantly improves accuracy.
- CNN better leverages spatial structure through convolutional layers.
- Regularization (L2, Dropout) and BatchNormalization help reduce overfitting and improve stability.
- Visualizations provide important insights into model performance.

---

