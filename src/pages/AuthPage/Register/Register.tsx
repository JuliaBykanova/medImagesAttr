import React, { useEffect, ChangeEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../redux/user/userActions';
import { authAPI } from '../../../api/authAPI';
import { MessageComponent } from '../../../components/MessageComponent';
import { AuthBtn } from '../../../components/AuthBtn';
import styles from './Register.css';
import { loginSuccess, loginFailure, resetAuthMessage } from '../../../redux/auth/authActions';

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lastName, firstName, patronymic, email, password } = useSelector(
        (state: any) => state.user
    );
    const { message, messageType } = useSelector((state: any) => state.auth);

    useEffect(() => {
        dispatch(resetAuthMessage());
    }, [dispatch]);


    const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!lastName || !firstName || !email || !password) {
            dispatch(loginFailure('Заполните все обязательные поля.'));
            return;
        }

        if (!email.includes('@')) {
            dispatch(loginFailure('Email должен содержать @'));
            return;
        }

        if (password.length < 6) {
            dispatch(loginFailure('Пароль должен содержать не менее 6 символов.'));
            return;
        }

        try {
            await authAPI.register(firstName, lastName, patronymic, email, password);
            await authAPI.login(email, password);

            dispatch(setUserInfo({ lastName, firstName, patronymic, email, password }));

            dispatch(loginSuccess());
            setTimeout(() => {
                navigate('/templates');
            }, 1000);
        } catch (error) {
            dispatch(
                loginFailure('Произошла ошибка при регистрации.')
            );
        }
    };

    const handleChange = (field: string, value: string) => {
        dispatch(setUserInfo({ [field]: value }));
    };

    return (
        <div className={styles.containerStyle}>
            <div className={styles.formStyle}>
                <h2 className={styles.titleStyle}>Регистрация</h2>
                <MessageComponent message={message} messageType={messageType} />
                <form>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('lastName', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('firstName', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={patronymic}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('patronymic', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                        className={styles.inputStyle}
                    />
                    <AuthBtn onClick={handleRegister} label="Зарегистрироваться" />
                </form>
                <Link to="/" className={styles.linkStyle}>
                    Уже есть аккаунт? Войти
                </Link>
            </div>
        </div>
    );
};
