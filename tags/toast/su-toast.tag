<su-toast class="{ opts.position }">
  <div class="ui list">
    <su-toast-item each="{ item in items }" item="{ item }" position="{ parent.opts.position }"></su-toast-item>
  </div>

  <style>
    :scope {
      position: fixed;
      padding: 1rem;
      z-index: 3000;
    }

    :scope.right {
      right: 0;
    }

    :scope.left {
      left: 0;
    }

    :scope.top {
      top: 0;
    }

    :scope.bottom {
      bottom: 0;
    }

    :scope.middle {
      top: 50%;
      margin-top: -35px;
    }

    :scope.center {
      left: 50%;
      margin-left: 150px;
    }

    .ui.message {
      min-width: 20rem;
      position: relative;
      padding-right: 2.5rem;
    }

    .ui.icon.message {
      width: auto !important;
    }
  </style>

  <script>
    const self = this
    this.mixin('semantic-ui')
    this.items = []

    this.on('mount', () => {
      if (!opts.position) {
        opts.position = 'bottom right'
      }
      this.update()
    })

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showToast', option => {
      const item = {
        title: option.title,
        messages: Array.isArray(option.message) ? option.message : [option.message],
        icon: option.icon,
        class: option.class
      }
      this.items.push(item)
      this.update()

      setTimeout(() => {
        this.items.shift()
        this.update()
      }, 5000)
    })

    riot.mixin({
      suToast: param => {
        const option = {
          title: null,
          message: null,
          icon: null,
          class: null,
        }

        if (typeof param === 'string') {
          option.message = param
        } else if (param) {
          if (param.title) {
            option.title = param.title
          }
          if (param.message) {
            option.message = param.message
          }
          if (param.icon) {
            option.icon = param.icon
          }
          if (param.class) {
            option.class = param.class
          }
        }
        self.observable.trigger('showToast', option)
      }
    })
  </script>
</su-toast>