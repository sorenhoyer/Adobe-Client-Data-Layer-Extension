// A script here to do common things...
loadIcons('../resources/icons/spectrum-css-icons.svg');
loadIcons('../resources/icons/spectrum-icons.svg');

// handle open data element clicks
document.querySelectorAll('.open-data-element').forEach(link => {
  link.addEventListener('click', function() {
    let target = document.querySelector(link.dataset.target);
    window.extensionBridge.openDataElementSelector().then(function(dataElement) {
      target.value = dataElement;
    });
  });
});

// handle regex clicks
document.querySelectorAll('.test-regex').forEach(link => {
  link.addEventListener('click', function() {
    let target = document.querySelector(link.dataset.target);
    window.extensionBridge.openRegexTester({
      pattern: target.value
    }).then(function(pattern) {
      target.value = pattern;
    });
  });
});

// handle dropdowns
document.querySelectorAll('.spectrum-Dropdown').forEach(dropdown => {
  let trigger = dropdown.querySelector('.spectrum-Dropdown-trigger');
  let popover = dropdown.querySelector('.spectrum-Popover');

  dropdown.setValue = function(value) {
    dropdown.querySelectorAll('.spectrum-Menu-item').forEach(item => {
      item.classList.toggle('is-selected', item.dataset.value === value);
      if (item.dataset.value === value) {
        dropdown.querySelector('.spectrum-Dropdown-label').innerText =
          item.querySelector('.spectrum-Menu-itemLabel').innerHTML;
      }
    });
    dropdown.dataset.value = value;
    dropdown.dispatchEvent(new Event('change'));
  };
  dropdown.getValue = function() {
    return dropdown.dataset.value;
  };
  trigger.addEventListener('click', function() {
    trigger.classList.toggle('is-open');
    popover.classList.toggle('is-open');
  });
  dropdown.querySelectorAll('.spectrum-Menu-item').forEach(item => {
    item.addEventListener('click', function(event) {
      dropdown.setValue(event.target.closest('.spectrum-Menu-item').dataset.value);
      trigger.classList.toggle('is-open', false);
      popover.classList.toggle('is-open', false);
    });
  });
});

// Handle the launch view functions
window.extensionBridge.register({
  init: function(info) {
    let settings = info.settings || {};
    document.querySelectorAll('*[data-bind]').forEach(field => {
      if (field.matches('.spectrum-Dropdown')) {
        field.setValue(settings[field.dataset.bind] || field.dataset.value);
      } else if (field.type === 'checkbox') {
        field.checked = settings[field.dataset.bind];
        field.dispatchEvent(new Event('change'));
      } else {
        if (settings[field.dataset.bind]) {
          field.value = settings[field.dataset.bind];
        }
      }
    });
  },
  getSettings: function() {
    let settings = {};
    document.querySelectorAll('*[data-bind]').forEach(field => {
      if (field.matches('.spectrum-Dropdown')) {
        settings[field.dataset.bind] = field.getValue();
      } else if (field.type === 'checkbox') {
        settings[field.dataset.bind] = field.checked;
      } else if (field.type === 'number') {
        settings[field.dataset.bind] = parseInt(field.value, 10);
      } else {
        settings[field.dataset.bind] = field.value;
      }
    });
    return settings;
  },
  validate: function() {
    let valid = true;
    document.querySelectorAll('*[data-bind]').forEach(field => {
      if (field.matches('.spectrum-Dropdown')) {
        return;
      }
      if (!field.checkValidity()) {
        valid = false;
      }
    });
    return valid;
  }
});
