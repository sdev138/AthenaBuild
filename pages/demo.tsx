import { AnimatePresence, motion } from "framer-motion";
import { RadioGroup } from "@headlessui/react";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import axios from 'axios';
import openai from 'openai';

const questions = [
  {
    id: 1,
    name: "Mathematics",
    description: "ASU, Stanford, MIT, Columbia",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Computer Science",
    description: "ASU, Stanford, Berkely, Illinois",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Writing",
    description: "ASU, Stanford, Harvard, Yale",
    difficulty: "Hard",
  },
];

const interviewers = [
  {
    id: "Perseus",
    name: "Perseus",
    description: "Calculus Tutor",
  },
  {
    id: "Heracles",
    name: "Heracles",
    description: "GRE Tutor",
  },
  {
    id: "Jason",
    name: "Jason",
    description: "Programming Tutor",
  },
];

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'; // Replace this with the ChatGPT API endpoint

const DemoPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const generateCalculusQuestion = async () => {
      try {
        // Call the OpenAI API to generate a calculus question
        const response = await axios.post(API_ENDPOINT, {
          prompt: 'Generate a calculus question:',
          max_tokens: 100,
        });

        const generatedQuestion = response.data.choices[0]?.text.trim();
        setQuestion(generatedQuestion || 'Could not generate question.');
        setIsCorrect(null);
      } catch (error) {
        console.error('Error generating question:', error);
      }
    };

    generateCalculusQuestion();
  }, []); // Generate a question when the component mounts

  const checkAnswer = () => {
    // Replace this logic with your answer checking mechanism
    const correctAnswer = 'Sample Correct Answer'; // Replace this with the correct answer
    setIsCorrect(userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase());
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Calculus Quiz</h1>
        <div style={{ marginBottom: '20px' }}>
          <strong>Question:</strong> {question}
        </div>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          style={{ width: '300px', height: '30px', marginBottom: '10px' }}
        />
        <br />
        <button onClick={checkAnswer}>Submit Answer</button>
        {isCorrect !== null && (
          <div style={{ marginTop: '20px', color: isCorrect ? 'green' : 'red' }}>
            {isCorrect ? 'Correct! ' : 'Incorrect. '}{' '}
            {isCorrect ? 'Generating a new question...' : 'Try again.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoPage;