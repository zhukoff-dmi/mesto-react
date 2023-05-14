import { useContext } from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';


function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardContext);

    // const [userName, setUserName] = useState('');
    // const [userDescription, setUserDescription] = useState('');
    // const [userAvatar, seUserAvatar] = useState('');
    // const [cards, setCard] = useState([]);

    // useEffect(() => {
    //     api.getUserInfo()
    //         .then(data => {
    //             setUserName(data.name);
    //             setUserDescription(data.about);
    //             seUserAvatar(data.avatar);
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    // useEffect(() => {
    //     api.getCards().then(data => {
    //         setCard(data);
    //     })
    //         .catch(error => console.error(error));
    // }, [])

    return (
        <main>
            <section className="profile">
                <div className="profile__image-container">
                    <button
                        className="profile__image-button"
                        type="button"
                        onClick={props.onEditAvatar}>
                        <img
                            className="profile__image"
                            src={currentUser.avatar}
                            alt="Аватар" />
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__username">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            onClick={props.onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="cards">
                {cards.map((data, i) => {
                    return <Card
                        card={data}
                        key={data._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onDeleteClick={props.onDeleteClick}
                    />
                }
                )}
            </section>

        </main>
    )
}

export default Main;