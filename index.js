const elem = document.getElementById(1);
let currentDroppable = null;
elem.onpointerdown = function (event) {
  let shiftX = event.clientX - elem.getBoundingClientRect().left;
  let shiftY = event.clientY - elem.getBoundingClientRect().top;
  console.log(event);
  elem.style.position = "absolute";
  elem.style.zIndex = 10;
  document.body.append(elem);
  moveAt(event.pageX, event.pageY);
  function moveAt(pageX, pageY) {
    elem.style.left = pageX - shiftX + "px";
    elem.style.top = pageY - shiftY + "px";
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    elem.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    elem.hidden = false;
    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest(".seabattle__sea-human");
    if (currentDroppable != droppableBelow) {
      console.log(currentDroppable, droppableBelow);
      if (currentDroppable) {
        console.log(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        console.log(currentDroppable, droppableBelow);
      }
    }
  }
  document.addEventListener("pointermove", onMouseMove);
  elem.onpointerup = function () {
    document.removeEventListener("pointermove", onMouseMove);
    elem.onpointerup = null;
  };
  elem.ondragstart = function () {
    return false;
  };
};
