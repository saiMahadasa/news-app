import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const API_KEY = '361f90c331bb45a1833f6aa1bf8f827f'; // Replace with your News API key

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general'); // Default category

  // Fetch news when the component loads or the category changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        console.log(response)
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching the news:', error);
      }
    };

    fetchNews();
  }, [category]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div>
      <h1>News by Category</h1>
      <div >
        {/* Category Buttons */}
        <button className='custombtn' onClick={() => handleCategoryChange('general')}>General</button>
        <button  className='custombtn' onClick={() => handleCategoryChange('business')}>Business</button>
        <button className='custombtn' onClick={() => handleCategoryChange('technology')}>Technology</button>
        <button className='custombtn' onClick={() => handleCategoryChange('sports')}>Sports</button>
        <button className='custombtn' onClick={() => handleCategoryChange('health')}>Health</button>
        <button  className='custombtn' onClick={() => handleCategoryChange('science')}>Science</button>
        <button className='custombtn' onClick={() => handleCategoryChange('entertainment')}>Entertainment</button>
      </div>

      {/* Display articles */}
      <div className='mynews'>
        {articles.length === 0 ? (
          <p>No news available.</p>
        ) : (
          articles.map((article, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              {article.urlToImage && <img src={article.urlToImage} alt="news" style={{ width: '150px' }} />}
              <p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
