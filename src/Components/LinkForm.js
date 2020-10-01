import React from 'react';
import './CSS/LinkForm.css';

export default function LinkForm({onInputChange, onButtonSubmit}) {
    return (
        <div>
            <p className="f3">
                This AI will detect your face. Give it a try.
            </p>
            <div className="centre">
                <div className="form centre pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" onChange={onInputChange} />
                    <button className="w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}