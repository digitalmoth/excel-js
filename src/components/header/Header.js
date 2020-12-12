import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@/store/actions'
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
       <input type="text" class="input" value="${title}">

            <div>
                <div class="button" data-button="remove">
                    <a href="#" class="material-icons" data-button="remove">delete</a>
                </div>
                <div class="button">
                    <a href="#" class="material-icons">exit_to_app</a>
                </div>

            </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить таблицу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
      }
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
