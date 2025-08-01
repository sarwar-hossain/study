export const filterQuestions = (randomQuestions, type, subject, topic, quizNum, quesNum) => {
  if (subject === "atoz" && topic !== "atoz") {
    return randomQuestions.filter(question =>
      question.type === type &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum);
  }
  else if (topic === "atoz" && subject !== "atoz") {
    return randomQuestions.filter(question =>
      question.type === type &&
      question.subject === subject 
    ).slice(0, quesNum);
  }
  else if (subject === "atoz" && topic === "atoz") {
    const mathQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "math" 
    ).slice(0, Math.round(quesNum / 4));

    const physicsQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "physics" 
    ).slice(0, Math.round(quesNum / 4));

    const chemistryQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "chemistry" 
    ).slice(0, Math.round(quesNum / 4));

    const biologyQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "biology" 
    ).slice(0, Math.round(quesNum / 4));

    return [
      ...mathQuestions,
      ...physicsQuestions,
      ...chemistryQuestions,
      ...biologyQuestions
    ];
  }
  else {
    return randomQuestions.filter(question =>
      question.type === type &&
      question.subject === subject &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum);
  }
};