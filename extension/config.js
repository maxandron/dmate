// URLs
let DMATE_BACKEND_URL = 'https://ehkbala5gi.execute-api.us-east-2.amazonaws.com/default/dmate-api';

// Widget Design
let SEND_BUTTON_TEXT        = "Pick";
let SEND_BUTTON_COLOR       = "background: linear-gradient(262deg, #ff7854, #fd267d);";
let GENNERATE_BUTTON_TEXT   = "New Idea";
let GENNERATE_BUTTON_COLOR  = "background: linear-gradient(262deg, #aefd7c, #02C39A);";

// XPATHS
const CONV_BLOCK_XPATH      = "//div[@aria-label='Conversation history']";
const MATCH_MESSAGES_XPATH  = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(62px)')][divIndex]/div[1]";
const USER_MESSAGES_XPATH   = "//div[contains(@class, 'msgWrp') and contains(@class, 'Pstart(100px)')][divIndex]/div[1]";
const ALL_MESSAGES_XPATH    = "//div[contains(@class, 'msgWrp')][divIndex]/div[1]";
const MESSAGE_INPUT_XPATH   = "//*[@placeholder='Type a message ...']";
const MATCH_NAME_XPATH      = "//h1[@itemprop='name']";
const MATCH_INERESTS_XPATH  = "//div[@tabindex='-1'][interestIdex]";

// General
const SUPPORT_ADDRESS = "dmate.contact@gmail.com"
const SUPPORT_SUBJECT = "I need help with DMate"
const RECAPTCHA_KEY   = "6LdzJTkaAAAAADmOgvzb-a2o3w2T9xZo0gzXYAsb"
