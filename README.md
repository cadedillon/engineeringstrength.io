# EngineeringStrength.io – ML Integration Roadmap

## Phase 1: Data Preparation

- [ ] Collect labeled video clips for 3–5 core movements (e.g., back lever, straddle planche, handstand)
- [ ] Run PoseNet or MoveNet on each clip to extract joint keypoints over time
- [ ] Convert keypoints to meaningful features:
  - [ ] Joint angles
  - [ ] Velocities or temporal derivatives
  - [ ] Normalized positions (height/width scaled)
- [ ] Structure dataset (e.g., JSON, CSV, or SQLite):
  - `video_id, timestamp, joint_features..., label`
- [ ] Optionally: add quality labels (e.g., 0–1 score, “good”, “okay”, “bad”)

## Phase 2: Model Training

- [ ] Choose target task:
  - [ ] Classification (e.g., movement type)
  - [ ] Regression (e.g., pose quality score)
- [ ] Choose model type:
  - [ ] Random Forest / XGBoost (tabular joint features)
  - [ ] MLP or 1D CNN (sequential joint data)
  - [ ] LSTM (optional, for temporal pattern modeling)
- [ ] Train baseline model on extracted features
- [ ] Evaluate using accuracy, precision/recall (classification) or MSE/R² (regression)
- [ ] Save trained model (e.g., `model.pkl`, `model.pt`)

## Phase 3: API & Backend Integration

- [ ] Create inference script that loads model and accepts JSON input
- [ ] Build REST API using FastAPI or Flask:
  - [ ] `/predict_movement`: returns predicted movement class
  - [ ] `/score_quality`: returns quality score/confidence
- [ ] Optionally: deploy model using Docker or AWS Lambda

## Phase 4: Frontend Visualization

- [ ] Update UI to accept model output:
  - [ ] Overlay predicted label and confidence
  - [ ] Color-code joint quality (green/yellow/red)
- [ ] Show score trend across time (line chart or heatmap)
- [ ] Allow user feedback (“was this correct?”)

## Phase 5: Documentation & Showcase

- [ ] Write README with system architecture diagram
- [ ] Include model training and evaluation notebooks
- [ ] Create demo video or Streamlit preview
- [ ] Publish a blog post: "Building a Movement Classifier with Pose Estimation and ML"

## Bonus / Stretch Goals

- [ ] Add self-supervised feedback loop (user tags improve model)
- [ ] Train a temporal segmentation model for automatic hold detection
- [ ] Experiment with a small 3D CNN or Vision Transformer (if compute budget allows)
