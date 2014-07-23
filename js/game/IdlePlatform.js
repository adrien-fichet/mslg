var IdlePlatform = function(group, x, y, sx) {
    var platform = group.create(x, y, 'ground');
    if (sx == null) { sx = 0.25; }
    platform.scale.setTo(sx, 0.5);
    platform.body.immovable = true;
};
