// src/components/SearchBar/SearchBar.tsx

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search for movies" }) => {
  return (
    <TextField
      fullWidth
      label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      margin="normal"
      variant="outlined"
      className="search-input"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;