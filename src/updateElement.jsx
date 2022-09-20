

// parent는 realDOM newNode, oldNode는 virtualDOM
// newNode와 oldNode는 parent의 하위 태그들의 값을 나타낸다. (한 단계 낮은 위치)
// index는 parent의 index번째의 노드가 newNode와 oldNode인지 가르쳐주는 값이다. 
export function updateElement(parent, newNode, oldNode, index = 0) {
  // 1. oldNode만 있을 경우
  if (!newNode && oldNode) {
    // // oldNode를 parent에서 제거한다.
    return parent.removeChild(parent.childNodes[index]);
  }
  if (newNode && !oldNode) {
    // newNode를 parent에 추가한다.
    return (parent.appendChild(createElement(newNode)));
  }
  if (typeof newNode === 'string' && typeof oldNode === 'string') {
    // oldNode와 newNode의 내용이 다르다면, oldNode의 내용을 newNode의 내용으로 바꾼다.
    if (newNode === oldNode) return;
    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    )
  }
  if (newNode.type !== oldNode.type) {
    // 둘중 하나가 string일 경우도 해당
    // oldNode를 제거하고 newNode를 추가한다.
    return parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  }
  if (newNode.type === oldNode.type) {
    //oldNode와 newNode의 props를 비교하여 다른 부분만 newNode의 것으로 바꾼다.
    updateAttributes(parent.childNodes[index], newNode.props || {}, oldNode.props || {});
  }
  //oldNode의 자식 노드와 newNode의 자식 노드를 모두 탐색할 때까지 1~5까지 재귀적으로 반복한다.
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
  }
}

function updateAttributes(target, newProps, oldProps) {
  for (const [attr] of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr);
  }
  for (const [attr, value] of Object.entries(newProps)) {
    if (newProps[attr] === oldProps[attr]) continue;
    target.setAttribute(attr, value);
  }
}

function createElement(node) {
  try {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    Object.entries(node.props || {})
          .filter(([, value]) => value)
          .forEach(([attr, value]) => (
            $el.setAttribute(attr, value)
          ));
    const children = node.children.map((child) => createElement(child));
    children.forEach(child => $el.appendChild(child));
    return $el;
  } catch (error) {
    // console.log('err', children);
    console.log(error)
  }
}