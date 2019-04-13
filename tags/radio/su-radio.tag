<su-radio class="ui { radio } checkbox { props.class }">
  <input type="radio" name="{ radioName }" value="{ value }" checked="{ state.checked }" onclick="{ onClick }" id="su-radio-{ uid }" />
  <label if="{ !props.label }" for="su-radio-{ uid }"><slot /></label>
  <label if="{ props.label }" for="su-radio-{ uid }">{ props.label }</label>

  <style>
    :host.ui.checkbox label {
      cursor: pointer;
    }

    :host.ui.read-only input[type="radio"],
    :host.ui.disabled input[type="radio"] {
      cursor: default !important;
    }
  </style>

  <script>
    export default {
      state: {
        checked: false,
        lastChecked: false,
        lastOptsChecked: false,
      },
      radio: 'radio',
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onClick,
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      state.checked = normalizeOptChecked(props.checked)
      state.lastChecked = state.checked
      state.lastOptsChecked = state.checked
      this.update()
    }

    function onBeforeUpdate(props, state) {
      this.readOnly = this.root.classList.contains('read-only')
      this.disabled = this.root.classList.contains('disabled')
      this.radio = this.root.classList.contains('slider') ? '' : 'radio'
      this.radioName = this.root.getAttribute('name')

      if (state.lastOptsChecked != normalizeOptChecked(props.checked)) {
        state.checked = normalizeOptChecked(props.checked)
        state.lastOptsChecked = state.checked
      }
    }

    function onUpdated(props, state) {
      if (state.lastChecked != state.checked) {
        state.lastChecked = state.checked
      }
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onClick(event) {
      if (this.readOnly || this.disabled) {
        event.preventDefault()
        return
      }

      this.update({
        checked: event.target.checked
      })
      this.dispatch('click', event.target.value)
      if (this.obs && this.root.getAttribute('name')) {
        this.obs.trigger(`${this.root.getAttribute('name')}-click`, this.props.value)
      }
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function normalizeOptChecked(checked) {
      return checked === true || checked === 'checked' || checked === 'true'
    }
  </script>
</su-radio>