import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateForm = props => {
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();
    const { push } = useHistory;

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => setItem(res.data))
        .catch(err => 
            console.error(
                "updateFOrm.js: useEffect: err",
                err.message,
                err.response
            )
        );
    }, [id]);

    const changeHandler = e => {
       

        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e=> {
        // e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => {
            push('/movies/${id}');
        })
        .catch(err => 
            console.error(
                "UpdateForm.js: handleSubmit: err",
                err.message,
                err.response
            )
        );
    };
    const [edit, setEdit]= useState(false);

    const editButton = ()=>{
        setEdit(!edit)
    }

    if(!edit){
        return <div className="editButton" onClick={editButton}>Edit</div>
    
    }else{
         return(
        
        <div className="updateDiv">
            <h2 className="updateHeader">Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={changeHandler}
                    value={item.title}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    onChange={changeHandler}
                    value={item.director}
                />
                <input 
                    type='text'
                    name='metascore'
                    placeholder='Metascore'
                    onChange={changeHandler}
                    value={item.metascore}
                />
                <input 
                    type='string'
                    name='stars'
                    placeholder='Stars'
                    onChange={changeHandler}
                    value={item.stars}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
};
}

export default UpdateForm; 