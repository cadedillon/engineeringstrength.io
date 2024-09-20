// Run PoseNet on the video
const usePoseNet = async () => {
  if (!detector || !videoRef.current || !canvasRef.current) return;

  console.log("Running posenet...");

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // Get the video's position and size
  const videoRect = video.getBoundingClientRect();

  canvas.style.position = "absolute";
  canvas.style.top = `${videoRect.top}px`;
  canvas.style.left = `${videoRect.left}px`;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Start analyzing the video frames
  const analyzeFrame = async () => {
    if (video.paused || video.ended) return;

    console.log("Analyzing frame...");

    // Run posenet and get the keypoints
    const poses = await detector.estimatePoses(video);
    console.log(poses);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw keypoints and skeleton on the canvas
    for (const pose of poses) {
      const smoothedKeypoints = smoothKeypoints(pose.keypoints);

      drawKeypoints(smoothedKeypoints, ctx);
      drawSkeleton(smoothedKeypoints, ctx);
    }
    //drawKeypoints(poses[0].keypoints, ctx);

    // Keep running the analysis if the video is still playing
    requestAnimationFrame(analyzeFrame);
  };
  analyzeFrame();
};

export default usePoseNet;
