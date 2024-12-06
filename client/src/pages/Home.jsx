// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import Header from "../components/Header";
// import axios from "axios";

// export default function Home() {
//   const [musicPlaying, setMusicPlaying] = useState(null);
//   const [showJoke, setShowJoke] = useState(false);
//   const [joke, setJoke] = useState("");
//   const [showArticles, setShowArticles] = useState(false);
//   const [selectedMood, setSelectedMood] = useState("");
//   const [recommendations, setRecommendations] = useState([]);
//   const [error, setError] = useState("");

//   const musicOptions = [
//     "Song 1 - Artist A",
//     "Song 2 - Artist B",
//     "Song 3 - Artist C",
//   ];

//   const articles = ["Mental Health Benefits of Exercise"];

//   const fetchJoke = async () => {
//     const response = await fetch(
//       "https://official-joke-api.appspot.com/random_joke"
//     );
//     const data = await response.json();
//     setJoke(data.setup + " - " + data.punchline);
//     setShowJoke(true);
//   };
//   const fetchRecommendations = async () => {
//     try {
//       setError("");
//       const response = await axios.get(`https://ws.audioscrobbler.com/2.0/`, {
//         params: {
//           method: "tag.getTopTracks",
//           tag: selectedMood,
//           api_key: import.meta.env.VITE_LASTFM_API_KEY,
//           format: "json",
//         },
//       });
//       setRecommendations(response.data.tracks.track);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch recommendations");
//     }
//   };

//   const moods = [
//     "happy",
//     "sad",
//     "relaxed",
//     "energetic",
//     "calm",
//     "excited",
//     "angry",
//     "melancholic",
//     "romantic",
//     "upbeat",
//     "dreamy",
//     "nostalgic",
//   ];

//   const navigate = useNavigate(); // Use navigate hook

//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center px-4 md:px-8">
//       <Header />

//       <div className="mt-10 space-y-6">
//         <div className="text-center space-y-2">
//           <h2 className="text-teal-700 text-2xl font-bold">
//             Track Your Mood and Sleep
//           </h2>
//           <div className="space-x-4">
//             <Link
//               to="/track-mood"
//               className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//             >
//               Track Mood
//             </Link>
//             <Link
//               to="/track-sleep"
//               className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//             >
//               Track Sleep
//             </Link>
//           </div>
//         </div>

//         <div className="text-center space-y-6 mt-12">
//           <h2 className="text-teal-700 text-2xl font-bold">Boost Your Mood</h2>
//           <div className="space-x-4">
//             <button
//               onClick={() => setMusicPlaying(musicOptions)}
//               className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//             >
//               Listen to Music
//             </button>
//             <button
//               onClick={() => setShowArticles(true)}
//               className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//             >
//               Learn About Mental Health
//             </button>
//             <button
//               onClick={fetchJoke}
//               className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//             >
//               Joke of the Day
//             </button>
//           </div>
//         </div>

//         {/* Breathing Exercise section */}
//         <div className="text-center mt-12">
//           <button
//             onClick={() => navigate("/breathinggame")} // Navigate to /breathinggame
//             className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//           >
//             Breathing Exercise
//           </button>
//         </div>

//         {/* Render Music Options */}
//         {musicPlaying && (
//           <div className="flex space-x-6 bg-gray-700 shadow-xl shadow-pink-600 bg-opacity-70 p-4 rounded-lg">
//             <div className="w-full max-w-md p-4 mb-6 bg-gradient-to-r from-green-700 via-slate-700 to-blue-800 border border-zinc-500 rounded-lg shadow-lg shadow-teal-600">
//               <h1 className="text-3xl flex justify-center font-bold mb-6 text-teal-500">
//                 DoReMi
//               </h1>
//               <div className="mb-6">
//                 <label className="block mb-2 text-xl font-semibold text-teal-100">
//                   Select your mood:
//                 </label>
//                 <div className="flex">
//                   <select
//                     value={selectedMood}
//                     onChange={(e) => setSelectedMood(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 flex-grow bg-pink-200"
//                   >
//                     <option value="">Select...</option>
//                     {moods.map((mood) => (
//                       <option key={mood} value={mood}>
//                         {mood.charAt(0).toUpperCase() + mood.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     onClick={fetchRecommendations}
//                     className="p-2 bg-pink-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
//                   >
//                     Get Music Recommendations
//                   </button>
//                 </div>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//               </div>
//             </div>
//             {/* Recommendations Table */}
//             {recommendations.length > 0 && (
//               <div className="w-full max-w-lg max-h-96 overflow-y-auto bg-transparent rounded-xl shadow-lg shadow-pink-300 p-4">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-gradient-to-r from-green-200 to-blue-300 border border-gray-300 ">
//                     <thead>
//                       <tr>
//                         <th className="py-2 px-4 bg-transparent text-orange-600 border-b font-bold text-xl">
//                           Song
//                         </th>
//                         <th className="py-2 px-4 bg-transparent border-b font-bold text-xl text-orange-600">
//                           Artist
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {recommendations.map((track, index) => (
//                         <tr
//                           key={`${track.name}-${track.artist.name}-${index}`}
//                           className="hover:bg-pink-100"
//                         >
//                           <td className="border px-4 py-2 font-medium text-green-800">
//                             {track.name}
//                           </td>
//                           <td className="border px-4 py-2 font-medium text-sky-800">
//                             {track.artist.name}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Articles Slider */}
//         {showArticles && (
//           <div className="mt-6 space-x-4 flex overflow-x-scroll">
//             {articles.map((article, index) => (
//               <div
//                 key={index}
//                 className="min-w-[250px] bg-teal-100 p-4 rounded-lg shadow-md"
//               >
//                 <h4 className="font-semibold text-teal-700">{article}</h4>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Joke Popup */}
//         {showJoke && (
//           <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//             <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
//               <h3 className="text-teal-700 text-xl font-bold">
//                 Joke of the Day
//               </h3>
//               <p className="text-teal-600 mt-4">{joke}</p>
//               <button
//                 onClick={() => setShowJoke(false)}
//                 className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

export default function Home() {
  const [musicPlaying, setMusicPlaying] = useState(null);
  const [showJoke, setShowJoke] = useState(false);
  const [joke, setJoke] = useState("");
  const [showArticles, setShowArticles] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  // Article state and loading state
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

      // Randomly select an article and check for image URL
      if (data.articles && data.articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.articles.length);
        const randomArticle = data.articles[randomIndex];

        // Set the article and image if available
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
    <div className="bg-white min-h-screen flex flex-col items-center px-4 md:px-8">
      <Header />

      <div className="mt-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-teal-700 text-2xl font-bold">
            Track Your Mood and Sleep
          </h2>
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
              onClick={() => {
                setShowArticles(true);
                fetchArticle(); // Trigger article fetch when clicked
              }}
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

        {/* Breathing Exercise section */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/breathinggame")}
            className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300"
          >
            Breathing Exercise
          </button>
        </div>

        {/* Articles Slider */}
        {showArticles && (
          <div className="mt-6 space-x-4 flex overflow-x-scroll">
            {article ? (
              <div className="min-w-[250px] bg-teal-100 p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-teal-700">{article.title}</h4>
                <p>{article.description}</p>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="Article Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      marginTop: "10px",
                    }}
                  />
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 mt-4"
                >
                  Read more
                </a>
              </div>
            ) : loading ? (
              <div>Loading...</div>
            ) : (
              <div>No articles found or an error occurred.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
