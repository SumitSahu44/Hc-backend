/**
 * Central mapping for site-specific form email recipients.
 * Add new site IDs and their form email mappings here.
 */
const emailMappings = {
  'ParekhChamberofTextile01': {
    'appointment': 'sumitofficial444@gmail.com',
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
  'ParekhLinen04': {
    'trade-enquiry': 'trade-enquiry@parekhlinen.com',
    'equotation': 'trade-enquiry@parekhlinen.com',
    'eauction': 'services@parekhlinen.com',
    'appointment': 'appointment@parekhlinen.com',
  },
  'ParekhRayon05': {
    'trade-enquiry': 'trade-enquiry@parekhrayon.com',
    'equotation': 'trade-enquiry@parekhrayon.com',
    'eauction': 'services@parekhrayon.com',
    'appointment': 'appointment@parekhrayon.com',
  },
  'ParekhFabrics06': {
    'trade-enquiry': 'trade-enquiry@parekhfabrics.com',
    'equotation': 'trade-enquiry@parekhfabrics.com',
    'eauction': 'services@parekhfabrics.com',
    'appointment': 'appointment@parekhfabrics.com',
  },
  'ParekhSilk07': {
    'trade-enquiry': 'trade-enquiry@parekhsilk.com',
    'equotation': 'trade-enquiry@parekhsilk.com',
    'eauction': 'services@parekhsilk.com',
    'appointment': 'appointment@parekhsilk.com',
  },
  'ParekheTradeMarket02': {
    'trade-enquiry': 'trade-enquiry@parekhtrade.com',
    'equotation': 'trade-enquiry@parekhtrade.com',
    'eauction': 'services@parekhtrade.com',
    'appointment': 'appointment@parekhtrade.com',
    'buyer': 'e-trade@parekhtrade.com',
    'seller': 'e-trade@parekhtrade.com',
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
