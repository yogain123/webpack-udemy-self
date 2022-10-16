import { sum } from "./utils";
import classes from "./index.css";

function component() {
  const element = document.createElement("div");
  console.log({ classes });
  console.log({ sum });
  element.innerHTML = sum();
  element.classList.add(classes.content);
  return element;
}

document.body.appendChild(component());
