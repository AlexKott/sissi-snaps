export default class Filter {
  constructor(removeTemplateScript) {
    this.removeTemplateScript = removeTemplateScript;
  }

  filterDOMtoString(dom) {
    if (this.removeTemplateScript) {
      // TODO: remove only template script
      const templateScript = dom.window.document.querySelector('script');
      templateScript.remove();
    }
    return dom;
  }
}
