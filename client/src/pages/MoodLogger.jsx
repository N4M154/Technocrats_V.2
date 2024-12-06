import React, { useState } from "react";
import DiscreteSliderMarks from "../DiscreteSliderMarks";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MoodLogger = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
  });

  const [showChart, setShowChart] = useState(false);

  const handleChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { stress, happiness, energy, focus, calmness } = mood;
    if (!stress || !happiness || !energy || !focus || !calmness) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all mood sliders!",
      });
      return;
    }

    // Generate the chart data
    setShowChart(true);
  };

  const chartData = {
    labels: ["Stress", "Happiness", "Energy", "Focus", "Calmness"],
    datasets: [
      {
        label: "Mood",
        data: [
          mood.stress,
          mood.happiness,
          mood.energy,
          mood.focus,
          mood.calmness,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "60%",
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid #ddd",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "28px",
                color: "#333",
              }}
            >
              Mood Logger
            </h1>
            <form onSubmit={handleSubmit}>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                  fontSize: "18px",
                  color: "#555",
                }}
              >
                How do you feel today?
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {["stress", "happiness", "energy", "focus", "calmness"].map(
                  (moodType) => (
                    <div
                      key={moodType}
                      style={{ flex: "1 0 45%", minWidth: "150px" }}
                    >
                      <label
                        style={{
                          fontWeight: "bold",
                          display: "block",
                          marginBottom: "5px",
                          color: "#333",
                        }}
                      >
                        {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                      </label>
                      <DiscreteSliderMarks
                        value={mood[moodType]}
                        onChange={(value) => handleChange(moodType, value)}
                      />
                    </div>
                  )
                )}
              </div>
              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  backgroundColor: "#6B46C1",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "none",
                  color: "#fff",
                }}
              >
                Log Mood
              </button>
            </form>

            {showChart && (
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Radar data={chartData} options={{ responsive: true }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoodLogger;
