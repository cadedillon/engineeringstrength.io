import calculateAngle from "./jointAngleCalculation";
import drawJointAngle from "./jointAngleDrawing";

const visualizeJointAngles = (keypoints, ctx, visibleSide) => {
  if (visibleSide === "left") {
    // Left side keypoints
    const leftHip = keypoints.find((kp) => kp.name === "right_hip");
    const leftKnee = keypoints.find((kp) => kp.name === "right_knee");
    const leftAnkle = keypoints.find((kp) => kp.name === "right_ankle");

    const leftShoulder = keypoints.find((kp) => kp.name === "left_shoulder");
    const leftElbow = keypoints.find((kp) => kp.name === "left_elbow");
    const leftWrist = keypoints.find((kp) => kp.name === "left_wrist");

    console.log(leftShoulder);
    console.log(leftKnee);

    if (
      leftAnkle &&
      leftHip &&
      leftKnee &&
      leftShoulder &&
      leftElbow &&
      leftWrist
    ) {
      const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

      const leftShoulderAngle = calculateAngle(
        leftElbow,
        leftShoulder,
        leftHip
      );

      const leftHipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

      const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

      // Draw and visualize right elbow angle
      drawJointAngle(ctx, leftShoulder, leftElbow, leftWrist, leftElbowAngle);

      // Draw and visualize right shoulder angle
      drawJointAngle(ctx, leftElbow, leftShoulder, leftHip, leftShoulderAngle);

      leftShoulder.x > leftKnee.x // Draw and visualize right hip angle
        ? drawJointAngle(ctx, leftShoulder, leftHip, leftKnee, leftHipAngle)
        : drawJointAngle(ctx, leftKnee, leftHip, leftShoulder, leftHipAngle);

      // Draw and visualize right knee angle
      drawJointAngle(ctx, leftHip, leftKnee, leftAnkle, leftKneeAngle);
    }
  } else {
    // Right side keypoints
    const rightHip = keypoints.find((kp) => kp.name === "right_hip");
    const rightKnee = keypoints.find((kp) => kp.name === "right_knee");
    const rightAnkle = keypoints.find((kp) => kp.name === "right_ankle");

    const rightShoulder = keypoints.find((kp) => kp.name === "right_shoulder");
    const rightElbow = keypoints.find((kp) => kp.name === "right_elbow");
    const rightWrist = keypoints.find((kp) => kp.name === "right_wrist");

    console.log(rightShoulder);
    console.log(rightKnee);

    // Ensure the keypoints exist and have a valid score
    if (
      rightAnkle &&
      rightHip &&
      rightKnee &&
      rightShoulder &&
      rightElbow &&
      rightWrist
    ) {
      const rightElbowAngle = calculateAngle(
        rightShoulder,
        rightElbow,
        rightWrist
      );

      const rightShoulderAngle = calculateAngle(
        rightElbow,
        rightShoulder,
        rightHip
      );

      const rightHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee);

      const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

      // Draw and visualize right elbow angle
      drawJointAngle(
        ctx,
        rightShoulder,
        rightElbow,
        rightWrist,
        rightElbowAngle
      );

      // Draw and visualize right shoulder angle
      drawJointAngle(
        ctx,
        rightElbow,
        rightShoulder,
        rightHip,
        rightShoulderAngle
      );

      rightShoulder.x > rightKnee.x // Draw and visualize right hip angle
        ? drawJointAngle(ctx, rightShoulder, rightHip, rightKnee, rightHipAngle)
        : drawJointAngle(
            ctx,
            rightKnee,
            rightHip,
            rightShoulder,
            rightHipAngle
          );

      // Draw and visualize right knee angle
      drawJointAngle(ctx, rightAnkle, rightKnee, rightHip, rightKneeAngle);
    }
  }
};

export default visualizeJointAngles;
