// Save video to cloud (S3) after user confirms
const useSaveVideo = async () => {
  if (!videoFile) {
    toast({
      title: "No video selected",
      status: "error",
      isClosable: true,
    });
    return;
  }

  // Trigger the upload to the backend (similar to the previous upload process)
  const formData = new FormData();
  formData.append("video", videoFile);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/video/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      console.log("Response data:", data); // Log the full response

      toast({
        title: "Video saved to history",
        description: `Video URL: ${data.url}`,
        status: "success",
        isClosable: true,
      });
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    toast({
      title: "Error saving video",
      description: error.message,
      status: "error",
      isClosable: true,
    });
  }
};

export default useSaveVideo;
