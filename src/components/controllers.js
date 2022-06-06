const createGame = (apiResult) => {
  const game = apiResult.map((result) => {
    const { category, difficulty, question, correct_answer } = result;
    const options = result.incorrect_answers.concat(correct_answer);
    options.sort((a, b) => 0.5 - Math.random());
    const selected = "";
    return {
      question,
      correct_answer,
      options,
      category,
      difficulty,
      selected,
    };
  });
  return game;
};

module.exports = {
  createGame,
};
