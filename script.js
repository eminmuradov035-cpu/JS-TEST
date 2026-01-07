const todoContainer = document.getElementById("todoContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const TODOS_PER_LOAD = 8;
let currentIndex = 0;
let allTodos = [];

init();

async function init() {
  const cachedTodos = sessionStorage.getItem("todos");

  if (cachedTodos) {
    console.log("Loaded from SessionStorage");
    allTodos = JSON.parse(cachedTodos);
    renderNextTodos();
    return;
  }

  try {
    console.log("Pulling from API");
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    sessionStorage.setItem("todos", JSON.stringify(data));
    allTodos = data;
    renderNextTodos();

  } catch (err) {
    console.error(err);
  }
}

function renderNextTodos() {
  const nextTodos = allTodos.slice(
    currentIndex,
    currentIndex + TODOS_PER_LOAD
  );

  nextTodos.forEach(todo => {
    const div = document.createElement("div");

    div.className = `
      bg-white p-4 rounded-xl shadow
      flex flex-col gap-2
      hover:scale-[1.02] transition 
      shadow-xl hover:shadow-2xl
      hover:shadow-green-500
    `;

    div.innerHTML = `
      <h3 class="font-semibold text-gray-800">#${todo.id}</h3>
      <p class="text-sm text-gray-600">${todo.title}</p>
      <span class="text-xs font-medium mt-auto ${
        todo.completed
          ? "text-green-600 bg-green-100"
          : "text-yellow-600 bg-yellow-100"
      } px-2 py-1 rounded w-fit">
        ${todo.completed ? "Completed" : "Pending"}
      </span>
    `;

    div.addEventListener("click", () => {
      window.location.href = `details.html?id=${todo.id}`;
    });

    todoContainer.appendChild(div);
  });

  currentIndex += TODOS_PER_LOAD;

  if (currentIndex >= allTodos.length) {
    loadMoreBtn.classList.add("hidden");
  }
}

loadMoreBtn.addEventListener("click", renderNextTodos);
