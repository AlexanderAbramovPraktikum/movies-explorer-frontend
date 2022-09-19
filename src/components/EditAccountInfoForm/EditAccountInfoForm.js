import React, { useState, useEffect, useContext} from 'react';
import '../InfoTooltip/InfoTooltip.css'
import SignInput from '../SignInput/SignInput';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import useForm from '../../hooks/useForm';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function EditAccountInfoForm(props) {

    const currentUser = useContext(CurrentUserContext);
    const useFormData = useForm()

    // Обработчик формы
    const [isNameError, setIsNameError] = useState(true);
    const [isEmailError, setIsEmailError] = useState(true);
    const [isFormError, setIsFormError] = useState(true);

    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const nameRegExp = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/;

    useEffect(() => {
      if (useFormData.values?.name === undefined) {
        setIsNameError(false);
      }
      else if (!nameRegExp.test(useFormData.values?.name)) {
        setIsNameError(true);
      } else {setIsNameError(false)}
    }, [useFormData.values?.name])

    useEffect(() => {
      if (useFormData.values?.email === undefined) {
        setIsEmailError(false);
      }
      else if (!emailRegExp.test(useFormData.values?.email)) {
        setIsEmailError(true);
      } else {setIsEmailError(false)}
    }, [useFormData.values?.email])


    useEffect(() => {
      if ((!isNameError && !isEmailError) && useFormData.values?.name && useFormData?.values.email) {
        setIsFormError(false)
      } else {
        setIsFormError(true)
      }
    }, [isNameError, isEmailError])


    // Обработчик всплывающего окна
    useEffect(() => {
      props.isOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'scroll'
      useFormData.setValues({
        name: currentUser?.name,
        email: currentUser?.email
      })
    }, [props.isOpen]);

    // Обработчик 
    function handleSubmit(e) {
      e.preventDefault()
      props.onUpdateUser(useFormData);
      useFormData.setValues({
        name: currentUser?.name,
        email: currentUser?.email
      })
    }

    return (
      !useFormData ? "" :
      <InfoTooltip onClose={props.onClose} isOpen={props.isOpen} onOutClick={props.onOutClick}>
        <h2 className="edit-form__title">{props.title}</h2>
          <form className="edit-form__form" name={`form_${props.name}`}  onSubmit={handleSubmit} >

            <SignInput text={'Имя'} name={'name'} type={'string'} err={"Имя должно быть строкой больше 2 символов"} isError={isNameError} onChange={useFormData.handleChange} data={useFormData.values?.name}/>

            <SignInput text={'E-mail'} name={'email'} type={'email'} err={"Некорректный Email"} isError={isEmailError} onChange={useFormData.handleChange} data={useFormData.values?.email}/>

            <button className={isFormError ? `edit-form__submit-btn edit-form__submit-btn_disabled` : `edit-form__submit-btn`} aria-label="Подтвердить действие" disabled={isFormError} type="submit" name="submit-button">{props.submit}</button>
          </form>
      </InfoTooltip>
    );
  }
  
  export default EditAccountInfoForm;