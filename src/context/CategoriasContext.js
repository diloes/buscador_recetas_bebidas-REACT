import axios from "axios"
import { createContext, useState, useEffect } from "react"


//1. Crear el Context
export const CategoriasContext = createContext()

//2. Crear Provider, es donde se encuentran las funciones y state
const CategoriasProvider = props => {

    //Crear state del Context
    const [categorias, setCategorias] = useState([])

    //Ejecutar el llamado a la API
    useEffect( () => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const categorias = await axios.get( url )
            setCategorias(categorias.data.drinks)
        }
        obtenerCategorias()
    },[])

    return (
        <CategoriasContext.Provider
            value={{
                categorias //esto es lo que está a disposición de los componentes envueltos con este context
            }}
        >
            { props.children }
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider