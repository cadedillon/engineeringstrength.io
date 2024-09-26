const drawJointAngle = (ctx, pointA, pointB, pointC, angle) => {
  // Draw the lines between the joints
  ctx.beginPath();
  ctx.moveTo(pointA.x, pointA.y);
  ctx.lineTo(pointB.x, pointB.y);
  ctx.lineTo(pointC.x, pointC.y);
  ctx.strokeStyle = "white"; // Set line color
  ctx.lineWidth = 5;
  ctx.stroke();

  // Calculate the angle in radians for drawing the semi-circle
  const angleRadians = (angle * Math.PI) / 180;

  // Calculate the position of the semi-circle (inside the joint)
  const centerX = pointB.x;
  const centerY = pointB.y;
  const radius = 20; // Set a radius for the semi-circle

  // Calculate the angles for the start and end of the arc
  const startAngle = Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);
  const endAngle = startAngle + angleRadians;

  // Draw the semi-circle (angle representation)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = "red"; // Color for the angle visualization
  ctx.lineWidth = 5;
  ctx.stroke();

  // Display the angle text near the joint
  ctx.font = "18px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    angle.toFixed(1) + "°",
    centerX + radius + 5,
    centerY - radius + 5
  );
};

export default drawJointAngle;
