import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'keydown'],
        ...options
      });
    }

    toHTML() {
      return ` <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-input="inputLine"></div>`
    }

    init() {
      super.init();

      const inputLine = this.$root.find('[data-input="inputLine"]')

      this.$on('table:input', text => {
        inputLine.text(text)
      })

      this.$on('table:select', $cell => {
        inputLine.text($cell.text())
      })

      this.$on('table:click', $cell => {
        inputLine.text($cell.text())
      })
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
