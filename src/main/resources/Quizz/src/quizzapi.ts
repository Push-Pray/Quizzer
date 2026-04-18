export const fetchQuizz= () => {
  return fetch(import.meta.env.VITE_API_URL + "/quizz")
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching quizz");

    return response.json();
  })
}

export const deleteQuizz = (id: number) => {
  const url = `${import.meta.env.VITE_API_URL}/quizz/${id}`;
  console.log("DELETE URL:", url);

  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting quizz");

    if (response.status === 204) return;

    return response.json();
  });
};