/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function () {
  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']")
  new GOVUK.SelectionButtons($blockLabels) // eslint-disable-line

  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})





////// POSTCODE LOOKUP

// hide results and manual entry on load
$('.postcode-manual').hide();
$('.postcode-results').hide();

// postcode search click
$('.js-postcode-lookup').click(function() {
  // Grab the postcode entered
  var postcode = $('#postcodeLookup').val();

  $('.postcode-drop option').each(function() {
    $(this).append(postcode);
  });

  $('.postcode-results').show();
});

// manual entry click
$('.js-postcode-manual').click(function() {
  //toggle the manual field and the postcode search
  $('.postcode-manual').toggle();
  $('.postcode-lookup').toggle();
  $('.postcode-results').hide();
  // toggle text of link
  $(this).text(function(i, v){
    return v === 'Enter address manually' ? 'Search for address with postcode' : 'Enter address manually'
  });
});
