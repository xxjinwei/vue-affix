/*!
 * @file affix directive
 * @author jinwei01
 */

/**
 * @how to use:
 * 1) <div v-affix></div> // default, auto start directive, when vm['_isReady'] is true
 * 2) <div v-affix='ok'></div> // start directive, when vm['ok'] is true
 */


var Vue = require('vue')

var addClass    = Vue.util.addClass
var removeClass = Vue.util.removeClass
var fixedClass  = 'affix'


Vue.directive('affix', {

    bind: function () {
        this.affixed = false
    },

    update: function () {
        var ready

        if (!this.affixed) {
            if (this.expression) {
                if (this.vm[this.expression]) {
                    ready = true
                }
            } else {
                ready = true
            }

            if (ready) {
                Vue.nextTick(this.affix.bind(this))
                this.affixed = true
            }
        }
    },

    unbind: function () {
        this.scrollEvent && window.removeEventListener('scroll', this.scrollEvent)
    },

    affix: function () {
        var el = this.el

        var initRect   = el.getBoundingClientRect()
        var initTop    = initRect['top'] + pageYOffset
        var initLeft   = initRect['left'] + 'px'
        var originTop  = el.style.hasOwnProperty('top') ? el.style.top : undefined
        var originLeft = el.style.hasOwnProperty('left') ? el.style.left : undefined

        var added   = false
        var removed = false

        // init
        if (initRect['top'] <= 0) {
            addClass(el, fixedClass)
            el.style.left = initLeft
            added = true
        }

        // scroll event
        this.scrollEvent = function () {
            var handle

            if (pageYOffset <= initTop) {
                if (!removed) {
                    handle  = removeClass
                    added   = false
                    removed = true

                    el.style.top  = originTop !== undefined ? originTop : ''
                    el.style.left = originLeft !== undefined ? originLeft : ''
                }
            } else {
                if (!added) {
                    handle  = addClass
                    added   = true
                    removed = false

                    el.style.top  = ''
                    el.style.left = initLeft
                }
            }

            // add/remove fixedClass
            handle && handle(el, fixedClass)
        }

        // listen scroll event
        window.addEventListener('scroll', this.scrollEvent.bind(this), false)
    }
})
