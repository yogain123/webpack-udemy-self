import join from "lodash/join";
import classes from "./index.css";
import cat from "./assets/images/cat.png";

function component() {
  const element = document.createElement("div");
  console.log({ classes });
  element.innerHTML = join(["Hello", "webpack"], " ");
  const image = document.createElement("img");
  image.setAttribute("src", cat);
  image.setAttribute("alt", "cat image");
  element.append(image);
  element.classList.add(classes.content);
  return element;
}

document.body.appendChild(component());
