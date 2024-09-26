const SIDE_SWITCH_THRESHOLD = 0.2; // Adjust this value as needed

const getSideFacingCamera = (keypoints, currentSide) => {
  const leftSide = [
    "left_shoulder",
    "left_elbow",
    "left_wrist",
    "left_hip",
    "left_knee",
    "left_ankle",
  ];
  const rightSide = [
    "right_shoulder",
    "right_elbow",
    "right_wrist",
    "right_hip",
    "right_knee",
    "right_ankle",
  ];

  const leftConfidence =
    leftSide.reduce((sum, jointName) => {
      const keypoint = keypoints.find((kp) => kp.name === jointName);
      return sum + (keypoint ? keypoint.score : 0);
    }, 0) / leftSide.length;

  const rightConfidence =
    rightSide.reduce((sum, jointName) => {
      const keypoint = keypoints.find((kp) => kp.name === jointName);
      return sum + (keypoint ? keypoint.score : 0);
    }, 0) / rightSide.length;

  if (Math.abs(leftConfidence - rightConfidence) > SIDE_SWITCH_THRESHOLD) {
    console.log("Updating visible side");
    return leftConfidence > rightConfidence ? "left" : "right";
  } else return currentSide;
};

export default getSideFacingCamera;
