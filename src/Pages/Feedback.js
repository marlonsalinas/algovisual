import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FeedbackDiv = styled.div`
    border: 1px solid #56f7fc;
    padding: 15px;
`

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
            <FeedbackDiv key={newFeedback.id}>
                <p>{newFeedback.date}</p>
                <p>{newFeedback.summary}</p>
            </FeedbackDiv>
        ))
    }

    const loading = () => {
        return <h3>Loading...</h3>
    }

    return (
        <section>
            <Link to='/' id='linkto'>
                Back to the visualizer
            </Link>
            <form onSubmit={handleSubmit}>
                <div class='mb-3'>
                    <label for='date' class='form-label'>Date   </label>
                    <input
                    class='form-control'
                    onChange={onChange}
                    name='date'
                    placeholder='Ex. 11/20/21'
                    type='text'
                    id='date'>
                    </input>
                </div>
                <div class='mb-3'>
                    <label for='feedback' class='form-label'>Feedback   </label>
                    <input
                    class='form-control'
                    onChange={onChange}
                    name='summary'
                    placeholder='Any comments, suggestions, or criticisms'
                    type='text'
                    id='summary'>
                    </input>
                </div>
                    <input className='create' type='submit' value='Submit Feedback'/>
                </form>
                <br></br>
                <br></br>
            {props.feedback ? loaded(): loading()}
        </section>
    )
}

export default Feedback;