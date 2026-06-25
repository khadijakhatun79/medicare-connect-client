"use client";

import { useState } from "react";
import { MapPin, Phone, AlertTriangle, Activity, Siren } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function EmergencyPage() {
  const [symptom, setSymptom] = useState("");
  const [risk, setRisk] = useState(null);

  const quickIssues = [
    "Chest Pain",
    "Breathing Problem",
    "Accident",
    "Bleeding",
    "High Fever",
  ];

  const analyzeRisk = (text) => {
    const value = text.toLowerCase();

    if (value.includes("chest") || value.includes("breath")) {
      return "HIGH";
    } else if (value.includes("bleed") || value.includes("accident")) {
      return "HIGH";
    } else if (value.includes("fever")) {
      return "MEDIUM";
    }
    return "LOW";
  };

  const handleAnalyze = () => {
    const result = analyzeRisk(symptom);
    setRisk(result);
  };

  return (
    <div className="min-h-screen bg-red-50">
    <Breadcrumb></Breadcrumb>

      {/* Header */}
      <div className="bg-red-600 text-white py-10 text-center">
        <Siren className="mx-auto mb-2" size={40} />
        <h1 className="text-3xl font-bold">Emergency Help Center</h1>
        <p className="text-sm mt-1">
          Get instant medical assistance
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-bold flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            Describe Your Problem
          </h2>

          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Example: chest pain, breathing difficulty..."
            className="w-full mt-4 p-4 border rounded-xl h-32 focus:outline-red-400"
          />

          <button
            onClick={handleAnalyze}
            className="w-full mt-4 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700"
          >
            Analyze Emergency
          </button>

          {/* QUICK OPTIONS */}
          <div className="mt-6">
            <p className="font-semibold mb-3">Quick Emergency Options</p>

            <div className="grid grid-cols-2 gap-2">
              {quickIssues.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSymptom(item)}
                  className="border rounded-lg py-2 text-sm hover:bg-red-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* RISK RESULT */}
          {risk && (
            <div
              className={`mt-6 p-4 rounded-xl font-semibold text-center ${
                risk === "HIGH"
                  ? "bg-red-100 text-red-700"
                  : risk === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              AI Risk Level: {risk}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ACTION CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-bold text-lg mb-4">
              Emergency Actions
            </h2>

            <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl mb-3">
              <Phone size={18} />
              Call Ambulance
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl mb-3">
              <MapPin size={18} />
              Find Nearest Hospital
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl">
              <Activity size={18} />
              Connect Emergency Doctor
            </button>
          </div>

          {/* INFO CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-bold mb-3">Important Instructions</h2>

            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Stay calm and follow instructions</li>
              <li>• Share your exact location</li>
              <li>• Do not delay if condition is serious</li>
              <li>• Keep phone accessible</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}