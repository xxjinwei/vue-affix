# vue-affix
vue affix

### how to use

- no expression, auto start directivey
```html
<div v-affix></div>
```

- with expression: start directive, when vm['expression'] is true
```html
<div v-affix='ok'></div>
```


### style

when affix, auto add `affix` class to the el

```css
    .affix {
        position: fixed;
        /* top: 0; */
        /* bottom: 0; */
    }
```
