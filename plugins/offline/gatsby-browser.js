const OfflinePluginRuntime = require('offline-plugin/runtime')

exports.onInitialClientRender = () => {
    log('Installing')
    
      OfflinePluginRuntime.install({
        onInstalled: () => {
          log('Installed')
        },
        onUpdating: () => {
          log('Updating')
        },
        onUpdateReady: () => {
          log('Update Ready')
    
          // Tells to new SW to take control immediately
          OfflinePluginRuntime.applyUpdate()
        },
        onUpdated: () => {
          log('Updated')
    
          // Reload the web page to load into the new version
          window.location.reload()
        },
        onUpdateFailed: () => {
          log('Update Failed')
        }
      })
    // eslint-disable-next-line no-undef
    const ssStyles = window.document.getElementById(`server-side-jss`)
    ssStyles && ssStyles.parentNode.removeChild(ssStyles)
}

function log(msg) {
    console.log('[SW] ', msg) // eslint-disable-line no-console
  }
  