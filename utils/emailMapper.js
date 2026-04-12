/**
 * Central mapping for site-specific form email recipients.
 * Add new site IDs and their form email mappings here.
 */
const emailMappings = {
  'ParekhChamberofTextile01': {
    'appointment': 'appointment@parekhchamber.com',
    'membership': 'membership@parekhchamber.com',
    'eauction': 'services@parekhchamber.com',
    'equotation': 'trade-enquiry@parekhchamber.com',
    'trade-enquiry': 'trade-enquiry@parekhchamber.com',
  },
  'ParekhSouthernPolyfabrics03': {
    'trade-enquiry': 'trade-enquiry@parekhpolyfabrics.com',
    'equotation': 'trade-enquiry@parekhpolyfabrics.com',
    'eauction': 'services@parekhpolyfabrics.com',
    'appointment': 'appointment@parekhpolyfabrics.com',
  },
  // Placeholders for future websites
};

const DEFAULT_EMAIL = 'sumitofficial444@gmail.com';

/**
 * Returns the target email for a given site and form type.
 */
exports.getTargetEmail = (siteId, formType) => {
  if (emailMappings[siteId] && emailMappings[siteId][formType]) {
    return emailMappings[siteId][formType];
  }
  return DEFAULT_EMAIL;
};
