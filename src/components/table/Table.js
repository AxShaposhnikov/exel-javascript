import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
      super($root, {
        listeners: ['mousedown', 'keydown', 'input'],
        ...options
      })
    }

    toHTML() {
      return createTable(40)
    }

    prepare() {
      this.selection = new TableSelection()
    }

    init() {
      super.init();

      const $cell = this.$root.find('[data-id="0:0"]')
      this.selection.select($cell)
      this.$emit('table:click', $cell)

      this.$on('formula:input', text => {
        this.selection.current.text(text)
      })

      this.$on('formula:Enter', () => {
        this.selection.current.focus()
      })
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        resizeHandler(this.$root, event)
      } else if (isCell(event)) {
        const $target = $(event.target)

        if (event.shiftKey === true) {
          const $cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`))
          this.selection.selectGroup($cells)
        } else {
          this.selection.select($target)
          const $cell = this.selection.current
          this.$emit('table:click', $cell)
        }
      }
    }

    onKeydown(event) {
      const keys = [
        'Enter',
        'Tab',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'ArrowLeft'
      ]
      const {key} = event
      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault()
        const id = this.selection.current.id(true)
        const $next = this.$root.find(nextSelector(key, id))
        this.selection.select($next)
        this.$emit('table:select', $next)
      }
    }

    onInput(event) {
      this.$emit('table:input', $(event.target).text())
    }
}


