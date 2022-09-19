import React from 'react';
import SaveIcon from '../../images/save-icon.svg'
import SavedIcon from '../../images/saved-icon.svg'
import UnSaveIcon from '../../images/unsave-icon.svg'
import { BASE_MOVIES_URL } from '../../utils/MoviesApi.js'

function MoviesCard(props) {

    // Выбор иконки лайка
    const isSaved = props.userSavedMovies?.some(i => i.movieId === props.item.id);

    const Icon = () => {
        if (props.isProfile) {
            return UnSaveIcon
        } else if (isSaved) {
            return SavedIcon
        } else {
            return SaveIcon
        }
    }

    // Подсчет длины фильма
    const movieDuration = (props) => {
        if (props.item.duration / 60 < 1) {
            return (props.item.duration % 60) + "м"
        }
        return Math.floor(props.item.duration / 60) + "ч " + (props.item.duration % 60) + "м"
    }

    // Ссылка на картинку фильма
    const imgUrl = () => {
        if (!props.isProfile) {
            return BASE_MOVIES_URL + props.item.image.url;
        }
        return props.item.image;
    }


    // Обработка нажатия на сохранить
    const handleSaveClick = () => {
        props.onSave(props.item);
    }

    return (
        <div className='movie-card'>
            <div className='movie-card__container'>
                <h2 className='movie-card__title'>{props.item.nameRU}</h2>
                <p className='movie-card__length'>{movieDuration(props)}</p>
                <button className='movie-card__save-btn' type='button' onClick={handleSaveClick}><img className='movie-card__save-icon' src={Icon(props)} alt='Кнопка сохранения фильма'/></button>
            </div>
            <a className='movie-card__img-link' href={props.item.trailerLink} target="_blank" rel='noreferrer'><img className='movie-card__img' src={imgUrl(props)} alt='Картинка с переходом на трейлер'/></a>
        </div>
    );
}

export default MoviesCard;