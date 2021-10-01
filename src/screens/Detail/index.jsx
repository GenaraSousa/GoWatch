import React, { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import {
    Container,
    HeaderButton,
    Header,
    Banner,
    ButtonLink,
    Title,
    ContentArea,
    Rate,
    ListGenres,
    Desciption
} from './styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api, { key } from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import { deleteMovie, hasMovie, saveMovie } from '../../utils/storage';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const [favoritedMovie, setFavoritedMovie] = useState(false);
    const [movie, setMovie] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let isActive = true;
        async function getMovie() {
            const response = await api.get(`movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR',
                }
            }).catch((err) => {
                console.log(err)
            })

            if (isActive) {
                setMovie(response.data);
                const favorited = await hasMovie(response.data);
                setFavoritedMovie(favorited);
            }
        }
        getMovie();
    }, [])

    async function handleWithFavoriteMovie(movie) {
        if(favoritedMovie){
            await deleteMovie(movie.id);
            setFavoritedMovie(false);
            return;
        }
        await saveMovie(movie);
        setFavoritedMovie(true);
    }

    return (
        <Container>
            <Header>
                <HeaderButton
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="white"
                    />
                </HeaderButton>
                <HeaderButton
                    activeOpacity={0.8}
                    onPress={() => handleWithFavoriteMovie(movie)}
                >
                    <Ionicons
                        name={ favoritedMovie ? "bookmark" : "bookmark-outline"}
                        size={28}
                        color="white"
                    />
                </HeaderButton>
            </Header>
            <Banner
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            />
            <ButtonLink
                activeOpacity={0.8}
                onPress={() => setShowModal(true)}
            >
                <Feather name="link" size={24} color="white" />
            </ButtonLink>
            <Title numberOfLines={2}>{movie.title}</Title>
            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
                    emptyStar={<Ionicons name="md-star-outline" size={24} color="#e7a74e" />}
                    halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
                    disabled={true}
                />
                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>
            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Genres data={item} />}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Desciption>
                    {movie.overview}
                </Desciption>
            </ScrollView>

            <Modal animationType="slide" transparent visible={showModal}>
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setShowModal(false)}
                />
            </Modal>

        </Container>
    )
}


