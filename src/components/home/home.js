import React, { useState } from 'react';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import the generated gRPC client and request classes
// import { SearchServiceClientPb } from '../../components/backend/generated/js/SearchServiceClientPb';
// import { SearchRequest, SearchResponse } from '../../components/backend/generated/js/search_pb';

function HomePage() {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [results, setResults] = useState([]);

  // const handleSearch = async () => {
  //   const client = new SearchServiceClient('http://localhost:8080'); // gRPC-web proxy URL

  //   const request = new SearchRequest();
  //   request.setQuery(searchTerm);

  //   client.searchQuestions(request, {}, (err, response) => {
  //     if (err) {
  //       console.error('gRPC Error:', err);
  //     } else {
  //       setResults(response.getQuestionsList());
  //     }
  //   });
  // };

  return (
    <div className='home'>
      <h1>Welcome to Project SpeakX</h1>
      <p>This is a platform to help users learn and practice speaking in various languages.</p>
      <div className='search'>
        <input
          type='text'
          placeholder='Search for a question'
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
        {/* <button onClick={handleSearch}>Search</button> */}
        {/* <ul>
          {results.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default HomePage;
