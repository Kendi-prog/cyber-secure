import SignUpForm from "../../../../src/components/sign-up-form/sign-up-form.component";
import SignInForm from "../../../../src/components/sign-in-form/sign-in-form.component";
import { AuthContainer } from "./authentication.styles";

const Authentication = () => {
    return (
        <AuthContainer>
            <SignInForm />
            <SignUpForm />
        </AuthContainer>
    );
}

export default Authentication;