// src/App.js
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInterestChange = (event) => {
    const value = event.target.value;
    setInterests((prevInterests) =>
      prevInterests.includes(value)
        ? prevInterests.filter((interest) => interest !== value)
        : [...prevInterests, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm John Doe</h1>
      <img
        alt="John Doe's profile pic"
        src="https://via.placeholder.com/350"
      />
      <h2>About Me</h2>
      <p>
        I am a passionate web developer with a love for creating intuitive and engaging user experiences. 
        I specialize in JavaScript, React, and web development technologies. 
        In my free time, I enjoy contributing to open-source projects and learning new skills.
      </p>

      <div>
        <a href="https://github.com/johndoe">GitHub</a>
        <a href="https://linkedin.com/in/johndoe">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>
      {submitted ? (
        <p>
          Thank you for signing up, {name}! You've selected the following interests: {interests.join(', ')}.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <fieldset>
              <legend>Interests</legend>
              <label>
                <input
                  type="checkbox"
                  value="React"
                  checked={interests.includes('React')}
                  onChange={handleInterestChange}
                />
                React
              </label>
              <label>
                <input
                  type="checkbox"
                  value="JavaScript"
                  checked={interests.includes('JavaScript')}
                  onChange={handleInterestChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Web Development"
                  checked={interests.includes('Web Development')}
                  onChange={handleInterestChange}
                />
                Web Development
              </label>
            </fieldset>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </main>
  );
}

export default App;
