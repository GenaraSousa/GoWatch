import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { Name, BackButton } from './styles';

function ModalLink({ link, title, closeModal }) {
    return (
        <>
            <BackButton
                onPress={closeModal}
                activeOpacity={0.9}
            >
                <Feather name="x" size={35} color="#fff" />
                <Name numberOfLines={1}>{title}</Name>
            </BackButton>
            <WebView
                source={{ uri: link }}
            />
        </>
    )
}

export default ModalLink;