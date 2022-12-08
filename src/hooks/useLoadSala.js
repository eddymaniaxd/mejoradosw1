import { useEffect, useState } from "react";
import { apiDiagrama } from "../api/apiDiagrama";


export const useLoadSala = (idUser) => {

    const [salas, setsalas] = useState([]);

    

    const agregar = (sala) => {
        setsalas([...salas, sala]);
    }

    const eliminar = (idSala) => {
        let salasFiltradas = salas.filter((sala) => (sala._id !== idSala));
        setsalas(salasFiltradas);
    }

    const update = (idSala, update) => {

        let salasUpdated = salas.map((sala) => {
            if (sala._id === idSala) {
                return { ...sala, ...update }
            }
            return sala;
        });

        setsalas(salasUpdated);
    }

    useEffect(() => {
        const LoadSala = async () => {
            let res = await apiDiagrama(`/sala/list/${idUser}`);
            if (!res.ok) {
                console.warn(res.message);
            }
            setsalas(res.data);
        }



        LoadSala();
    }, [idUser]);

    return {
        salas,
        agregar,
        eliminar,
        update
    }
}
