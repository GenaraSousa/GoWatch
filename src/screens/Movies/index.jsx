import React, { useEffect, useState } from 'react';
import FavoriteMovie from '../../components/FavoriteMovie';
import Header from '../../components/Header';
import { deleteMovie, getMoviesSave } from '../../utils/storage';
import { Container, ListMovies } from './styles';
import { useNavigation, useIsFocused } from '@react-navigation/native';



export default function Movies() {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [myMovies, setMyMovies] = useState([]);


    useEffect(() => {

        let isActive = true;
        async function getFavoriteMovies() {
            const response = await getMoviesSave();
            setMyMovies(response);
        }

        if (isActive) {
            getFavoriteMovies();
        }
        return () => {
            isActive = false
        }

    }, [isFocused]);

    async function handleDelete(id) {
        const result = await deleteMovie(id);
        setMyMovies(result);
    }

    async function navigateDatailPage(item) {
        navigation.navigate('Detail', { id: item.id })
    }

    return (
        <Container>
            <Header title="Meus filmes" />
            <ListMovies
                showsVerticalScrollIndicator={false}
                data={myMovies}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <FavoriteMovie
                        data={item}
                        deleteMovie={handleDelete}
                        navigatePage={() => navigateDatailPage(item)}
                    />
                )}
            />
        </Container>
    )
}