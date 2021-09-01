
(function(global, factory, define) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
    : typeof define === 'function' && define.amd ? define(factory)
      : (global.install = factory())
}(this, function() {
  'use strict'

  var locked = false; var timer = null
  var vueTouchRipple = function(Vue) {
    var touchRipple = {
      bind: function(el, binding) {
        console.log(binding)
        var value = binding.value
        on(el, 'touchstart', handleStart.bind(null, el, value))
        on(el, 'touchmove', handleEnd.bind(null, el, value))
        on(el, 'touchend', handleEnd.bind(null, el, value))
        on(el, 'touchcancel', handleEnd.bind(null, el, value))
      },
      unbind: function(el, binding) {
        var value = binding.value
        off(el, 'touchstart', handleStart.bind(null, el, value))
        off(el, 'touchmove', handleEnd.bind(null, el, value))
        off(el, 'touchend', handleEnd.bind(null, el, value))
        off(el, 'touchcancel', handleEnd.bind(null, el, value))
      }
    }
    Vue.directive('ripple', touchRipple)
  }

  return vueTouchRipple

  function on(el, eventName, fn) {
    el.addEventListener(eventName, fn, false)
  }
  function off(el, eventName, fn) {
    el.removeEventListener(eventName, fn, false)
  }

  function handleStart(el, cls) {
    clearTimeout(timer)
    timer = setTimeout(function() {
      locked = true
      const container = el

      const { x, y, centerX, centerY, size } = computeRippleStyles(
        container,
        event
      )
      console.log(x, y, centerX, centerY, size)
      const ripple = document.createElement('div')
      ripple.classList.add('my-ripple')
      ripple.style.opacity = `0`
      ripple.style.transform = `translate(${x}px, ${y}px) scale3d(.3, .3, .3)` //
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      // 记录水波的创建时间
      ripple.dataset.createdAt = String(performance.now())

      const { position } = window.getComputedStyle(container)
      container.style.overflow = 'hidden'
      position === 'static' && (this.style.position = 'relative')
      console.log(ripple)
      container.appendChild(ripple)

      window.setTimeout(() => {
        ripple.style.transform = `translate(${centerX}px, ${centerY}px) scale3d(1, 1, 1)`
        ripple.style.opacity = `.25`
      })
    }
    , 20)
  }

  function handleEnd(el, cls) {
    clearTimeout(timer)
    if (!locked) return
    locked = false
    const container = this
    const ripples = container.querySelectorAll('.my-ripple')
    if (!ripples.length) {
      return
    }

    const lastRipple = ripples[ripples.length - 1]
    // 通过水波的创建时间计算出扩散动画还需要执行多久，确保每一个水波都完整的执行了扩散动画
    const delay = 300 - performance.now() + Number(lastRipple.dataset.createdAt)

    setTimeout(() => {
      lastRipple.style.opacity = `0`
      setTimeout(() => lastRipple.parentNode.removeChild(lastRipple), 300)
    }, delay)
  }

  function computeRippleStyles(element, event) {
    const { top, left } = element.getBoundingClientRect()
    const { clientWidth, clientHeight } = element

    const radius = Math.sqrt(clientWidth ** 2 + clientHeight ** 2) / 2
    const size = radius * 2
    console.log(top, left, clientWidth, clientHeight, size)
    const localX = event.clientX - left
    const localY = event.clientY - top

    const centerX = (clientWidth - radius * 2) / 2
    const centerY = (clientHeight - radius * 2) / 2

    const x = localX - radius
    const y = localY - radius

    return { x, y, centerX, centerY, size }
  }

  function setStyle(el, data) {
    if (!data || !el) return
    for (var i in data) {
      el.style[i] = data[i]
    }
  }

  function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
      return el.classList.contains(cls)
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
  }

  /* istanbul ignore next */
  function addClass(el, cls) {
    if (!el) return
    var curClass = el.className
    var classes = (cls || '').split(' ')

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i]
      if (!clsName) continue

      if (el.classList) {
        el.classList.add(clsName)
      } else {
        if (!hasClass(el, clsName)) {
          curClass += ' ' + clsName
        }
      }
    }
    if (!el.classList) {
      el.className = curClass
    }
  }

  /* istanbul ignore next */
  function removeClass(el, cls) {
    if (!el || !cls) return
    var classes = cls.split(' ')
    var curClass = ' ' + el.className + ' '

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i]
      if (!clsName) continue

      if (el.classList) {
        el.classList.remove(clsName)
      } else {
        if (hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
      }
    }
    if (!el.classList) {
      el.className = curClass.trim()
    }
  }
}))
