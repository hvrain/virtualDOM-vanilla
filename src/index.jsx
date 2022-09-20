/** @jsx h */
import { updateElement } from "./updateElement";

export default function h(type, props, ...children) {
  if (typeof type === 'function') {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children: children.flat()}
}

const oldState = [
  { id: 1, completed: false, content: 'todo list item 1' },
  { id: 2, completed: true, content: 'todo list item 2' },
];
const newState = [
  { id: 1, completed: false, content: 'todo list item 1 update' },
  { id: 2, completed: true, content: 'todo list item 2' },
  { id: 3, completed: false, content: 'todo list item 3' },
];

const render = (state) => (
  <div>
    <ul>
      { state.map(({ completed, content }, index) => (
        <li key={index} className={completed ? 'completed' : null}>
          <input type="checkbox" className="toggle" checked={completed} />
          {content}
          <button className="remove">삭제</button>
        </li>
      ))}
    </ul>
    <form>
      <input type="text" />
      <button type="submit">추가</button>
    </form>
  </div>
)

const oldNode = render(oldState);
const newNode = render(newState);

// const app = document.getElementById('app');
// updateElement(app, oldNode);
// setTimeout(() => {
//   updateElement(app, newNode, oldNode);
// }, 2000);

// try {
//   const app = document.getElementById('app');
//   console.log(<App/>)
//   updateElement(app, <ItemList />);
// } catch (error) {
//   console.log(error);
// }

function App() {
  return (
    <div>
      <Header />
      <ItemList className="list1">1</ItemList>
      <ItemList className="list2">2</ItemList>
      <ItemList className="list3">3</ItemList>
    </div>
  )
}
function Header() {
  return <div className="header" style={"color: red; font-size: 20px"} >hello world</div>
}
function ItemList(props, ...children) {
  return (
    <div>
      <Item>{children[0] + 1}</Item>
      <Item>2</Item>
    </div>
  )
}
function Item(props, ...children) {
  return (
    <div>{children[0]}</div>
  )
}
const app = document.getElementById('app');
updateElement(app, <App />);
console.log(
  <App></App>
)