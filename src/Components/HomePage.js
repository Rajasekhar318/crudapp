import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

// HomePage component definition
const HomePage = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // State for storing the logged-in user's identifier
  const loggedInUser = localStorage.getItem('loggedInUser');
  // State for storing items specific to the logged-in user
  const [items, setItems] = useState(() => {
    
    const savedItems = localStorage.getItem(`items_${loggedInUser}`);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  // State for managing the new item input fields
  const [newItem, setNewItem] = useState({ id: '', name: '', category: '', date: '' });
  // State to track if the user is editing an existing item
  const [editing, setEditing] = useState(false);
  // State for search term input by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected category to filter items
  const [filterCategory, setFilterCategory] = useState('');
  // State for selected field to sort items
  const [sortField, setSortField] = useState('name');
  // State for selected order to sort items
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Save items under a key that includes the logged-in user's unique identifier
    localStorage.setItem(`items_${loggedInUser}`, JSON.stringify(items));
  }, [items, loggedInUser]);

  // Effect hook to save items to localStorage when items or loggedInUser changes
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login');
    }
  }, [navigate]);

  // Handler for input change events
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      // Update the item if editing
      setItems(items.map(item => (item.id === newItem.id ? newItem : item)));
    } else {
      // Add a new item if not editing
      setItems([...items, { ...newItem, id: Date.now() }]);
    }
    // Reset newItem state and exit editing mode
    setNewItem({ id: '', name: '', category: '', date: '' });
    setEditing(false);
  };

  // Handler for edit button click
  const handleEdit = (item) => {
    setNewItem(item);
    setEditing(true);
  };

  // Handler for delete button click
  const handleDelete = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  // Handler for logout button click
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  // Compute unique categories for filtering dropdown
  const categories = Array.from(new Set(items.map(item => item.category)));

  const getFilteredAndSortedItems = () => {
    return items
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(item => !filterCategory || item.category === filterCategory)
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
          return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }
      });
  };

  // Get the filtered and sorted items for rendering
  const filteredAndSortedItems = getFilteredAndSortedItems();

  // Render the HomePage component
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to the Home Page</h1>
      </header>
      <section className="form-section">
      <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Item name"
              className="form-input"
              required
            />
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="form-input"
              required
            />
            <input
              type="date"
              name="date"
              value={newItem.date}
              onChange={handleInputChange}
              className="form-input"
              required
            />
            <button type="submit" className="form-button">{editing ? 'Update' : 'Add'}</button>
          </form>
        </div>
        <div className="filter-sort-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="form-select">
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="form-select">
            <option value="name">Sort by name</option>
            <option value="date">Sort by date</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </section>
      <ul className="item-list">
        {filteredAndSortedItems.map(item => (
          <li key={item.id} className="item">
            {item.name} - {item.category} - {item.date}
            <button onClick={() => handleEdit(item)} className="item-button">✏️</button>
            <button onClick={() => handleDelete(item.id)} className="item-button">🗑️</button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default HomePage;
