import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [musicPlaying, setMusicPlaying] = useState(null);
  const [showJoke, setShowJoke] = useState(false);
  const [joke, setJoke] = useState("");
  const [showArticles, setShowArticles] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  const musicOptions = [
    "Song 1 - Artist A",
    "Song 2 - Artist B",
    "Song 3 - Artist C",
  ];

  const fetchJoke = async () => {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    setJoke(data.setup + " - " + data.punchline);
    setShowJoke(true);
  };

  const fetchRecommendations = async () => {
    try {
      setError("");
      const response = await axios.get(`https://ws.audioscrobbler.com/2.0/`, {
        params: {
          method: "tag.getTopTracks",
          tag: selectedMood,
          api_key: import.meta.env.VITE_LASTFM_API_KEY,
          format: "json",
        },
      });
      setRecommendations(response.data.tracks.track);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations");
    }
  };

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=mental%20health&apiKey=690c534bd52c4d1e8353e4c34b64eb97`
      );
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.articles.length);
        const randomArticle = data.articles[randomIndex];
        setArticle(randomArticle);
      } else {
        setArticle("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setArticle("An error occurred while fetching the article.");
    } finally {
      setLoading(false);
    }
  };

  const moods = [
    "happy",
    "sad",
    "relaxed",
    "energetic",
    "calm",
    "excited",
    "angry",
    "melancholic",
    "romantic",
    "upbeat",
    "dreamy",
    "nostalgic",
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <Header />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Track Mood */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Track Your Mood</h3>
          <p className="text-teal-500 mb-4">Understand your emotional state with easy tracking features.</p>
          <Link
            to="/track-mood"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Track Mood
          </Link>
        </div>

        {/* Card 2: Track Sleep */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Track Your Sleep</h3>
          <p className="text-teal-500 mb-4">Improve your sleep patterns with our tracking tool.</p>
          <Link
            to="/track-sleep"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Track Sleep
          </Link>
        </div>

        {/* Card 3: Boost Your Mood */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Boost Your Mood</h3>
          <p className="text-teal-500 mb-4">Listen to music that helps improve your mood.</p>
          <button
            onClick={() => setMusicPlaying(musicOptions)}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Listen to Music
          </button>
        </div>

        {/* Card 4: Learn About Mental Health */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Learn About Mental Health</h3>
          <p className="text-teal-500 mb-4">Stay informed with the latest mental health articles.</p>
          <button
            onClick={() => {
              setShowArticles(true);
              fetchArticle();
            }}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Read Articles
          </button>
        </div>

        {/* Card 5: Joke of the Day */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Joke of the Day</h3>
          <p className="text-teal-500 mb-4">Lighten up with a fun joke every day.</p>
          <button
            onClick={fetchJoke}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Get Joke
          </button>
        </div>

        {/* Breathing Exercise Button */}
        <div className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Breathing Exercise</h3>
          <p className="text-teal-500 mb-4">Calm your mind with a guided breathing exercise.</p>
          <button
            onClick={() => navigate("/breathinggame")}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Start Breathing Exercise
          </button>
        </div>
      </div>

      {/* Music Recommendations Section */}
      {musicPlaying && (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Music Recommendations</h3>
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-full p-3 border border-teal-300 rounded-md mb-4"
          >
            <option value="">Select Mood</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={fetchRecommendations}
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
          >
            Get Recommendations
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {recommendations.length > 0 && (
            <div className="mt-6">
              {recommendations.map((track) => (
                <p key={track.name} className="text-teal-600">{track.name} - {track.artist.name}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Joke Section */}
      {showJoke && (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Joke of the Day</h3>
          <p className="text-teal-500">{joke}</p>
        </div>
      )}

      {/* Article Section */}
      {showArticles && article && (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-teal-500">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Mental Health Article</h3>
          <h4 className="text-teal-600 font-semibold">{article.title}</h4>
          <p className="text-teal-500 mt-2">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline mt-4 inline-block"
          >
            Read Full Article
          </a>
        </div>
      )}
    </div>
  );
}
