export const fetchQuizz= () => {
  return fetch(import.meta.env.VITE_API_URL + "/quizz")
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching quizz");

    return response.json();
  })
}

export const deleteQuizz = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting quizz");

    return response.json();
  })
}