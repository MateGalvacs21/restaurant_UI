export function getName(): string {
  const user = localStorage.getItem("loggedUser");
  if (!user) return "";
  return JSON.parse(user).name;
}
