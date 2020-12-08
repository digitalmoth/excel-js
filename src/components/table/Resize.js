import {$} from '@core/dom';

export function resizeHandler($root, e) {
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const id = $parent.data.col
  const isCol = e.target.dataset.resize === 'col'
  const sideProp = isCol ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    zIndex: 1000,
    [sideProp]: '-5000px'
  })

  document.onmousemove = event => {
    if (isCol) {
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

    if (isCol) {
      $root
          .findAll(`[data-col="${id}"]`)
          .forEach(col => col.style.width = value + 'px')
      $parent.css({width: value + 'px'})
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
