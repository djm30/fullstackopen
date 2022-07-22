import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      {/* REFACTOR INTO A TABLE */}
      <table>
        <tbody>
          <StatisticLine text="Good:" value={good} />

          <StatisticLine text="Neutral:" value={neutral} />

          <StatisticLine text="Bad:" value={bad} />

          <StatisticLine text="Total:" value={good + neutral + bad} />

          <StatisticLine
            text="Positive feedback:"
            value={Math.round((good * 100) / (good + neutral + bad)) + "%"}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ children, handleClick }) => (
  <button onClick={handleClick}>{children}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)}>Good</Button>
      <Button handleClick={() => setNeutral(neutral + 1)}>Neutral</Button>
      <Button handleClick={() => setBad(bad + 1)}>Bad</Button>
      {good > 0 && neutral > 0 && bad > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
