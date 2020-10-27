import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'keydown'],
        subscribe: ['currentText'],
        ...options
      });
    }

    toHTML() {
      return ` <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-input="inputLine"></div>`
    }

    init() {
      super.init();

      this.$formula = this.$root.find('[data-input="inputLine"]')

      this.$on('table:select', $cell => {
        this.$formula.text($cell.data.value)
      })

      this.$on('table:click', $cell => {
        this.$formula.text($cell.text())
      })
    }

    storeChanged({currentText}) {
      this.$formula.text(currentText)
      console.log()
    }

    onInput(event) {
      this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
      if (event.key === 'Enter' || event.key === 'Tab') {
        event.preventDefault()
        this.$emit('formula:Enter')
      }
    }
}
