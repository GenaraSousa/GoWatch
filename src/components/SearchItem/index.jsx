import React from 'react'
import { Container, Banner, RateContainer, Rate, Title } from './styles'
import {Ionicons} from '@expo/vector-icons';


export default function SearchItem({ data, navigatePage }) {

    function goDetailMovie(){
        if(data?.release_date === ''){
            return;
        }
        navigatePage();
    }

    return (
        <Container
            activeOpacity={0.7}
            onPress={ goDetailMovie }
        >
            {data?.poster_path ? (
                <Banner
                    resizeMethod="resize"
                    source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }}
                />
            ) : (
                <Banner
                    resizeMethod="resize"
                    source={require('../../assets/semfoto.png')}
                />
            )}
            <Title>{data?.title}</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74A" />
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    )
}

