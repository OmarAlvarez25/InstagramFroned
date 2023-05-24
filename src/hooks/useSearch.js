// React
import { useState } from 'react';

export const useSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleInputSearchChange = async (e) => {
    const texto = e.target.value;
    if (texto.length > 0) {
      // Filter by title

      setSearchText(texto);
    } else {
      setSearchText('');
      setSearchResult([]);
    }
  };

  const onResetForm = () => {
    setSearchText('');
    setSearchResult([]);
  };

  return {
    searchText,
    searchResult,
    handleInputSearchChange,
    onResetForm,
  };
};
