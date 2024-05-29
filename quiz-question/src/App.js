import "./styles.css";
import React, { useState } from "react";

function Question(props) {
  const { question, verifyAnswers, selectedChoiceId } = props;

  function renderFeedback(choice) {
    if (verifyAnswers && selectedChoiceId === choice.id) {
      if (choice.correct) {
        return <span>✅ correct</span>;
      } else {
        return <span>❌ incorrect</span>;
      }
    } else if (
      verifyAnswers &&
      selectedChoiceId !== choice.id &&
      choice.correct
    ) {
      return <span>👈 the right answer</span>;
    }
  }

  return (
    <>
      {question.title}
      {question.choices.map((choice) => {
        return (
          <div>
            <label>
              <input
                type="radio"
                name="question-choice"
                checked={props.selectedChoiceId === choice.id}
                value={choice.id}
                onChange={props.onChoiceChange}
                disabled={props.verifyAnswers}
              />
              {choice.text}
            </label>
            {renderFeedback(choice)}
          </div>
        );
      })}
    </>
  );
}

const question = {
  title: "How to make a paragraph in HTML?",
  choices: [
    {
      id: "1",
      text: "<para>Hello World</para>",
      correct: false,
    },
    {
      id: "2",
      text: "<p>Hello World</p>",
      correct: true,
    },
    {
      id: "3",
      text: "<pgraph>Hello World</pgraph>",
      correct: false,
    },
    {
      id: "4",
      text: "<paragraph>Hello World</paragraph>",
      correct: false,
    },
  ],
};

export default function App() {
  const [selectedChoiceId, setSelectedChoiceId] = React.useState(null);
  const [verifyAnswers, setVerifyAnswers] = useState(false);

  function checkAnswers() {
    setVerifyAnswers(true);
  }

  function onChoiceChange(event) {
    setSelectedChoiceId(event.target.value);
  }

  function resetAnswers() {
    setSelectedChoiceId(null);
    setVerifyAnswers(false);
  }

  function renderNoAnswer() {
    if (verifyAnswers && selectedChoiceId === null) {
      return <div>You didn't answer this question.</div>;
    }
  }

  return (
    <div>
      {/* {question.title}
      {question.choices.map((choice) => {
        return (
          <div>
            <label>
              <input
                type="radio"
                name="question-choice"
                checked={selectedChoiceId === choice.id}
                value={choice.id}
                onChange={onChoiceChange}
                disabled={verifyAnswers}
              />
              {choice.text}
            </label>
            {renderFeedback(choice)}
          </div>
        );
      })} */}
      <Question
        question={question}
        selectedChoiceId={selectedChoiceId}
        verifyAnswers={verifyAnswers}
        onChoiceChange={onChoiceChange}
      />
      {renderNoAnswer()}
      <button type="button" onClick={checkAnswers}>
        Check Answers
      </button>
      <button type="button" onClick={resetAnswers}>
        Reset
      </button>
    </div>
  );
}
