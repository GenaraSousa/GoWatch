import AsyncStorage from '@react-native-async-storage/async-storage'; 

//buscar os filmes
export async function getMoviesSave(){
    const myMovies = await AsyncStorage.getItem(`@gowatch`);
    let moviesSave= JSON.parse(myMovies) || [];
    return moviesSave
}

//salvar filme
export async function saveMovie(newMovie){
    let moviesStared = await getMoviesSave();
    const hasMovie = moviesStared.some(item => item.id === newMovie.id);
    if(hasMovie){
        return;
    }
    moviesStared.push(newMovie);
    await AsyncStorage.setItem(`@gowatch`, JSON.stringify(moviesStared));

}

//deletar um filme
export async function deleteMovie(id){
    let moviesStorage = await getMoviesSave();
    let myMovies = moviesStorage.filter( item => item.id !== id)
    await AsyncStorage.setItem(`@gowatch`, JSON.stringify(myMovies));
    return myMovies;
}


//filtrar algum filme que já está salvo
export async function hasMovie(movie){
    let moviesStorage = await getMoviesSave();
    const hasMovie = moviesStorage.find( item =>  item.id === movie.id);
    return hasMovie === undefined ? false : true;
}