export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const getCurrentOptions = (currentQuestion) => {
  if (!currentQuestion) return [];

  return [
    { value: currentQuestion.option1, label: currentQuestion.option1 },
    { value: currentQuestion.option2, label: currentQuestion.option2 },
    { value: currentQuestion.option3, label: currentQuestion.option3 },
    { value: currentQuestion.option4, label: currentQuestion.option4 },
  ].filter(option => option.value);
};