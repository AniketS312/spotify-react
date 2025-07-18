import { Search, Mic } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults?: any[]; // Optional, since it's not used in the component
}

function SearchBar({ searchTerm, handleInputChange, searchResults }: SearchBarProps) {
  return (
      <div className="">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=''
      >
        <div className="border-red-200 border-2 rounded-lg flex items-center gap-2 p-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="text-2xl focus:outline-none"
            placeholder="Search"
          />
          <div className="">
            <button type="submit" className="text-white hover:spotify-green">
              <Search size={20} />{' '}
            </button>{' '}
          </div>{' '}
        </div>{' '}
      </form>{' '}
    </div>
  )
};

export default SearchBar