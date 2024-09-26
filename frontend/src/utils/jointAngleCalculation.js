// Function to calculate the angle between three points (in degrees)
const calculateAngle = (pointA, pointB, pointC) => {
  const AB = {
    x: pointA.x - pointB.x,
    y: pointA.y - pointB.y,
  };
  const BC = {
    x: pointC.x - pointB.x,
    y: pointC.y - pointB.y,
  };

  const dotProduct = AB.x * BC.x + AB.y * BC.y;
  const magnitudeAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
  const magnitudeBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);

  const angleRad = Math.acos(dotProduct / (magnitudeAB * magnitudeBC));
  const angleDeg = (angleRad * 180) / Math.PI;

  return angleDeg;
};

export default calculateAngle;
