import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import {
    Container,
    SearchButton,
    SearchContainer,
    Input,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';
import SliderItem from '../../components/SliderItem';
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerFeatureMovie, setBannerFeatureMovie] = useState({});
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();
        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                })
            ])
            if (isActive) {
                setNowMovies(getListMovies(20, nowData.data.results));
                setPopularMovies(getListMovies(20, popularData.data.results));
                setTopMovies(getListMovies(20, topData.data.results));
                setBannerFeatureMovie(nowData.data.results[randomBanner(nowData.data.results)])
                setLoading(false);
            }
        }
        getMovies();
        return () => {
            isActive = false;
            ac.abort();
        }
    }, [])

    function handleWithGoDetailScreen(item){
        navigation.navigate('Detail', { id: item.id})
    }

    function handleWithSearchMovie(){
        if(input === "")
            return;
        navigation.navigate('Search', {movie: input});
        setInput('');
    }

    return (
        <Container>
            <Header title="Go Watch" />
            {/* Buscar filme */}
            <SearchContainer>
                <Input
                    placeholder="Ex: Interestelar"
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <SearchButton
                onPress={ handleWithSearchMovie }
                >
                    <Feather name='search' size={30} color='#fff' />
                </SearchButton>
            </SearchContainer>

            {/* Conteúdo */}
            {loading ?
                (
                    <Container>
                        <View style={{height: '100%', justifyContent: "center", alignItems: "center"}}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    </Container>
                )
                :
                (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <Title>Em cartaz</Title>
                        <BannerButton
                            activeOpacity={0.8}
                            onPress={() => handleWithGoDetailScreen(bannerFeatureMovie)}
                        >
                            <Banner
                                resizeMethod="resize"
                                source={{ uri: `https://image.tmdb.org/t/p/original/${bannerFeatureMovie.poster_path}` }}
                            />
                        </BannerButton>

                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={nowMovies}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <SliderItem data={item} navigatePage={ ()=> handleWithGoDetailScreen(item)  }/>}
                        />

                        <Title>Populares</Title>
                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={popularMovies}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <SliderItem data={item} navigatePage={ ()=> handleWithGoDetailScreen(item)  } />}
                        />
                        <Title>Mais votados</Title>
                        <SliderMovie
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={topMovies}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => <SliderItem data={item} navigatePage={ ()=> handleWithGoDetailScreen(item)  } />}
                        />
                    </ScrollView>
                )
            }
        </Container>
    )
}