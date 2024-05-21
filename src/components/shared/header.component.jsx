import {CustomItemMenu} from '../../components/shared/customItemMenu.component';
import { links } from "../../constants/links.constant";
const Header = () => {
    return (
        <header className="home-container__header">
            <div className="home-container__logo">
                <img src="./src/assets/images/logo-uc-blue.png" alt="logo" />
            </div>
            <ul className="container-options">
                <CustomItemMenu className="container-options__option" title="Ejemplo" link={links.example} />
                <CustomItemMenu className="container-options__option" title="Convocatoria" link={links.convocation} />
                <CustomItemMenu className="container-options__option" title="Solicitud" link={links.request} />
            </ul>
        </header>
    );
}

export { Header };