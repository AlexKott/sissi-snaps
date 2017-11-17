export default class Filter {
  constructor(stripReact) {
    this.stripReact = true;
  }

  filterDOMtoString(dom) {
    const { document } = dom.window;

    if (this.stripReact) {
      // strip root
      const root = document.querySelector('[data-reactroot]');
      root.removeAttribute('data-reactroot');
      root.removeAttribute('data-react-checksum');
      // strip reactid
      const reactElements = Array.from(document.querySelectorAll('[data-reactid]'));
      reactElements.forEach(element => element.removeAttribute('data-reactid'));
      // remove template script
      // TODO: remove only template script
      const templateScript = document.querySelector('script');
      templateScript.remove();
    }

    let serializedDOM = dom.serialize();

    if (this.stripReact) {
      serializedDOM = serializedDOM
        .replace(/<!-- react-empty: .{1,4}-->/g, '')
        .replace(/<!-- \/?react-text:? .{0,4}-->/g, '');
    }

    return serializedDOM;
  }
}
