const socket = io("http://localhost:8080/");

socket.on("init", (data) => {
  orbs = data.orbs;
});
