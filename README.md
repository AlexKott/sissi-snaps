# DEPRECATED
This sissi package is deprecated and will no longer be maintained. Please use [sissi-core](https://github.com/square-a/sissi-core) and [sissi-cli](https://github.com/square-a/sissi-cli) instead.

See you there!


# sissi-snaps – taking snapshots for [sissi]

<img src='https://raw.githubusercontent.com/square-a/sissi/master/sissi.png'  width='160px' />

Hi, it’s me again. *sissi*, your ***si**mple **s**tatic **si**tes* generator.

If you want to turn your simple React app into a static site with a built-in CMS look no further! Or actually, do: [the sissi repo][sissi] is where you'll find all you need. See you there!

If you're a sissi fan and want to contribute – welcome! I'm glad you're here. I have to apologise, though. Please bear with me. I have but two parents and they are working hard on their sissi-to-do-lists. *Contribution guidelines* and *thorough documentation of all packages* are somewhere in there. Somewhere... For now, this will have to do:

## What sissi-snaps can do
*sissi-snaps* creates static HTML files from React components.

It starts by crawling the index page of the [sissi] project and looks for links with the `data-type="sissi-internal"` attribute to figure out which routes to snapshot. These attributes are set by [sissi-guides].

For each page *sissi-snaps* passes the *EntryComponent* (defined in the [sissi] project and exposed by [sissi-packs] in the `tmp` folder) and the `content.json` to [sissi-guides]' `renderStatic()` method which returns a static HTML page. *sissi-snaps* then creates a new folder for the route inside the `build` directory and saves the snapshot as `index.html`.

And voilà – that's your static website in the `build` directory right there!

[sissi]:https://github.com/square-a/sissi
[sissi-guides]:https://github.com/square-a/sissi-guides
[sissi-packs]:https://github.com/square-a/sissi-packs
