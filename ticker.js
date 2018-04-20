// Price ticker
HucTools.ticker = new Mongo.Collection('happyuc_price_ticker', {
  connection: null,
});
if (Meteor.isClient) new PersistentMinimongo(HucTools.ticker);

HucTools.ticker.start = function(options) {
  options = options || {};
  if (!options.currencies) options.currencies = ['BTC', 'ETH', 'USD', 'EUR', 'CNY'];
  var url = 'https://min-api.cryptocompare.com/data/price?fsym=HUC&tsyms=' + options.currencies.join(',');
  if (options.extraParams) url += '&extraParams=' + options.extraParams;

  var updatePrice = function(e, res) {
    if (!e && res && res.statusCode === 200) {
      var content = JSON.parse(res.content);

      if (content) {
        _.each(content, function(price, key) {
          var name = key.toLowerCase();

          // make sure its a number and nothing else!
          if (_.isFinite(price)) HucTools.ticker.upsert(name, {$set: {price: String(price), timestamp: null}});
        });
      }
    } else {
      console.warn('Cannot connect to https://mini-api.cryptocompare.com to get price ticker data, please check your internet connection.');
    }
  };

  // update right away
  HTTP.get(url, updatePrice);

  // update prices
  Meteor.setInterval(function() { HTTP.get(url, updatePrice); }, 1000 * 30);
};
