module.exports = function(settings, trigger) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    on: settings.event,
    handler: function(event) {
      trigger(event);
    }
  });
};
