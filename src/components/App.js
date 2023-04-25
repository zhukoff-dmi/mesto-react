import '../pages/index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function App() {
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

            <Header />
            <Main
                onEditProfile={openEditProfilePopup}
                onEditAvatar={openEditAvatarPopup}
                onAddPlace={openEditPlacePopup}
                onCardClick={openImagePopup}
            />

            <Footer />

            <PopupWithForm
                title='Редактировать профиль'
                text='Сохранить'
                name='edit-profile'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}>

                <input id="username" className="popup__input popup__input_type_name" name="name" type="text"
                    placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="username-error popup__input-error"></span>

                <input id="job" className="popup__input popup__input_type_job" name="about" type="text"
                    placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="job-error popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                title='Новое место'
                text='Создать'
                name='add-card'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>

                <input id="title" className="popup__input popup__input_type_title" name="name" type="text"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="title-error popup__input-error"></span>

                <input id="link" className="popup__input popup__input_type_link" name="link" type="url"
                    placeholder="Ссылка на картинку" required />
                <span className="link-error popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                title='Обновить аватар'
                text='Создать'
                name='avatar'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>


                <input id="avatar" className="popup__input popup__input_avatar" name="link" type="url"
                    placeholder="Ссылка на аватар" required />
                <span className="avatar-error popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                title='Вы уверены?'
                text='Да'
                name='delete-card'
                onClose={closeAllPopups}>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        </div>
    );
}

export default App;
