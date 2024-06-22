import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './News.css';
import axios from 'axios';

// Placeholder image URL for articles without images
const placeholderImage = 'https://via.placeholder.com/100';

function News() {
  // State to store the news articles fetched from the API
  const [userData, setData] = useState([]);
  // State to track the current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to track the total number of pages available
  const [totalPages, setTotalPages] = useState(0);
  // State to track the selected news category
  const [category, setCategory] = useState('technology');
  // State to handle and display errors
  const [error, setError] = useState('');
  // State to track the selected country
  const [country, setCountry] = useState('in'); // Default to India
  // State to track the selected language
  const [language, setLanguage] = useState('en'); // Default to English

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to handle page changes in pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // useEffect to fetch news data whenever the category, country, language, or currentPage changes
  useEffect(() => {
    const fetchNews = async () => {
      // Construct a unique key for caching based on category, country, language, and currentPage
      const cacheKey = `${category}-${country}-${language}-${currentPage}`;
      // Check if data for the current page, category, country, and language is already in sessionStorage
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        // If cached data is found, parse and set it to state
        const parsedData = JSON.parse(cachedData);
        setData(parsedData.articles);
        setTotalPages(Math.ceil(parsedData.totalResults / 10));
      } else {
        try {
          // Fetch data from the API if not found in cache
          const apiKey = 'cdf732c2cf194ad9b4fe6af8dd191e9c'; // Replace with your actual API key
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&language=${language}&page=${currentPage}&pageSize=10&apiKey=${apiKey}`
          );
          // Cache the fetched data in sessionStorage
          sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
          // Set the fetched data to state
          setData(response.data.articles);
          setTotalPages(Math.ceil(response.data.totalResults / 10));
          setError(''); // Clear any previous error
        } catch (error) {
          // Handle API errors
          if (error.response && error.response.status === 429) {
            setError('You have exceeded the API rate limit. Please try again later.');
          } else {
            setError('An error occurred while fetching the news.');
          }
          console.error('Error fetching the news data:', error);
        }
      }
    };
    fetchNews();
  }, [category, country, language, currentPage]);

  // Function to render pagination buttons dynamically
  const renderPagination = () => {
    const pages = [];
    // Calculate the start and end pages for the pagination buttons
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Add the first page button if startPage is greater than 1
    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      // Add ellipsis if there's a gap between the first page and startPage
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Add buttons for pages between startPage and endPage
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ fontWeight: i === currentPage ? 'bold' : 'normal' }}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis and the last page button if endPage is less than totalPages
    if (endPage < totalPages) {
      // Add ellipsis if there's a gap between endPage and the last page
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
      // Add the last page button
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    // Return the array of pagination buttons
    return pages;
  };

  return (
    <div>
      {/* Navbar with category buttons */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NEWS TAK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <button className="nav-link btn" onClick={() => setCategory('technology')}>
                Technology
              </button>
              <button className="nav-link btn" onClick={() => setCategory('business')}>
                Business
              </button>
              <button className="nav-link btn" onClick={() => setCategory('sports')}>
                Sports
              </button>
              <button className="nav-link btn" onClick={() => setCategory('science')}>
                Science
              </button>
              <button className="nav-link btn" onClick={() => setCategory('entertainment')}>
                Entertainment
              </button>
              <button className="nav-link btn" onClick={() => setCategory('general')}>
                General
              </button>
              <button className="nav-link btn" onClick={() => setCategory('health')}>
                Health
              </button>
            </div>
          </div>
        </div>
      </nav>

       {/* Title indicating the selected news category */}
       <h1>NEWS : {category.toUpperCase()}</h1>

      {/* Dropdowns to select country and language */}
      <div className="form-floating filters">
        {/* <label htmlFor="country">Country:</label> */}
        <select className='form-select' id="floatingSelect" aria-label="Floating label select example" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="in" selected>India</option>
          <option value="us">US</option>
          <option value="gb">UK</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
        <label for="floatingSelect">Country</label>
        </div>

        <div className="form-floating filters">
        {/* <label htmlFor="language">Language:</label> */}
        <select className='form-select' id="floatingSelect" aria-label="Floating label select example"  value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en" selected>English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
        </select>
        <label for="floatingSelect">Languages</label>
      </div>

     
      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}
      <div className="news-container">
        {userData && userData.length > 0 ? (
          userData.map((item, index) => (
            <div className="card card1" key={index}>
              <img
                src={item.urlToImage || placeholderImage}
                className="card-img-top"
                alt="News"
              />
              <div className="card-body">
                <h5 className="card-title">{item.source.id}</h5>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  // href={item.url}
                  className="btn btn-primary"
                  // target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => navigate(`/article/${encodeURIComponent(item.title)}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>

      {/* Render pagination buttons */}
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
}

export default News;
