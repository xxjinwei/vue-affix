# vue-affix
vue affix directive

### how to use

#### template
- no expression, auto start directive
```html
<div v-affix></div>
```

- with expression: start directive, when vm['expression'] is true
```html
<div v-affix='ok'></div>
```

#### css
when affix, auto add `affix` class to the el

```css
    .affix {
        position: fixed;
        /* top: 0; */
        /* bottom: 0; */
    }
```
