import React, { useState } from "react";
import { QuestionPropsType } from "../Types/quizTypes";
const QuestionCard: React.FC<QuestionPropsType> = ({ question, option, callback }) => {
    let [selectedAns, setSelectedAns] = useState('')
    const handleChange= (e:any)=>{
        setSelectedAns(e.target.value)
    }
    return (
        <div className='Question-cont'>
            <div className='Question'>
                {question}<hr/>
            </div>
            <form  onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectedAns)}>
                {
                    option.map((opt: string, ind: number) => {
                        return (
                            <div className='Option' key={ind}>
                                <label>
                                    <input
                                        type='radio'
                                        name='opt'
                                        required
                                        checked={selectedAns === opt}
                                        value={opt}
                                        onChange={handleChange}
                                    />
                                    {opt}
                                </label>
                            </div>
                        )
                    })
                }
                <span className='btn-submit'>

                <input type='submit' className='submit' value='Submit' />
                </span>
            </form>
        </div>
    )
}
export default QuestionCard;