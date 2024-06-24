import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '../App.css';

function Pokedex() {
    const [id, setId] = useState(1);
    const [character, setCharacter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        try {
            let url = `https://rickandmortyapi.com/api/character/${id}`;
            if (searchTerm) {
                url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            // If searching by name, API returns an array, take the first result
            if (searchTerm) {
                setCharacter(data.results[0]);
            } else {
                setCharacter(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, searchTerm]);

    const nextCharacter = () => {
        setId(id + 1);
    };

    const previousCharacter = () => {
        if (id > 1) {
            setId(id - 1);
        }
    };

    const handleSearch = () => {
        setId(1); // Reset ID to 1 when searching by name
        fetchData();
    };

    const transitionVariants = {
        initial: { opacity: 0, x: 300 },
        animate: { opacity: 1, x: 0 },
    };

    return (
        <div className="Pokedex">
            <h1 className="poketitulo">Rick and Morty</h1>

            {}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome"
                />
                
            </div>

            {character && (
                <motion.div
                    className="Pokenome"
                    key={character.id}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 1 }}
                >
                    <h2>{character.name}</h2>
                    <motion.img
                        style={{ width: "150px", height: "150px" }}
                        src={character.image}
                        alt={character.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                    <p>Status: {character.status}</p>
                    <p>Espécie: {character.species}</p>
                    <p>Gênero: {character.gender}</p>
                </motion.div>
            )}
            <button onClick={previousCharacter} className="voltbutton">Anterior</button>
            <button onClick={nextCharacter} className="proxbutton">Próximo</button>
        </div>
    );
}

export default Pokedex;
