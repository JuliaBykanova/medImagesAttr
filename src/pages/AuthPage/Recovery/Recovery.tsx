import React, {ChangeEvent, MouseEvent, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Recovery.css';
import { authAPI } from '../../../api/authAPI';
import { MessageComponent } from '../../../components/MessageComponent';
import { AuthBtn } from '../../../components/AuthBtn';
import { setUserInfo } from '../../../redux/user/userActions';
import { loginSuccess, loginFailure, resetAuthMessage } from '../../../redux/auth/authActions';
import { IRootState } from '../../../redux/redux-store';

export function Recovery() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector((state: IRootState) => state.user); // Use Redux store for email
    const { message, messageType } = useSelector((state: IRootState) => state.auth);

    useEffect(() => {
        dispatch(resetAuthMessage());
    }, [dispatch]);

    const handleRecovery = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        if (!email) {
            dispatch(loginFailure('Введите ваш Email.'));
            return;
        }


        if (!email.includes('@')) {
            dispatch(loginFailure('Email должен содержать @'));
            return;
        }

        try {
            await authAPI.recovery(email);

            dispatch(setUserInfo({ email }));
            dispatch(loginSuccess());
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            dispatch(
                loginFailure('Проверьте подключение к сети и попробуйте еще раз.')
            );
        }
    };

    const handleChange = (field: string, value: string) => {
        dispatch(setUserInfo({ [field]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Восстановление пароля</h2>
                <MessageComponent message={message} messageType={messageType} />
                <form>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange('email', e.target.value)
                        }
                        className={styles.input}
                    />
                    <AuthBtn onClick={handleRecovery} label="Восстановить пароль" />
                </form>

                <Link to="/login" className={styles.link}>
                    Вернуться на страницу авторизации
                </Link>
            </div>
        </div>
    );
}
