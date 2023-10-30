import * as AuthApi from '../services/authService'

export const SignUp = (userData) => async (dispatch) => {
    try {
        const { userData } = await AuthApi.SignUp(userData)

    } catch (error) {

    }
}