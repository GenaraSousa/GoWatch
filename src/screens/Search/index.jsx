import React, {useState, useEffect} from "react";
import {Container, ListMovie, ContainerLoading} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import api, {key} from '../../services/api';
import SearchItem from "../../components/SearchItem";
import { ActivityIndicator } from "react-native";
export default function Search(){

    const navigation = useNavigation();
    const route = useRoute();
    const [resultMovie, setResultMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        let isActive = true;

        async function getSearchMovie(){
            const response = await api.get('/search/movie', {
                params: {
                    query: route?.params?.movie,
                    api_key: key,
                    language: 'pt-BR',
                    page: 1,
                }
            })

            if(isActive){
                setResultMovie(response.data.results);
                setLoading(false);
            }

        }

        if(isActive) getSearchMovie();


        return () => {
            isActive = false;
        }
    }, [])

    function navigateDatailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    if(loading){
        return(
            <Container>
                <ContainerLoading>
                    <ActivityIndicator size={36} color="white"  />
                </ContainerLoading>
            </Container>
        )
    }
    return(
        <Container>
            <ListMovie
                data={resultMovie}
                showsVerticalScrollIndicator={false}
                keyExtractor={ (item) => String(item.id)}
                renderItem={({item}) => <SearchItem data={item} navigatePage={()=> navigateDatailsPage(item) } />}
            />
        </Container>
    )
}