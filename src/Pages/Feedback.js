import React, { useState } from "react";

function Feedback(props) {
    const [ newForm, setNewForm ] = useState({
        date: '',
        summary: '',
    })

    // handleChange function for form
    const onChange = (event) => {
        setNewForm(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    }

    // handleSubmit function for form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.sendFeedback(newForm);
        setNewForm({
            date: '',
            summary: ''
        })
        alert('Feedback recorded, thanks!')
    }

    const loaded = () => {
        return props.feedback.map((newFeedback) => (
            <div key={newFeedback.id}>
                <p>{newFeedback.date}</p>
                <p>{newFeedback.summary}</p>
            </div>
        ))
    }

    const loading = () => {
        return <h3>Loading...</h3>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                  <input
                    onChange={onChange}
                    name='date'
                    placeholder='Date (Ex. 11/20/21)'
                    type='text'
                    id='date'>
                    </input>
                    <textarea
                    onChange={onChange}
                    name='summary'
                    placeholder='Feedback'
                    type='text'
                    id='summary'>
                    </textarea>
                    <input className='create' type='submit' value='Submit Feedback'/>
                </form>
            {props.feedback ? loaded(): loading()}
        </section>
    )
}

export default Feedback;