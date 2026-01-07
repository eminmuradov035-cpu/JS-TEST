const detailsContainer = document.getElementById("detailsContainer");
const backBtn = document.getElementById("backBtn");

const params = new URLSearchParams(window.location.search);
const todoId = parseInt(params.get("id"));

const todos = JSON.parse(sessionStorage.getItem("todos")) || [];

const todo = todos.find(t => t.id === todoId);

if (todo) {
  detailsContainer.innerHTML = `
    <p><strong>ID:</strong> ${todo.id}</p>
    <p><strong>User ID:</strong> ${todo.userId}</p>
    <p><strong>Title:</strong> ${todo.title}</p>
    <p><strong>Completed:</strong> ${todo.completed ? "Yes" : "No"}</p>
  `;
} else {
  detailsContainer.innerHTML = `<p class="text-red-500">Todo not found!</p>`;
}

backBtn.addEventListener("click", () => {
  window.history.back();
});