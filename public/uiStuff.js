let windowWidth = $(window).width();
let windowHeight = $(window).height();
let player = {};
let orbs = [];
let players = [];

let canvas = document.querySelector("#the-canvas");
let context = canvas.getContext("2d");
canvas.width = windowWidth;
canvas.height = windowHeight;

$(window).load(() => {
  $("#loginModal").modal("show");
});

$(".name-form").submit((event) => {
  event.preventDefault();
  player.name = document.querySelector("#name-input").value.trim();
  $("#loginModal").modal("hide");
  $("#spawnModal").modal("show");
  document.querySelector(".player-name").innerHTML = player.name;
});

$(".start-game").click((event) => {
  $(".modal").modal("hide");
  $(".hiddenOnStart").removeAttr("hidden");
  init();
});
