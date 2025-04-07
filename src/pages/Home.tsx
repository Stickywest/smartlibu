import { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendationCard from '../components/RecommendationCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ← loading state
  const [query, setQuery] = useState(''); // ← search query state

  useEffect(() => {
    interface RecommendationResponse {
      recommendations: { title: string }[];
    }

    const fetchRecommendations = async () => {
      try {
        const res = await axios.post<RecommendationResponse>("http://127.0.0.1:5000/recommend", {
          user_id: "user123"
        });
        setRecs(res.data.recommendations);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false); // ← stop loading after request
      }
    };

    fetchRecommendations();
  }, []);

  // Filter recommendations based on the search query
  const filteredRecs = recs.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <header className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Welcome to Your Smart Library</h1>
          <p className="lead">Get personalized book recommendations powered by AI</p>

          {/* Search Bar placed just below the header text */}
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Recommended Reads</h2>

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredRecs.length === 0 ? (
            <p className="text-center text-muted">
              No books found matching your search.
            </p>
          ) : (
            <div className="row">
              {filteredRecs.map((r, i) => (
                <RecommendationCard key={i} title={r.title} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
