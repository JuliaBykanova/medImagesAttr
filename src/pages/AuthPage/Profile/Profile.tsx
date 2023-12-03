import React, { useEffect, ChangeEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.css';
import { authAPI } from '../../../api/authAPI';
import { MessageComponent } from '../../../components/MessageComponent';
import { AuthBtn } from '../../../components/AuthBtn';
import { setUserInfo } from '../../../redux/user/userActions';
import { loginSuccess, loginFailure, resetAuthMessage } from '../../../redux/auth/authActions';
import { IRootState } from '../../../redux/redux-store';

export function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: IRootState) => state.user);
    const { message, messageType } = useSelector((state: IRootState) => state.auth);

    useEffect(() => {
        dispatch(resetAuthMessage());
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await authAPI.getUserData();
                dispatch(setUserInfo(userData));
            } catch (error) {
                dispatch(loginFailure('Ошибка получения данных.'));
            }
        };

        fetchData();
    }, [dispatch]);

    const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Input validation
        if (!userData.lastName || !userData.firstName || !userData.email || !userData.password) {
            dispatch(loginFailure('Заполните все обязательные поля.'));
            return;
        }

        if (!userData.email.includes('@')) {
            dispatch(loginFailure('Email должен содержать @'));
            return;
        }

        if (userData.password.length < 6) {
            dispatch(loginFailure('Пароль должен содержать не менее 6 символов.'));
            return;
        }

        try {
            await authAPI.postUserData(
                userData.lastName,
                userData.firstName,
                userData.patronymic,
                userData.email,
                userData.password
            );

            dispatch(setUserInfo(userData)); // Update user info in Redux store
            dispatch(loginSuccess());
            setTimeout(() => {
                navigate('/templates');
            }, 1000);
        } catch (error) {
            dispatch(
                loginFailure('Произошла ошибка при обновлении данных.')
            );
        }
    };

    const handleChange = (field: string, value: string) => {
        dispatch(setUserInfo({ ...userData, [field]: value }));
    };

    return (
        <div className={styles.containerStyle}>
            <div className={styles.formStyle}>
                <h2 className={styles.titleStyle}>Обновление данных</h2>
                <MessageComponent message={message} messageType={messageType} />
                <form>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={userData.lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('lastName', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Имя"
                        value={userData.firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('firstName', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={userData.patronymic}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('patronymic', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('email', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Пароль"
                        value={userData.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('password', e.target.value)
                        }
                        className={styles.inputStyle}
                    />
                    <AuthBtn onClick={handleUpdate} label="Обновить данные" />
                </form>
                <Link to="/templates" className={styles.linkStyle}>
                    Вернуться на главную страницу
                </Link>
            </div>
        </div>
    );
}
