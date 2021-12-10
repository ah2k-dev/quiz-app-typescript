import { QuestionType, Quiz } from "../Types/quizTypes";
const shuffleOptions = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)
export const getQuizData = async (totalQuestions: Number, level: String): Promise<QuestionType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`)
    let { results } = await res.json();
    const quiz: QuestionType[] = results.map((QuestionObj: Quiz) => {
        return {
            question: QuestionObj.question,
            answer: QuestionObj.correct_answer,
            option: shuffleOptions(QuestionObj.incorrect_answers.concat(QuestionObj.correct_answer)),
            correct_answer: QuestionObj.correct_answer
        }
    })
    return quiz
}