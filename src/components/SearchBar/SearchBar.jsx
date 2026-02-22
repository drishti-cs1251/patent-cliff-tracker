// components/SearchBar/SearchBar.jsx
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import './SearchBar.css';

// MOCK DATA for Week 1
const mockSearchResults = {
  'lipitor': [
    { id: 1, name: 'LIPITOR', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '10mg', patent_expired: true },
    { id: 2, name: 'ATORVASTATIN', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '10mg', patent_expired: true },
    { id: 3, name: 'TORVAST', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '10mg', patent_expired: true }
  ],
  'eliquis': [
    { id: 4, name: 'ELIQUIS', generic_name: 'Apixaban', dosage_form: 'Tablet', strength: '5mg', patent_expired: false, patent_expiry: '2026-03-15' },
    { id: 5, name: 'APIXABAN', generic_name: 'Apixaban', dosage_form: 'Tablet', strength: '5mg', patent_expired: false, patent_expiry: '2026-03-15' }
  ],
  'metformin': [
    { id: 6, name: 'METFORMIN', generic_name: 'Metformin HCl', dosage_form: 'Tablet', strength: '500mg', patent_expired: true },
    { id: 7, name: 'GLUCOPHAGE', generic_name: 'Metformin HCl', dosage_form: 'Tablet', strength: '500mg', patent_expired: true },
    { id: 8, name: 'FORTAMET', generic_name: 'Metformin HCl', dosage_form: 'Tablet', strength: '500mg', patent_expired: true }
  ],
  'advil': [
    { id: 9, name: 'ADVIL', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200mg', patent_expired: true },
    { id: 10, name: 'IBUPROFEN', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200mg', patent_expired: true },
    { id: 11, name: 'MOTRIN', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200mg', patent_expired: true }
  ],
  'crestor': [
    { id: 12, name: 'CRESTOR', generic_name: 'Rosuvastatin', dosage_form: 'Tablet', strength: '20mg', patent_expired: true },
    { id: 13, name: 'ROSUVASTATIN', generic_name: 'Rosuvastatin', dosage_form: 'Tablet', strength: '20mg', patent_expired: true }
  ],
  'nexium': [
    { id: 14, name: 'NEXIUM', generic_name: 'Esomeprazole', dosage_form: 'Capsule', strength: '40mg', patent_expired: true },
    { id: 15, name: 'ESOMEPRAZOLE', generic_name: 'Esomeprazole', dosage_form: 'Capsule', strength: '40mg', patent_expired: true }
  ],
  'januvia': [
    { id: 16, name: 'JANUVIA', generic_name: 'Sitagliptin', dosage_form: 'Tablet', strength: '100mg', patent_expired: false, patent_expiry: '2027-03-15' }
  ],
  'humira': [
    { id: 17, name: 'HUMIRA', generic_name: 'Adalimumab', dosage_form: 'Injection', strength: '40mg', patent_expired: false, patent_expiry: '2027-12-31' }
  ]
};

const mockAlternatives = {
  'LIPITOR': {
    active_ingredient: 'Atorvastatin',
    alternatives: [
      { id: 2, name: 'ATORVASTATIN', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '10mg', patent_expired: true },
      { id: 3, name: 'TORVAST', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '10mg', patent_expired: true }
    ]
  },
  'ELIQUIS': {
    active_ingredient: 'Apixaban',
    alternatives: [
      { id: 5, name: 'APIXABAN', generic_name: 'Apixaban', dosage_form: 'Tablet', strength: '5mg', patent_expired: false, patent_expiry: '2026-03-15' }
    ]
  },
  'GLUCOPHAGE': {
    active_ingredient: 'Metformin HCl',
    alternatives: [
      { id: 6, name: 'METFORMIN', generic_name: 'Metformin HCl', dosage_form: 'Tablet', strength: '500mg', patent_expired: true },
      { id: 8, name: 'FORTAMET', generic_name: 'Metformin HCl', dosage_form: 'Tablet', strength: '500mg', patent_expired: true }
    ]
  },
  'ADVIL': {
    active_ingredient: 'Ibuprofen',
    alternatives: [
      { id: 10, name: 'IBUPROFEN', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200mg', patent_expired: true },
      { id: 11, name: 'MOTRIN', generic_name: 'Ibuprofen', dosage_form: 'Tablet', strength: '200mg', patent_expired: true }
    ]
  },
  'CRESTOR': {
    active_ingredient: 'Rosuvastatin',
    alternatives: [
      { id: 13, name: 'ROSUVASTATIN', generic_name: 'Rosuvastatin', dosage_form: 'Tablet', strength: '20mg', patent_expired: true }
    ]
  },
  'NEXIUM': {
    active_ingredient: 'Esomeprazole',
    alternatives: [
      { id: 15, name: 'ESOMEPRAZOLE', generic_name: 'Esomeprazole', dosage_form: 'Capsule', strength: '40mg', patent_expired: true }
    ]
  }
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [alternatives, setAlternatives] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a drug name');
      return;
    }

    setLoading(true);
    setError('');
    setAlternatives(null);
    setSelectedDrug(null);
    setHasSearched(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Search in mock data
      const searchKey = query.toLowerCase().trim();
      const results = mockSearchResults[searchKey] || [];
      
      setSearchResults(results);
      
      if (results.length === 0) {
        setError(`No results found for "${query}"`);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrugSelect = async (drug) => {
    setSelectedDrug(drug);
    setLoading(true);
    setError('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const altData = mockAlternatives[drug.name];
      
      if (altData) {
        setAlternatives(altData);
        if (altData.alternatives.length === 0) {
          setError(`No alternatives found for ${drug.name}`);
        }
      } else {
        setError(`No alternatives found for ${drug.name}`);
        setAlternatives({ alternatives: [] });
      }
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      setError('Could not find alternatives for this drug.');
      setAlternatives({ alternatives: [] });
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setSelectedDrug(null);
    setAlternatives(null);
    setError('');
    setHasSearched(false);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h2>Search for Drug Alternatives</h2>
        <p>Find cheaper alternatives based on active ingredients</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter drug name (e.g., Lipitor, Metformin, Advil)"
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-button"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && !loading && (
        <div className="error-message">{error}</div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !selectedDrug && !loading && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length})</h3>
          <p className="results-hint">Click on a drug to see alternatives</p>
          
          <div className="results-grid">
            {searchResults.map(drug => (
              <div
                key={drug.id}
                className="result-card"
                onClick={() => handleDrugSelect(drug)}
              >
                <div className="result-header">
                  <h4>{drug.name}</h4>
                  {drug.patent_expired ? (
                    <span className="badge green">Generic Available</span>
                  ) : (
                    <span className="badge orange">Brand Only</span>
                  )}
                </div>
                <p className="generic-name">{drug.generic_name}</p>
                <div className="drug-info">
                  <span>{drug.dosage_form}</span>
                  <span>•</span>
                  <span>{drug.strength}</span>
                </div>
                {!drug.patent_expired && drug.patent_expiry && (
                  <p className="expiry-info">
                    Patent expires: {new Date(drug.patent_expiry).toLocaleDateString()}
                  </p>
                )}
                <button className="view-btn">
                  View Alternatives →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternatives Display */}
      {alternatives && selectedDrug && !loading && (
        <div className="alternatives-section">
          <div className="alternatives-header">
            <div>
              <h3>Alternatives for {selectedDrug.name}</h3>
              <p className="active-ingredient">
                <strong>Active Ingredient:</strong> {alternatives.active_ingredient}
              </p>
            </div>
            <button onClick={clearSearch} className="back-button">
              ← New Search
            </button>
          </div>

          {alternatives.alternatives && alternatives.alternatives.length > 0 ? (
            <div className="alternatives-grid">
              {/* Original Drug */}
              <div className="alternative-card original">
                <div className="card-badge">Original Drug</div>
                <div className="card-header">
                  <h4>{selectedDrug.name}</h4>
                  {selectedDrug.patent_expired ? (
                    <span className="badge green">Generic Available</span>
                  ) : (
                    <span className="badge orange">Brand Only</span>
                  )}
                </div>
                <p className="generic-name">{selectedDrug.generic_name}</p>
                <div className="drug-details">
                  <span>{selectedDrug.dosage_form}</span>
                  <span>•</span>
                  <span>{selectedDrug.strength}</span>
                </div>
                {!selectedDrug.patent_expired && selectedDrug.patent_expiry && (
                  <p className="expiry-date">
                    Patent expires: {new Date(selectedDrug.patent_expiry).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Alternatives */}
              {alternatives.alternatives.map(alt => (
                <div key={alt.id} className="alternative-card">
                  <div className="card-badge alternative">Alternative</div>
                  <div className="card-header">
                    <h4>{alt.name}</h4>
                    {alt.patent_expired ? (
                      <span className="badge green">Generic Available</span>
                    ) : (
                      <span className="badge orange">Brand Only</span>
                    )}
                  </div>
                  <p className="generic-name">{alt.generic_name}</p>
                  <div className="drug-details">
                    <span>{alt.dosage_form}</span>
                    <span>•</span>
                    <span>{alt.strength}</span>
                  </div>
                  {!alt.patent_expired && alt.patent_expiry && (
                    <p className="expiry-date">
                      Patent expires: {new Date(alt.patent_expiry).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-alternatives">
              <div className="no-alt-icon">🔍</div>
              <p>No alternatives found for this drug.</p>
              <p className="hint">This might be a unique formulation or the only drug with this active ingredient.</p>
            </div>
          )}
        </div>
      )}

      {/* No Results State */}
      {hasSearched && searchResults.length === 0 && !loading && !error && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No drugs found</h3>
          <p>Try searching for:</p>
          <div className="suggestions">
            <button onClick={() => { setQuery('Lipitor'); handleSearch({ preventDefault: () => {} }); }}>Lipitor</button>
            <button onClick={() => { setQuery('Metformin'); handleSearch({ preventDefault: () => {} }); }}>Metformin</button>
            <button onClick={() => { setQuery('Advil'); handleSearch({ preventDefault: () => {} }); }}>Advil</button>
          </div>
        </div>
      )}
    </div>
  );
}