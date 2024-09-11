const SMOOTHING_FACTOR = 0.8; // Higher is less smooth, adjust to your needs

// Keep track of the last smoothed keypoints
let lastSmoothedKeypoints = {};

// Function to apply EMA on the keypoints
const smoothKeypoints = (keypoints) => {
  return keypoints.map((keypoint) => {
    const { x: currentX, y: currentY, name } = keypoint;
    const last = lastSmoothedKeypoints[name] || { x: currentX, y: currentY };

    // Apply the EMA formula
    const smoothedX =
      SMOOTHING_FACTOR * currentX + (1 - SMOOTHING_FACTOR) * last.x;
    const smoothedY =
      SMOOTHING_FACTOR * currentY + (1 - SMOOTHING_FACTOR) * last.y;

    // Store the smoothed keypoints for future reference
    lastSmoothedKeypoints[name] = { x: smoothedX, y: smoothedY };

    // Return the smoothed keypoint
    return { ...keypoint, x: smoothedX, y: smoothedY };
  });
};

module.exports = smoothKeypoints;
