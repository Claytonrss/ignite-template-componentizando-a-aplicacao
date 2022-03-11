import { useEffect, useState } from 'react'
import { GenreResponseProps, MovieProps } from './@types/custom'
import { Content } from './components/Content'
import { SideBar } from './components/SideBar'
import { api } from './services/api'
import './styles/content.scss'
import './styles/global.scss'
import './styles/sidebar.scss'

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(response => {
        setMovies(response.data)
      })

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <div className="container">
        <header>
          <span className="category">
            Categoria:<span> {selectedGenre.title}</span>
          </span>
        </header>

        <main>
          <Content movies={movies} />
        </main>
      </div>
    </div>
  )
}
