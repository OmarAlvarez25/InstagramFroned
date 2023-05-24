// Next
import Image from 'next/image';

// Hooks
import { useSearch, useSearchUsers } from '@/hooks';

// UI Components
import { Input } from '../ui';

// Styles
import s from './SearchBar.module.scss';

export const SearchBar = () => {
  const { searchText, handleInputSearchChange, onResetForm } = useSearch();

  const { startSearchingUser } = useSearchUsers();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchText.length === 0) return;

    await startSearchingUser(searchText);
  };

  return (
    <form className={s.searchbar}>
      <Input
        name="search"
        inputType="secondary"
        placeholder="Buscar"
        className={s.searchbar__input}
        autoComplete="off"
        value={searchText}
        onChange={handleInputSearchChange}
      />

      <button
        type="submit"
        className={s.searchbar__button}
        onClick={handleSearch}
      >
        <Image
          src="/icons/globals/search-gray.svg"
          alt="search"
          width={18}
          height={18}
          className={s.searchbar__button__img}
        />
      </button>
    </form>
  );
};
