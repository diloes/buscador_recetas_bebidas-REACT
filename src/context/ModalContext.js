import { createContext, useEffect, useState } from "react";
import axios from "axios";

//Crear context
export const ModalContext = createContext()

const ModalProvider = props => {

    //State del Provider
    const [idReceta, setIdReceta] = useState(null)
    const [infoReceta, setReceta] = useState({})

    // Una vez que tenemos una receta, llamar a la API
    useEffect(() => {
        const obtenerReceta = async () => {
            if( !idReceta ) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ idReceta }`
            const resultado = await axios.get( url )
            setReceta(resultado.data.drinks[0])
        }
        obtenerReceta()
    }, [ idReceta ])

    return ( 
        <ModalContext.Provider
            value={{
                infoReceta,
                setIdReceta,
                setReceta
            }}
        >
            { props.children }
        </ModalContext.Provider>
     );
}
 
export default ModalProvider