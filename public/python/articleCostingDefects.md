<!-- Ch1 -->
# Industrial Casting Defect Detection with Transfer Learning

This notebook demonstrates how to apply transfer learning for image classification to detect defects in casting products, using a real-world industrial dataset.

---

🧠 Model Architecture & Training Strategy
For this classification task, we leverage transfer learning by adapting a pretrained convolutional neural network from the torchvision.models library—specifically, ResNet18. This architecture is well-suited for image-based tasks and has been extensively validated on large-scale datasets like ImageNet.

We replace the final fully connected layer of ResNet18 with a custom output layer tailored for binary classification ("defective" vs. "ok"). The network is then fine-tuned on our casting dataset, allowing it to adapt its learned features to the specific patterns in industrial X-ray images.

---

### 📁 Dataset

The data comes from [this Kaggle dataset](https://www.kaggle.com/datasets/ravirajsinh45/real-life-industrial-dataset-of-casting-product), which contains X-ray images of automotive casting components labeled as either "defective" or "ok".
number of train images 
  - defect 3758
  - ok 2875


---

### 📊 Model Architecture & Training Strategy

We utilize ResNet18, a residual convolutional neural network known for its performance and simplicity. Instead of training from scratch, we adapt a pretrained model as follows:

Load pretrained ResNet18

Replace the final classification layer to output 2 classes

Fine-tune the model on the industrial dataset

```python
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 2)
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
```

### 🎯 Results after 3rd epoch (used for validation):
- Test Accuracy: 99.72%
- Validation Loss: 0.0304

<figure>
  <img src="https://raw.githubusercontent.com/svehla-lukas/Kaggle_workShop/refs/heads/main/casting_product_quality_inspection/trainingLoss.png" style="max-width: 75%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: Training loos
  </figcaption>
</figure>

### 🧪 Test Predictions on the Test Dataset
Number of test images:
- Defective: 453
- OK: 262

Result: 
- ✅ Correct: 713
- ❌ Incorrect (Misses): 2
- 🎯 Accuracy: 99.72%

### 📸  visual grid of model predictions

<figure>
  <img src="https://raw.githubusercontent.com/svehla-lukas/Kaggle_workShop/refs/heads/main/casting_product_quality_inspection/validation.png" style="max-width: 100%; height: auto;" alt="Incorrect predictions by CNN" />
  <figcaption style="text-align: center; font-size: 14px; ">
    Figure: Test results on validation dataset
  </figcaption>
</figure>

---



