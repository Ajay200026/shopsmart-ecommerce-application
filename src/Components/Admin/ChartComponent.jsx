import Chart from "chart.js/auto"; // For chart creation
import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
const ChartComponent = () => {
  // Dummy data for demonstration
  const data1 = [10, 20, 30, 40, 50];
  const data2 = [50, 40, 30, 20, 10];
  const data3 = [20, 30, 10, 40, 50];
  const data4 = [30, 10, 50, 20, 40];

  // Refs for chart canvases
  const chart1Ref = React.useRef(null);
  const chart2Ref = React.useRef(null);
  const chart3Ref = React.useRef(null);
  const chart4Ref = React.useRef(null);

  // Store chart instances
  const chart1 = React.useRef(null);
  const chart2 = React.useRef(null);
  const chart3 = React.useRef(null);
  const chart4 = React.useRef(null);

  React.useEffect(() => {
    // Chart 1
    const ctx1 = chart1Ref.current.getContext("2d");
    if (chart1.current !== null) {
      chart1.current.destroy();
    }
    chart1.current = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "Chart 1",
            data: data1,
            backgroundColor: "blue",
          },
        ],
      },
    });

    // Chart 2
    const ctx2 = chart2Ref.current.getContext("2d");
    if (chart2.current !== null) {
      chart2.current.destroy();
    }
    chart2.current = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "Chart 2",
            data: data2,
            borderColor: "red",
            fill: false,
          },
        ],
      },
    });

    // Chart 3
    const ctx3 = chart3Ref.current.getContext("2d");
    if (chart3.current !== null) {
      chart3.current.destroy();
    }
    chart3.current = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "Chart 3",
            data: data3,
            backgroundColor: "green",
          },
        ],
      },
    });

    // Chart 4
    const ctx4 = chart4Ref.current.getContext("2d");
    if (chart4.current !== null) {
      chart4.current.destroy();
    }
    chart4.current = new Chart(ctx4, {
      type: "line",
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "Chart 4",
            data: data4,
            borderColor: "purple",
            fill: false,
          },
        ],
      },
    });
  }, []);

  return (
    <div className="flex justify-center space-x-8">
      <div className="w-1/4">
        <canvas ref={chart1Ref} />
      </div>
      <div className="w-1/4">
        <canvas ref={chart2Ref} />
      </div>
      <div className="w-1/4">
        <canvas ref={chart3Ref} />
      </div>
      <div className="w-1/4">
        <canvas ref={chart4Ref} />
      </div>
    </div>
  );
};

export default ChartComponent;
