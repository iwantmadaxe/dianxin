;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-location" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M459.796078 935.654902c-52.203922-56.219608-315.231373-339.32549-315.231373-522.039216 0-202.792157 164.643137-367.435294 367.435294-367.435294 202.792157 0 367.435294 164.643137 367.435294 367.435294 0 182.713725-263.027451 465.819608-315.231373 522.039216C512 993.882353 512 993.882353 459.796078 935.654902L459.796078 935.654902 459.796078 935.654902zM512 94.368627c-174.682353 0-319.247059 142.556863-319.247059 319.247059 0 166.65098 196.768627 377.47451 313.223529 503.968627l4.015686 4.015686 4.015686-4.015686c118.462745-126.494118 313.223529-337.317647 313.223529-503.968627C831.247059 236.92549 688.690196 94.368627 512 94.368627L512 94.368627 512 94.368627zM512 596.329412c-100.392157 0-180.705882-80.313725-180.705882-180.705882 0-100.392157 80.313725-180.705882 180.705882-180.705882 100.392157 0 180.705882 80.313725 180.705882 180.705882C692.705882 516.015686 612.392157 596.329412 512 596.329412L512 596.329412 512 596.329412zM512 287.121569c-72.282353 0-130.509804 58.227451-130.509804 130.509804s58.227451 130.509804 130.509804 130.509804c72.282353 0 130.509804-58.227451 130.509804-130.509804C642.509804 345.34902 584.282353 287.121569 512 287.121569L512 287.121569 512 287.121569zM512 287.121569"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiahao1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiahao2fill" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jianhao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fankui" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M800.037628 960.010751 223.962372 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874l0-639.892491c0-52.980346 43.003528-95.983874 95.983874-95.983874l447.924744 0c17.717453 0 31.994625 14.277171 31.994625 31.994625s-14.277171 31.994625-31.994625 31.994625L223.962372 192.139761c-17.545439 0-31.994625 14.449185-31.994625 31.994625l0 639.892491c0 17.717453 14.449185 31.994625 31.994625 31.994625l575.903242 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L831.860239 351.94087c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 511.913993C896.021502 916.835209 852.84596 960.010751 800.037628 960.010751z"  ></path>' +
    '' +
    '<path d="M612.026205 447.924744c-8.256677 0-16.341341-3.096254-22.705863-9.460776-12.55703-12.55703-12.55703-32.682681 0-45.239711L907.374433 75.34218c12.55703-12.55703 32.682681-12.55703 45.239711 0s12.55703 32.682681 0 45.239711L634.560054 438.635982C628.367546 444.82849 620.110868 447.924744 612.026205 447.924744z"  ></path>' +
    '' +
    '<path d="M479.919368 447.924744 287.951621 447.924744c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625L479.919368 383.935495c17.717453 0 31.994625 14.277171 31.994625 31.994625C511.913993 433.647573 497.636822 447.924744 479.919368 447.924744z"  ></path>' +
    '' +
    '<path d="M672.05913 639.892491 287.951621 639.892491c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625l383.935495 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S689.604569 639.892491 672.05913 639.892491z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shanchu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"  ></path>' +
    '' +
    '<path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"  ></path>' +
    '' +
    '<path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"  ></path>' +
    '' +
    '<path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M476.929 510.717c-2.435-1.893-4.080-2.914-5.414-4.245-91.703-91.656-183.367-183.36-275.107-274.981-6.473-6.467-10.456-13.628-9.221-22.992 1.255-9.521 6.404-16.263 15.211-19.933 9.068-3.779 17.568-2.194 25.24 3.79 1.893 1.477 3.541 3.276 5.245 4.98 91.2 91.186 182.394 182.376 273.56 273.601 1.444 1.444 2.49 3.286 3.721 4.944 0.758 0.168 1.517 0.338 2.276 0.506 1.096-1.763 1.899-3.82 3.328-5.249 91.635-91.728 183.338-183.387 274.971-275.116 7.045-7.055 14.912-11.015 25.050-8.739 18.853 4.232 26.040 26.656 13.163 41.048-1.376 1.541-2.893 2.96-4.356 4.421-91.193 91.193-182.384 182.391-273.606 273.556-1.444 1.444-3.242 2.539-5.952 4.628 2.794 2.152 4.752 3.344 6.328 4.921 91.466 91.406 182.888 182.862 274.367 274.256 5.576 5.572 9.668 11.638 9.619 19.835-0.063 10.511-4.832 18.33-14.201 22.767-9.584 4.537-18.802 3.111-27.006-3.743-1.714-1.431-3.252-3.083-4.835-4.67-91.073-91.069-182.145-182.138-273.208-273.221-1.459-1.459-2.774-3.066-4.553-5.052-1.81 1.721-3.28 3.052-4.676 4.452-91.808 91.797-183.633 183.58-275.38 275.436-7.393 7.403-15.695 11.116-26.107 8.332-17.952-4.796-24.464-26.482-12.216-40.486 1.359-1.555 2.866-2.984 4.328-4.446 91.321-91.329 182.643-182.653 273.981-273.963 1.335-1.328 2.869-2.455 5.445-4.645v0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-minus-round-fill" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m258.3 448c0 17.6-14.4 32-32 32H286.2c-15.8 0-30.7-12.8-32.4-28.5-2.1-19.2 13-35.5 31.8-35.5h452.7c17.6 0 32 14.4 32 32z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)