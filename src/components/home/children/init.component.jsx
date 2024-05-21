import { noop } from "antd/es/_util/warning";

const Init = () => {
    return (
        <div className="main-content">
            <h1 className="main-content__title">Sistema de Gestión de Servicios - Universidad de Caldas</h1>
            <p className="main-content__description">
                Los estudiantes pueden crear solicitudes a las convocatorias y ver el progreso de las mismas, al igual que los administradores que las crean.
            </p>
            <p className="main-content__credits">
                Creado en un semillero de principios SOLID por
                <a className="main-content__author" href="https://github.com/Luis0714"> Luis Andrés Martínez Estremor</a>,
                <a className="main-content__author" href="https://github.com/JPValencia22">  Juan Pablo Valencia</a>  y
                <a className="main-content__author" href="https://github.com/sgranadaag">  Santiago Granada Aguirre</a>.
            </p>
        </div>
    );
};

export { Init }