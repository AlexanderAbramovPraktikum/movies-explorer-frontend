import React, { useContext } from 'react';
import AccountHeader from '../AccountHeader/AccountHeader';
import Greetings from '../Greetings/Greetings';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function Profile(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        !currentUser ? '' :
        <section className='profile'>
            <AccountHeader routeLinks={props.routeLinks}/>
            <main className='profile__main'>
                <Greetings text={`Hi, ${currentUser?.name}!`}/>
                <ul className='profile__container'>
                    <li className='profile__list-item'>
                        <p className='profile__key'>Name</p>
                        <p className='profile__value'>{currentUser?.name}</p>
                    </li>
                    <li className='profile__list-item'>
                        <p className='profile__key'>E-mail</p>
                        <p className='profile__value'>{currentUser?.email}</p>
                    </li>
                </ul>
                <button type='button' className='profile__edit-btn' onClick={props.onUpdateUserClick}>Edit</button>
                <button type='button' className='profile__logout-btn' onClick={props.onLogout}>Log out</button>
            </main>
        </section>
    );
}

export default Profile;