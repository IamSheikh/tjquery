class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null || e.readyState != 'loading';
    });
    if (isReady) {
      cb();
    } else {
      document.addEventListener('DOMContentLoaded', cb);
    }
    return this;
  }
  on(event, cb) {
    this.forEach((e) => e.addEventListener(event, cb));
    return this;
  }
  next() {
    return this.map((e) => e.nextElementSibling).filter((e) => e != null);
  }
  prev() {
    return this.map((e) => e.previousElementSibling).filter((e) => e != null);
  }
  addClass(className) {
    this.forEach((e) => e.classList.add(className));
    return this;
  }
  removeClass(className) {
    this.forEach((e) => e.classList.remove(className));
    return this;
  }
  toggleClass(className) {
    this.forEach((e) => e.classList.toggle(className));
    return this;
  }
  css(property, value) {
    const camelProp = property.replace(/(-[a-z])/, (g) => {
      return g.replace('-', '').toUpperCase();
    });
    this.forEach((e) => (e.style[camelProp] = value));
    return this;
  }
  html(dom) {
    this.forEach((e) => (e.innerHTML = dom));
    return this;
  }
  text(text) {
    this.forEach((e) => (e.textContent = text));
    return this;
  }
  setAttr(name, value) {
    this.forEach((e) => e.setAttribute(name, value));
    return this;
  }
}

function $(param) {
  if (typeof param === 'function') {
    if (document.readyState != 'loading') {
      param();
    } else {
      document.addEventListener('DOMContentLoaded', param);
    }
  } else if (typeof param === 'string' || param instanceof String) {
    return new ElementCollection(...document.querySelectorAll(param));
  } else {
    return new ElementCollection(param);
  }
}
