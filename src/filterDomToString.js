export default function filterDomtoString(dom) {
  // TODO: remove only template script
  const templateScript = dom.window.document.querySelector('script');

  if (templateScript) {
    templateScript.remove();
  }

  return dom.serialize();
}
