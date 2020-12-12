import {$} from '@core/dom'

export function resizeHandler($root, e) {
  return new Promise( resolve => {
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const id = $parent.data.col
    const type = $parent.data.col ? 'col' : 'row'
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [sideProp]: '-5000px'
    })

    document.onmousemove = event => {
      if (type === 'col') {
        const delta = event.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = event.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmouseup = null
      document.onmousemove = null

      if (type === 'col') {
        $root
            .findAll(`[data-col="${id}"]`)
            .forEach(col => col.style.width = value + 'px')
        $parent.css({width: value + 'px'})
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  } )
}
