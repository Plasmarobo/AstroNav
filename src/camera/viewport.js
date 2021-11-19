/**
 *
 * @param {X coordinate of viewport} x
 * @param {Y coordinate of viewport} y
 * @param {Width of viewport} w
 * @param {Height of viewport} h
 * @param {Parent scene/canvas} parent
 */

function Viewport(x, y, w, h, parent)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scale = 1;
    // Define tweening functions,
    // they close over target and rate
    this.tween_x = null;
    this.tween_y = null;
    this.tween_w = null;
    this.tween_h = null;
    this.tween_scale = null;
    this.parent = parent;
};

Viewport.prototype.update = function(delta_t)
{
    this.tween(delta_t);
};

Viewport.prototype.tween = function(delta_t)
{
    if (null != this.tween_x)
    {
        this.x = this.tween_x(this.x, delta_t);
    }

    if (null != this.tween_y)
    {
        this.y = this.tween_y(this.y, delta_t);
    }

    if (null != this.tween_w)
    {
        this.w = this.tween_w(this.w, delta_t);
    }

    if (null != this.tween_h)
    {
        this.h = this.tween_h(this.h, delta_t);
    }

    if (null != this.tween_scale)
    {
        this.scale = this.tween_scale(this.scale, delta_t);
    }
};

Viewport.prototype.shift_to = function(target_x, target_y, rate, complete_cb)
{
    target_x = Math.round(target_x);
    target_y = Math.round(target_y);
    this.tween_x = function(current_x, delta_t)
    {
        var new_x = 0;
        if (current_x < target_x)
        {
            new_x = current_x + (rate * delta_t);
            if (new_x > target_x)
            {
                new_x = target_x;
            }
        }
        else if (current_x > target_x)
        {
            new_x = current_x - (rate * delta_t);
            if (new_x < target_x)
            {
                new_x = target_x;
            }
        }
        else
        {
            // Clear the tween function
            this.tween_x = null;
            if (null == this.tween_x &&
                null == this.tween_y &&
                null != complete_cb)
            {
                complete_cb();
            }
            return current_x;
        }
        return new_x;
    };

    this.tween_y = function(current_y, delta_t)
    {
        var new_y = 0;
        if (current_y < target_y)
        {
            new_y = current_y + (rate * delta_t);
            if (new_y > target_y)
            {
                new_y = target_y;
            }
        }
        else if (current_y > target_y)
        {
            new_y = current_y - (rate * delta_t);
            if (new_y < target_y)
            {
                new_y = target_y;
            }
        }
        else
        {
            // Clear the tween function
            this.tween_y = null;
            if (null == this.tween_x &&
                null == this.tween_y &&
                null != complete_cb)
            {
                complete_cb();
            }
            return current_y;
        }
        return new_y;
    };
};
