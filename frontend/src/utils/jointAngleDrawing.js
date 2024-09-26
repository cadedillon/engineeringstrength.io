const drawJointAngle = (ctx, pointA, pointB, pointC, angle) => {
  // Draw the lines between the joints
  ctx.beginPath();
  ctx.moveTo(pointA.x, pointA.y);
  ctx.lineTo(pointB.x, pointB.y);
  ctx.lineTo(pointC.x, pointC.y);
  ctx.strokeStyle = "white"; // Set line color
  ctx.lineWidth = 2;
  ctx.stroke();

  // Display the angle near the joint
  ctx.font = "18px Arial";
  ctx.fillStyle = "yellow";
  ctx.fillText(angle.toFixed(1) + "°", pointB.x + 10, pointB.y - 10);
};

export default drawJointAngle;
