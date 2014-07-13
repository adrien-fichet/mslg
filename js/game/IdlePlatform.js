var IdlePlatform = function(group, x, y, sx, sy) {
    var platform = group.create(x, y, 'ground');
    if (sx == null) { sx = 0.25; }
    if (sy == null) { sy = 0.5; }
    platform.scale.setTo(sx, sy);
    platform.body.immovable = true;
};
