
// Define movie interface
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  poster: string;
  industry: "hollywood" | "bollywood" | "tollywood";
}

// Movie data service
export const getMovieById = (id: number): Movie | undefined => {
  const allMovies = [
    ...movieData.hollywood,
    ...movieData.bollywood,
    ...movieData.tollywood
  ];
  
  return allMovies.find(movie => movie.id === id);
};

// Movie data - in a real app this would come from an API
export const movieData: {
  hollywood: Movie[];
  bollywood: Movie[];
  tollywood: Movie[];
} = {
  hollywood: [
    { id: 1, title: "The Godfather", year: 1972, genre: "Crime, Drama", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80", industry: "hollywood" },
    { id: 2, title: "The Shawshank Redemption", year: 1994, genre: "Drama", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 3, title: "Pulp Fiction", year: 1994, genre: "Crime, Drama", poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 4, title: "The Dark Knight", year: 2008, genre: "Action, Crime, Drama", poster: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 13, title: "Inception", year: 2010, genre: "Action, Adventure, Sci-Fi", poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 14, title: "The Matrix", year: 1999, genre: "Action, Sci-Fi", poster: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 15, title: "Forrest Gump", year: 1994, genre: "Drama, Romance", poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "hollywood" },
    { id: 16, title: "Interstellar", year: 2014, genre: "Adventure, Drama, Sci-Fi", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80", industry: "hollywood" }
  ],
  bollywood: [
    { id: 5, title: "3 Idiots", year: 2009, genre: "Comedy, Drama", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "bollywood" },
    { id: 6, title: "Lagaan", year: 2001, genre: "Drama, Sport", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80", industry: "bollywood" },
    { id: 7, title: "Sholay", year: 1975, genre: "Action, Adventure, Comedy", poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", industry: "bollywood" },
    { id: 8, title: "Dilwale Dulhania Le Jayenge", year: 1995, genre: "Drama, Romance", poster: "https://images.unsplash.com/photo-1614846384571-1e053905bc61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80", industry: "bollywood" },
    { id: 17, title: "PK", year: 2014, genre: "Comedy, Drama, Sci-Fi", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", industry: "bollywood" },
    { id: 18, title: "Kabhi Khushi Kabhie Gham", year: 2001, genre: "Drama, Romance", poster: "https://images.unsplash.com/photo-1617914309185-9e63c24a5bdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", industry: "bollywood" },
    { id: 19, title: "Bajrangi Bhaijaan", year: 2015, genre: "Action, Comedy, Drama", poster: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80", industry: "bollywood" },
    { id: 20, title: "Dangal", year: 2016, genre: "Action, Biography, Drama", poster: "https://images.unsplash.com/photo-1631282715642-c122df9d62f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80", industry: "bollywood" }
  ],
  tollywood: [
    { id: 9, title: "Baahubali: The Beginning", year: 2015, genre: "Action, Drama", poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "tollywood" },
    { id: 10, title: "Arjun Reddy", year: 2017, genre: "Action, Drama, Romance", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", industry: "tollywood" },
    { id: 11, title: "RRR", year: 2022, genre: "Action, Drama", poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", industry: "tollywood" },
    { id: 12, title: "Magadheera", year: 2009, genre: "Action, Drama, Fantasy", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80", industry: "tollywood" },
    { id: 21, title: "Pokiri", year: 2006, genre: "Action, Crime, Thriller", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", industry: "tollywood" },
    { id: 22, title: "Eega", year: 2012, genre: "Action, Comedy, Fantasy", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1456&q=80", industry: "tollywood" },
    { id: 23, title: "Srimanthudu", year: 2015, genre: "Action, Drama", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=925&q=80", industry: "tollywood" },
    { id: 24, title: "Ala Vaikunthapurramuloo", year: 2020, genre: "Action, Comedy, Drama", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", industry: "tollywood" }
  ]
};
