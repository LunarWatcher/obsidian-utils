# File embedding

Obsidian has built-in file embedding, similar to how you'd embed an image:
```markdown
![[Filename]]
```

This can be used to embed arbitrary files as long as it's supported by obsidian; PDFs, canvases, images, etc. 

Unfortunately, the canvas embed is absolutely fucking worthless:

![Screenshot showing the canvas embedding completely hiding all content](../images/file embedding-canvas embedding.png)

The option to show the content in full has been requested since [at least 2022](https://forum.obsidian.md/t/option-to-embed-canvas-in-a-note/50307), and has been stuck in purgatory since then.

This plugin adds a way to fully embed an editor within another note. This allows canvases to be shown in full, at the expense of not using standard linking methods. For implementation reasons (and obsidian's docs being awful at explaining how to actually do things), this is based around a code block.

## Usage
````
```inline-canvas
Obsidian link
```
````

The special `inline-canvas` code block type can be used to link to arbitrary files. Although the type includes "canvas", it should support any filetype that can be opened within obsidian. It has been verified against markdown and canvases, with canvases being the main intended use-case.

The content of a code block contains precisely one path, as resolvable by Obsidian. If it's a valid `![[Link]]` or `[[Link]]`, it's also a valid `inline-canvas`.

## Limitations

This is primarily meant for editor use. It also works in reader mode, but as it embeds a full editor, it will not export well. If you need exports to work, this feature likely will not work as you expect, and it's fully untested and unsupported as I have no use for it.

Additionally, it doesn't create a proper link. If you want to properly link things, you'll need to double-link it:
````
[[Obsidian link]]
```inline-canvas
Obsidian link
```
````

This is redundant in the editor and reader views, but it's necessary for the graph to see the link. This flaw may be addressed later, but Obsidian's facilities for fucking around with other parts of markdown are either non-existent or awfully documented (or both).

Also note that, although a full editor is embedded, canvases in particular assume they're the top of the root-level editor node, so editing an embedded canvas is pretty broken. This may be fixed in the future if there's a way to hack around the inner container identifying the root-level editor container as its parent rather than the immediate editor container.
