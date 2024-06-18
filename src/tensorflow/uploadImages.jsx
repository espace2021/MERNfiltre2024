import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

export default function PageUploadImages() {
  const [img, setImg] = useState(null);
  
  let model;
  async function loadModel() {
    console.log("Model loading..");
    model = await mobilenet.load();
    console.log("Model loaded..");
  }
  
  loadModel();
  
  function handleImageUpload(event) {
    const image = event.target.files[0];
    classifyImage(image);
    setImg(image);
  }
  
  async function classifyImage(image) {
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = async () => {
      const predictions = await model.classify(img);
      document.getElementById("prediction").innerHTML = 
        `Predicted:<br /> ${predictions.map(p => `${p.className}: ${p.probability.toFixed(2)}`).join("<br />")}`;
    };
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4em' }}>
      <input type="file" onChange={handleImageUpload} />
      <br />
      <div>
        <p id="prediction"></p>
        <br />
        {img ? <img src={img ? URL.createObjectURL(img) : null} alt="upload-preview" style={{ maxWidth: '100%' }} /> : null}
      </div>
    </div>
  );
}
