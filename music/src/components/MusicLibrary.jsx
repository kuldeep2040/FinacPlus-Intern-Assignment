import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';


const INITIAL_SONGS = [
  {
    id: 1,
    title: 'Tujh Mein Rab Dikhta Hai',
    artist: 'Roop Kumar Rathod',
    album: 'Rab Ne Bana Di Jodi',
    genre: 'Romantic',
    year: 2008,
    duration: '4:41'
  },
  {
    id: 2,
    title: 'Kal Ho Naa Ho',
    artist: 'Sonu Nigam',
    album: 'Kal Ho Naa Ho',
    genre: 'Romantic',
    year: 2003,
    duration: '5:21'
  },
  {
    id: 3,
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    genre: 'Romantic',
    year: 2013,
    duration: '4:22'
  },
  {
    id: 4,
    title: 'Chaiyya Chaiyya',
    artist: 'Sukhwinder Singh, Sapna Awasthi',
    album: 'Dil Se..',
    genre: 'Dance',
    year: 1998,
    duration: '6:53'
  },
  {
    id: 5,
    title: 'Gallan Goodiyaan',
    artist: 'Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar',
    album: 'Dil Dhadakne Do',
    genre: 'Party',
    year: 2015,
    duration: '4:58'
  },
  {
    id: 6,
    title: 'Jai Ho',
    artist: 'A. R. Rahman, Sukhwinder Singh',
    album: 'Slumdog Millionaire',
    genre: 'Fusion',
    year: 2008,
    duration: '5:19'
  },
  {
    id: 7,
    title: 'Kabira',
    artist: 'Arijit Singh, Harshdeep Kaur',
    album: 'Yeh Jawaani Hai Deewani',
    genre: 'Soulful',
    year: 2013,
    duration: '3:44'
  },
  {
    id: 8,
    title: 'Kesariya',
    artist: 'Arijit Singh',
    album: 'Brahmāstra',
    genre: 'Romantic',
    year: 2022,
    duration: '4:28'
  }
]
;

const MusicLibrary = () => {
  const { isAdmin, user } = useAuth();
  const [songs, setSongs] = useState(INITIAL_SONGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [groupBy, setGroupBy] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    duration: ''
  });


  useEffect(() => {
    const savedSongs = localStorage.getItem('musicLibrarySongs');
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('musicLibrarySongs', JSON.stringify(songs));
  }, [songs]);


  const genres = useMemo(() => {
    return [...new Set(songs.map(song => song.genre))].sort();
  }, [songs]);


  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = searchTerm === '' || 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = filterGenre === '' || song.genre === filterGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [songs, searchTerm, filterGenre]);


  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      

      if (sortBy === 'year') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredSongs, sortBy, sortOrder]);


  const groupedSongs = useMemo(() => {
    if (!groupBy) return { 'All Songs': sortedSongs };
    
    return sortedSongs.reduce((groups, song) => {
      const groupKey = song[groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(song);
      return groups;
    }, {});
  }, [sortedSongs, groupBy]);


  const addSong = (e) => {
    e.preventDefault();
    if (!isAdmin()) return;
    
    const id = Math.max(...songs.map(s => s.id), 0) + 1;
    const songToAdd = {
      ...newSong,
      id,
      year: parseInt(newSong.year) || new Date().getFullYear()
    };
    
    setSongs([...songs, songToAdd]);
    setNewSong({
      title: '',
      artist: '',
      album: '',
      genre: '',
      year: '',
      duration: ''
    });
    setShowAddForm(false);
  };


  const deleteSong = (id) => {
    if (!isAdmin()) return;
    setSongs(songs.filter(song => song.id !== id));
  };

  // Restore all songs to the original INITIAL_SONGS array
  const restoreAllSongs = () => {
    if (!isAdmin()) return;
    
    
    
    setSongs(INITIAL_SONGS);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterGenre('');
    setSortBy('title');
    setSortOrder('asc');
    setGroupBy('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Music Library</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{user}</span>
            </span>
            {isAdmin() && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {showAddForm ? 'Cancel' : 'Add Song'}
                </button>
                <button
                  onClick={restoreAllSongs}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  title="Restore all deleted songs"
                >
                  Restore All Songs
                </button>
              </div>
            )}
          </div>
        </div>


        {showAddForm && isAdmin() && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Song</h3>
            <form onSubmit={addSong} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newSong.title}
                onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Artist"
                value={newSong.artist}
                onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Album"
                value={newSong.album}
                onChange={(e) => setNewSong({...newSong, album: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Genre"
                value={newSong.genre}
                onChange={(e) => setNewSong({...newSong, genre: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="number"
                placeholder="Year"
                value={newSong.year}
                onChange={(e) => setNewSong({...newSong, year: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 3:45)"
                value={newSong.duration}
                onChange={(e) => setNewSong({...newSong, duration: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <div className="md:col-span-2 lg:col-span-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors mr-2"
                >
                  Add Song
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}


        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search by title, artist, or album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="title">Title</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">No Grouping</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={resetFilters}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Reset Filters
            </button>
            <span className="text-sm text-gray-600">
              Showing {Object.values(groupedSongs).flat().length} of {songs.length} songs
            </span>
          </div>
        </div>
      </div>


      <div className="space-y-8">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName}>
            {groupBy && (
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                {groupName} ({groupSongs.length})
              </h2>
            )}
            
            <div className="grid gap-4">
              {groupSongs.map(song => (
                <div key={song.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{song.title}</h3>
                        <p className="text-gray-600 text-sm">{song.artist}</p>
                      </div>
                    <div>
                      <p className="text-gray-700">{song.album}</p>
                      <p className="text-gray-500 text-sm">{song.year}</p>
                    </div>
                      <div>
                        <span className="inline-block bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                          {song.genre}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">{song.duration}</p>
                      </div>
                    </div>
                    
                    {isAdmin() && (
                      <button
                        onClick={() => deleteSong(song.id)}
                        className="ml-4 text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete song"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {groupSongs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No songs found matching your criteria.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicLibrary;
