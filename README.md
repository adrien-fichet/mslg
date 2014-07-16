## Crop sky.jpg to multiple 32x32 tiles with ImageMagick

```
$ mkdir sky_tiles
$ convert sky.jpg -crop 32X32 -set filename:tile "%[fx:page.x/32]_%[fx:page.y/32]" +repage +adjoin "sky_tiles/sky_tile_%[filename:tile].jpg"
```
