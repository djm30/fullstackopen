import { useState } from "react";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to={"/anecdotes"} style={padding}>
        anecdotes
      </Link>
      <Link to={"/new"} style={padding}>
        create new
      </Link>
      <Link to={"/about"} style={padding}>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) =>
  anecdote ? (
    <div>
      <h3>{anecdote.content}</h3>
      <h4>{anecdote.author}</h4>
      <a href={anecdote.info}>Info</a>
    </div>
  ) : (
    <div>
      <h3>No anecdote with this ID!</h3>
    </div>
  );

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const [inputReset, contentInput] = useField("text");
  const [authorReset, authorInput] = useField("text");
  const [infoReset, infoInput] = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentInput.value,
      author: authorInput.value,
      info: infoInput.value,
      votes: 0,
    });
    props.setNotification(
      `Added a new anecdote with content: ${contentInput.value}`,
    );
    navigate("/anecdotes");
  };

  const reset = () => {
    inputReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentInput} />
        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />
        </div>
        <button>create</button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

let timeout;

const Notification = ({ setNotification, notification }) => {
  if (notification) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setNotification("");
    }, 5000);
  }
  return <div>{notification}</div>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Routes>
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/new"
          element={
            <CreateNew setNotification={setNotification} addNew={addNew} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
