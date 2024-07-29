import React, { useState, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const [initializing, setInitializing] = useState(true);
  const [sampleImage, setSampleImage] = useState(null);
  const [sampleDescriptor, setSampleDescriptor] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonDistance, setComparisonDistance] = useState(null);
  const [sampleDescriptorStr, setSampleDescriptorStr] = useState("");
  const [newDescriptorStr, setNewDescriptorStr] = useState("");
  const fileInputRef = useRef(null);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    setInitializing(false);
  };

  const handleImageUpload = async (
    event,
    setImage,
    setDescriptor,
    setDescriptorStr
  ) => {
    const file = event.target.files[0];
    if (file) {
      const image = await loadImageFromFile(file);
      setImage(URL.createObjectURL(file));

      const detections = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        alert("No face detected");
        return;
      }

      setDescriptor(detections.descriptor);
      setDescriptorStr(detections.descriptor.toString());
    }
  };

  const loadImageFromFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => resolve(img);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCompare = () => {
    if (!sampleDescriptor) {
      alert("Please upload a sample image first");
      return;
    }

    fileInputRef.current.click();
  };

  const handleNewImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = await loadImageFromFile(file);

      const detections = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        alert("No face detected");
        return;
      }

      const newDescriptor = detections.descriptor;
      setNewDescriptorStr(newDescriptor.toString());

      const distance = faceapi.euclideanDistance(
        sampleDescriptor,
        newDescriptor
      );
      setComparisonDistance(distance);
      setComparisonResult(distance < 0.03 ? "Match" : "No Match");
    }
  };

  React.useEffect(() => {
    loadModels();
  }, []);

  return (
    <div>
      {initializing && <p>Loading...</p>}
      <div>
        <h3>Sample Image:</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            handleImageUpload(
              event,
              setSampleImage,
              setSampleDescriptor,
              setSampleDescriptorStr
            )
          }
        />
        {sampleImage && <img src={sampleImage} alt="Sample" width="300" />}
        {sampleDescriptorStr && (
          <div>
            <h4>Sample Descriptor:</h4>
            <pre>{sampleDescriptorStr}</pre>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleCompare} disabled={!sampleDescriptor}>
          Upload New Image to Compare
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleNewImageUpload}
        />
      </div>
      {comparisonDistance !== null && (
        <div>
          <h4>Comparison Distance: {comparisonDistance.toFixed(2)}</h4>
          <h3>Comparison Result: {comparisonResult}</h3>
          <h4>New Descriptor:</h4>
          <pre>{newDescriptorStr}</pre>
        </div>
      )}
    </div>
  );
};

export default FaceDetection;
