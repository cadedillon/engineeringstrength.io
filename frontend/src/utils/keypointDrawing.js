// Keep a history of keypoints
let lastGoodKeypoints = {};

// Minimum confidence threshold for displaying keypoints
const MIN_CONFIDENCE_THRESHOLD = 0.3;

// Draw keypoints on the canvas
const drawKeypoints = (keypoints, ctx, visibleSide) => {
  const sideJoints =
    visibleSide === "left"
      ? [
          "left_shoulder",
          "left_elbow",
          "left_wrist",
          "left_hip",
          "left_knee",
          "left_ankle",
        ]
      : [
          "right_shoulder",
          "right_elbow",
          "right_wrist",
          "right_hip",
          "right_knee",
          "right_ankle",
        ];

  const visibleKeypoints = keypoints.filter((kp) =>
    sideJoints.includes(kp.name)
  );

  visibleKeypoints.forEach((keypoint) => {
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
const drawSkeleton = (keypoints, ctx, visibleSide) => {
  const adjacentKeyPoints =
    visibleSide === "left"
      ? [
          [0, 2], // Left shoulder to left elbow
          [2, 4], // Left elbow to left wrist
          [0, 6], // Left shoulder to left hip
          [6, 8], // Left hip to left knee
          [8, 10], // Left knee to left ankle
        ]
      : [
          [1, 3], // Right shoulder to right elbow
          [3, 5], // Right elbow to right wrist
          [1, 7], // Right shoulder to right hip
          [7, 9], // Right hip to right knee
          [9, 11], // Right knee to right ankle
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
