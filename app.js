const apiDifficulty = async (diff) => {
  let data;
  const quizpage = document.querySelector(".Quiz-page");
  const currentState = {
    state: "",
  };

  const url = `https://quizapi.io/api/v1/questions?apiKey=2yNelooIUQiGFOYY7BZXLMzNkHlzIHCVAL8nOW5u&category=html&difficulty=${diff}&limit=6&tags=HTML`;
  await axios.get(url).then((res) => {
    console.log(res.data);
    data = res.data;
  });
  return data;
};
export { apiDifficulty };
