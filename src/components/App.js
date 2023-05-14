import '../pages/index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(error => console.error(error));
    }, []);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCards().then((data) => {
            setCards(data);
        }).catch(error => console.error(error));
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((prevState) => prevState.filter((el) => el._id !== card._id))
        }).catch(error => console.error(error))
    }

    function handleUpdateUser(inputData) {
        api.updateUserData(inputData).then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    function hadleUpdateAvatar(avatarLink) {
        api.updateImageAvatar(avatarLink).then((updated) => {
            setCurrentUser(updated);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    function handleAddNewCard(cardData) {
        api.addNewCard(cardData).then((updated) => {
            setCards([updated, ...cards]);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    function openEditAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    }

    function openEditProfilePopup() {
        setIsEditProfilePopupOpen(true);
    }

    function openEditPlacePopup() {
        setIsAddPlacePopupOpen(true);
    }

    function openImagePopup(card) {
        setSelectedCard(card);
    }

    const closeAllPopups = function () {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});

    }

    return (
        <div className='page'>
            <CurrentUserContext.Provider value={currentUser} >
                <Header />
                <Main
                    cards={cards}
                    onEditProfile={openEditProfilePopup}
                    onEditAvatar={openEditAvatarPopup}
                    onAddPlace={openEditPlacePopup}
                    onCardClick={openImagePopup}
                    onCardLike={handleCardLike}
                    onDeleteClick={handleCardDelete}
                />

                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddNewCard} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={hadleUpdateAvatar} />

                <PopupWithForm
                    title='Вы уверены?'
                    text='Да'
                    name='delete-card'
                    onClose={closeAllPopups}>
                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
