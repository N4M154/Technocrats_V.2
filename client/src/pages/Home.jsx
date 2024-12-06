import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [musicPlaying, setMusicPlaying] = useState(null);
  const [showJoke, setShowJoke] = useState(false);
  const [joke, setJoke] = useState("");
  const [showArticles, setShowArticles] = useState(false);

  const musicOptions = [
    "Song 1 - Artist A",
    "Song 2 - Artist B",
    "Song 3 - Artist C",
  ];

  const articles = [
    "Mental Health Benefits of Exercise"
  ];

  const fetchJoke = async () => {
    // Replace with actual API call for jokes
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    setJoke(data.setup + " - " + data.punchline);
    setShowJoke(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 md:px-8">
      {/* Main Content */}
      <Header />

      {/* Track mood and sleep section */}
      <div className="mt-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-teal-700 text-2xl font-bold">Track Your Mood and Sleep</h2>
          <div className="space-x-4">
            <Link
              to="/track-mood"
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Track Mood
            </Link>
            <Link
              to="/track-sleep"
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Track Sleep
            </Link>
          </div>
        </div>

        {/* Boost Your Mood section */}
        <div className="text-center space-y-6 mt-12">
          <h2 className="text-teal-700 text-2xl font-bold">Boost Your Mood</h2>
          <div className="space-x-4">
            <button
              onClick={() => setMusicPlaying(musicOptions)}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Listen to Music
            </button>
            <button
              onClick={() => setShowArticles(true)}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Learn About Mental Health
            </button>
            <button
              onClick={fetchJoke}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Joke of the Day
            </button>
          </div>
        </div>

        {/* Render Music Options */}
        {musicPlaying && (
          <div className="mt-6 text-center">
            <h3 className="text-teal-700 text-xl font-semibold">Now Playing</h3>
            <ul className="space-y-2">
              {musicPlaying.map((song, index) => (
                <li key={index} className="text-teal-600">{song}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Articles Slider */}
        {showArticles && (
          <div className="mt-6 space-x-4 flex overflow-x-scroll">
            {articles.map((article, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-teal-100 p-4 rounded-lg shadow-md"
              >
                <h4 className="font-semibold text-teal-700">{article}</h4>
              </div>
            ))}
          </div>
        )}

        {/* Joke Popup */}
        {showJoke && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
              <h3 className="text-teal-700 text-xl font-bold">Joke of the Day</h3>
              <p className="text-teal-600 mt-4">{joke}</p>
              <button
                onClick={() => setShowJoke(false)}
                className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 bg-gray-100 mt-10">
        <p className="text-gray-600">&copy; 2024 YourApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
