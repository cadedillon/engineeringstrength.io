// Keep a history of keypoints
let lastGoodKeypoints = {};

// Minimum confidence threshold for displaying keypoints
const MIN_CONFIDENCE_THRESHOLD = 0.3;

// Draw keypoints on the canvas
const drawKeypoints = (keypoints, ctx) => {
  keypoints.forEach((keypoint) => {
    const { x, y, score } = keypoint; // Destructure x, y, and score from keypoint
    if (score > MIN_CONFIDENCE_THRESHOLD) {
      // Only draw keypoints with a confidence score above 0.5
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "aqua"; // Set the color for the keypoints
      ctx.fill();

      // Store the keypoint position for future interpolation
      lastGoodKeypoints[keypoint.name] = { x, y };
    } else if (lastGoodKeypoints[keypoint.name]) {
      // If the confidence is too low, use the last known good keypoint
      const { x, y } = lastGoodKeypoints[keypoint.name];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "yellow"; // Mark interpolated keypoints with a different color
      ctx.fill();
    }
  });
};

// Draw skeleton on the canvas
const drawSkeleton = (keypoints, ctx) => {
  const adjacentKeyPoints = [
    [5, 6], // Shoulders
    [5, 7], // Left shoulder to left elbow
    [7, 9], // Left elbow to left wrist
    [6, 8], // Right shoulder to right elbow
    [8, 10], // Right elbow to right wrist
    [5, 11], // Left shoulder to left hip
    [6, 12], // Right shoulder to right hip
    [11, 13], // Left hip to left knee
    [13, 15], // Left knee to left ankle
    [12, 14], // Right hip to right knee
    [14, 16], // Right knee to right ankle
  ];

  adjacentKeyPoints.forEach(([fromIdx, toIdx]) => {
    const from = keypoints[fromIdx];
    const to = keypoints[toIdx];

    if (
      from.score > MIN_CONFIDENCE_THRESHOLD &&
      to.score > MIN_CONFIDENCE_THRESHOLD
    ) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "lime";
      ctx.stroke();
    } else if (lastGoodKeypoints[from.name] && lastGoodKeypoints[to.name]) {
      // Interpolate lines if confidence is low
      const { x: fromX, y: fromY } = lastGoodKeypoints[from.name];
      const { x: toX, y: toY } = lastGoodKeypoints[to.name];

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "orange"; // Different color for interpolated lines
      ctx.stroke();
    }
  });
};

module.exports = {
  drawKeypoints,
  drawSkeleton,
};
