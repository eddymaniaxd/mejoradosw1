import React, { useContext } from 'react'
import { useParams } from 'react-router';
import socketContext from '../context/socketContext';
import { useForm } from '../hooks/useForm'; 

//henry eddy 

export const FormComponent = (props) => {

    //@params : id, title, tecnologia, description

    const { DrawComponent, DrawDiagram, setSourceRel } = props;
    const { idsala } = useParams();
    const { socket } = useContext(socketContext);

    const { value, HandleInputChange, reset } = useForm({
        id: "",
        title: "",
        tecnologia: "",
        description: ""
    });

    const { id, title, tecnologia, description } = value;

    const HandleClikSubmit = (e) => {
        e.preventDefault();

        setSourceRel((rels) => [...rels, id]);

        DrawDiagram(DrawComponent(id, title, tecnologia, description));

        socket.emit("draw-figure", {
            idsala,
            element: "DrawComponent",
            params: [id, title, tecnologia, description],
            idElement: id
        });

        reset();
    }

    return (
        <form onSubmit={HandleClikSubmit}>
            <div className='my-2'>
                <input
                    type='text'
                    placeholder='idName'
                    className='form-control'
                    value={id}
                    name="id"
                    onChange={HandleInputChange}
                />
            </div>
            <div className='my-2'>
                <input
                    type='text'
                    placeholder='title'
                    className='form-control'
                    value={title}
                    name="title"
                    onChange={HandleInputChange}
                />
            </div>


            <div className='my-2'>
                <input
                    type='text'
                    placeholder='tecnologia'
                    className='form-control'
                    value={tecnologia}
                    name="tecnologia"
                    onChange={HandleInputChange}
                />
            </div>

            <div className='my-2'>
                <input
                    type='text'
                    placeholder='description'
                    className='form-control'
                    value={description}
                    name="description"
                    onChange={HandleInputChange}
                />
            </div>

            <div className='my-2'>
                <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary mx-1" data-bs-dismiss="modal" >Save</button>
            </div>

        </form>
    )

}
