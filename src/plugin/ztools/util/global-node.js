const globalConfig = {};

const globalNodes = [];
let target = document.body;

export function createGlobalNode(id) {
  const el = document.createElement('div');

  if (id !== void 0) {
    el.id = id;
  }

  if (globalConfig.globalNodes !== void 0) {
    const cls = globalConfig.globalNodes.class;
    if (cls !== void 0) {
      el.className = cls;
    }
  }

  target.appendChild(el);
  globalNodes.push(el);

  return el;
}

export function removeGlobalNode(el) {
  globalNodes.splice(globalNodes.indexOf(el), 1);
  el.remove();
}

export function changeGlobalNodesTarget(el) {
  if (el !== target) {
    target = el;

    globalNodes.forEach((element) => {
      if (element.contains(target) === false) {
        target.appendChild(el);
      }
    });
  }
}
