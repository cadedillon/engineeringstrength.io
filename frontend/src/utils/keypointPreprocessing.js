const SMOOTHING_FACTOR = 0.8; // Higher is less smooth, adjust to your needs
let lastSmoothedKeypoints = {}; // Keep track of the last smoothed keypoints

// Function to apply EMA on the keypoints
const preprocessKeyPoints = (keypoints, MIN_CONFIDENCE_THRESHOLD = 0.5) => {
  const bodyKeypoints = keypoints.slice(5); // Exclude the first 5 irrelevant keypoints

  return bodyKeypoints.map((bodyKeypoint) => {
    const { x: currentX, y: currentY, name, score } = bodyKeypoint;

    // Only smooth keypoints with confidence above the threshold
    if (score < MIN_CONFIDENCE_THRESHOLD) {
      return bodyKeypoint; // Return original if score is too low
    }

    const last = lastSmoothedKeypoints[name] || { x: currentX, y: currentY };

    // Apply the EMA formula for smoothing
    const smoothedX =
      SMOOTHING_FACTOR * currentX + (1 - SMOOTHING_FACTOR) * last.x;
    const smoothedY =
      SMOOTHING_FACTOR * currentY + (1 - SMOOTHING_FACTOR) * last.y;

    // Store the smoothed keypoints for future reference
    lastSmoothedKeypoints[name] = { x: smoothedX, y: smoothedY };

    // Return the smoothed keypoint with the updated x and y
    return { ...bodyKeypoint, x: smoothedX, y: smoothedY };
  });
};

module.exports = preprocessKeyPoints;
