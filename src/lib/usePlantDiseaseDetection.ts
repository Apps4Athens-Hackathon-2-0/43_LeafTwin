// src/lib/usePlantDiseaseDetection.ts
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// Mock disease model (replace with real API later)
const MOCK_DISEASES = [
  { name: "Powdery Mildew", confidence: 0.92, symptoms: "White powder on leaves" },
  { name: "Olive Knot", confidence: 0.78, symptoms: "Galls on branches" },
  { name: "Healthy", confidence: 0.95, symptoms: "No visible issues" },
];

export function usePlantDiseaseDetection(imageFile: File | null) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) return;

    setLoading(true);

    // Simulate AI delay
    setTimeout(() => {
      const mock = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
      setResult(mock);
      setLoading(false);
    }, 2000);

    // REAL AI: Use Hugging Face Inference API
    // const detect = async () => {
    //   const form = new FormData();
    //   form.append("image", imageFile);
    //   const res = await fetch("https://api-inference.huggingface.co/models/plant-disease-model", {
    //     headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
    //     method: "POST",
    //     body: form,
    //   });
    //   const data = await res.json();
    //   setResult(data[0]);
    // };
    // detect();
  }, [imageFile]);

  return { result, loading };
}