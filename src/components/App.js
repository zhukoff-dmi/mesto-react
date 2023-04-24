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
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

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
        setIsImagePopupOpen(true);
    }

    const closeAllPopups = function () {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
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
                    placeholder="Имя" minlength="2" maxlength="40" required />
                <span className="username-error popup__input-error"></span>

                <input id="job" className="popup__input popup__input_type_job" name="about" type="text"
                    placeholder="О себе" minlength="2" maxlength="200" required />
                <span className="job-error popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                title='Новое место'
                text='Создать'
                name='add-card'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>

                <input id="title" className="popup__input popup__input_type_title" name="name" type="text"
                    placeholder="Название" minlength="2" maxlength="30" required />
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


                <input id="avatar" class="popup__input popup__input_avatar" name="link" type="url"
                    placeholder="Ссылка на аватар" required />
                <span class="avatar-error popup__input-error"></span>

            </PopupWithForm>

            <PopupWithForm
                title='Вы уверены?'
                text='Да'
                name='delete-card'
                onClose={closeAllPopups}>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}></ImagePopup>

        </div>
    );
}

export default App;
