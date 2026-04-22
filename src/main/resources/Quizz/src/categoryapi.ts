const API_URL = import.meta.env.VITE_API_URL + "/categories";

export const fetchCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const addCategory = async (category: { name: string; description: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
};