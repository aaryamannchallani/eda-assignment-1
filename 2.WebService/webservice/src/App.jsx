import React, { useState } from "react";
var KafkaRest = require("kafka-rest");
var kafka = new KafkaRest({ url: "kafka:9092" });
const App = () => {
  const [degree, setDegree] = useState(0);
  const handleChange = (event) => {
    event.preventDefault();
    setDegree(event.target.value);
  };

  const handleClick = async () => {
    const payload = Math.sin(degree);
    await kafka.topic("cos").produce(payload);
  };

  return (
    <div>
      <div className="container justify-content-center">
        <div className="card border-info">
          <div className="card-header text-info text-center">
            <h5>Add Entry</h5>
          </div>
          <div className="card-body">
            <div className="form-group mx-3 my-3">
              <input
                type="text"
                value={degree}
                onChange={handleChange}
                name="Thing"
                id="1"
                className="form-control my-3"
                placeholder="Entry"
              />
              <button className="btn btn-info" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
